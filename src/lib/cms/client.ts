const CMS_BASE = (import.meta.env.VITE_CMS_URL as string | undefined)?.replace(/\/$/, "") ?? "";
const WEBSITE_ID =
  (import.meta.env.VITE_WEBSITE_ID as string | undefined)?.trim() ?? "";
/** Same-origin /api/public in production (Vercel rewrite); dev may use Vite proxy when empty. */
const CMS_API_BASE = import.meta.env.PROD ? "" : CMS_BASE;

export type CmsSnippet = {
  id: string;
  label: string;
  headCode?: string | null;
  bodyCode?: string | null;
  footerCode?: string | null;
};

export type CmsPageSeo = {
  title?: string | null;
  description?: string | null;
  ogImage?: string | null;
};

export type CmsPost = {
  id: string;
  name: string;
  sequence: number;
  fields: Record<string, unknown>;
};

export type CmsModule = {
  id: string;
  name: string;
  moduleKey: string;
  key?: string;
  posts: CmsPost[];
};

export type CmsPageTree = {
  page: {
    id: string;
    name: string;
    slug: string;
    seo?: CmsPageSeo | null;
  };
  modules: CmsModule[];
};

export type CmsSiteData = {
  website: {
    id: string;
    name: string;
    slug: string;
    supportEmail?: string | null;
  };
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  snippets: CmsSnippet[];
};

export function getCmsBaseUrl() {
  return CMS_BASE;
}

export function getWebsiteId() {
  return WEBSITE_ID;
}

/** True when website ID is set. CMS_BASE may be empty in local dev (Vite proxy). */
export function isCmsConfigured() {
  return Boolean(WEBSITE_ID);
}

function cmsHeaders(): HeadersInit {
  return {
    "X-Website-Id": WEBSITE_ID,
    Accept: "application/json",
  };
}

export function cmsMediaUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/api/public/")) {
    // Local dev: Vite proxies /api/public on the same origin
    if (!CMS_BASE && import.meta.env.DEV) return url;
    const origin = CMS_BASE || "https://asifur.in";
    return `${origin}${url}`;
  }
  if (url.startsWith("/") && CMS_BASE) return `${CMS_BASE}${url}`;
  return url;
}

export async function fetchCmsSite(): Promise<CmsSiteData | null> {
  if (!isCmsConfigured()) return null;
  const res = await fetch(`${CMS_API_BASE}/api/public/site`, {
    headers: cmsHeaders(),
    cache: "no-store",
  });
  // True miss — static fallbacks are OK.
  if (res.status === 404) return null;

  let json: { ok?: boolean; data?: CmsSiteData; error?: string };
  try {
    json = (await res.json()) as typeof json;
  } catch {
    throw new Error(`[cms] site API returned invalid JSON (${res.status})`);
  }

  if (!res.ok || !json.ok || !json.data) {
    throw new Error(
      `[cms] site API failed (${res.status})${json.error ? `: ${json.error}` : ""}`,
    );
  }
  return json.data;
}

export async function fetchCmsPage(slug: string): Promise<CmsPageTree | null> {
  if (!isCmsConfigured()) return null;
  const res = await fetch(`${CMS_API_BASE}/api/public/pages/${slug}`, {
    headers: cmsHeaders(),
    cache: "no-store",
  });
  // True miss — static fallbacks are OK.
  if (res.status === 404) return null;

  let json: { ok?: boolean; data?: CmsPageTree; error?: string };
  try {
    json = (await res.json()) as typeof json;
  } catch {
    throw new Error(`[cms] page API returned invalid JSON (${slug}, ${res.status})`);
  }

  if (!res.ok || !json.ok || !json.data) {
    throw new Error(
      `[cms] page API failed (${slug}, ${res.status})${json.error ? `: ${json.error}` : ""}`,
    );
  }
  return json.data;
}

export async function submitCmsContact(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  if (!isCmsConfigured()) {
    throw new Error("CMS is not configured.");
  }
  const res = await fetch(`${CMS_API_BASE}/api/public/contact`, {
    method: "POST",
    headers: {
      ...cmsHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const json = (await res.json()) as {
    ok?: boolean;
    error?: string;
    data?: { ticketNumber?: string };
  };
  if (!res.ok || !json.ok) {
    throw new Error(json.error || `Contact request failed (${res.status}).`);
  }
  return json.data;
}

export function getModule(tree: CmsPageTree | null, moduleKey: string) {
  return (
    tree?.modules.find(
      (m) => m.moduleKey === moduleKey || m.key === moduleKey,
    ) ?? null
  );
}

export function getModulePosts(tree: CmsPageTree | null, moduleKey: string) {
  return getModule(tree, moduleKey)?.posts ?? [];
}

export function getModuleFieldMaps(
  tree: CmsPageTree | null,
  moduleKey: string,
): Record<string, unknown>[] {
  return getModulePosts(tree, moduleKey).map((post) => post.fields);
}

export function getFirstPostFields(
  tree: CmsPageTree | null,
  moduleKey: string,
): Record<string, unknown> | null {
  return getModuleFieldMaps(tree, moduleKey)[0] ?? null;
}

export function fieldString(
  fields: Record<string, unknown> | null | undefined,
  key: string,
  fallback = "",
): string {
  const v = fields?.[key];
  return typeof v === "string" ? v : fallback;
}

export function fieldNumber(
  fields: Record<string, unknown> | null | undefined,
  key: string,
  fallback: number,
): number {
  const v = fields?.[key];
  return typeof v === "number" ? v : fallback;
}

export function fieldBoolean(
  fields: Record<string, unknown> | null | undefined,
  key: string,
  fallback = false,
): boolean {
  const v = fields?.[key];
  return typeof v === "boolean" ? v : fallback;
}

export function fieldList(
  fields: Record<string, unknown> | null | undefined,
  key: string,
  fallback: string[] = [],
): string[] {
  const v = fields?.[key];
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : fallback;
}

export function fieldCta(
  fields: Record<string, unknown> | null | undefined,
  key: string,
): { label: string; href: string; variant?: string } | null {
  const v = fields?.[key];
  if (!v || typeof v !== "object") return null;
  const cta = v as { label?: string; href?: string; variant?: string };
  return {
    label: cta.label || "",
    href: cta.href || "",
    variant: cta.variant,
  };
}

export function fieldLink(
  fields: Record<string, unknown> | null | undefined,
  key: string,
): { label: string; href: string } | null {
  const v = fields?.[key];
  if (!v || typeof v !== "object") return null;
  const link = v as { label?: string; href?: string };
  if (!link.href) return null;
  return { label: link.label || "", href: link.href };
}

export function fieldImage(
  fields: Record<string, unknown> | null | undefined,
  key: string,
): { id: string; url: string; alt: string } | null {
  const v = fields?.[key];
  if (!v || typeof v !== "object") return null;
  const img = v as { id?: string; url?: string; alt?: string };
  if (!img.url) return null;
  return { id: img.id || "", url: img.url, alt: img.alt || "" };
}

export function resolveImageSrc(
  fields: Record<string, unknown> | null | undefined,
  keys: string[],
  fallback: string,
  fallbackAlt = "",
): { src: string; alt: string } {
  for (const key of keys) {
    const img = fieldImage(fields, key);
    if (img?.url) {
      return { src: cmsMediaUrl(img.url), alt: img.alt || fallbackAlt };
    }
    const str = fieldString(fields, key, "");
    if (str) {
      return {
        src: str.startsWith("http") ? str : cmsMediaUrl(str) || str,
        alt: fieldString(fields, `${key}_alt`, fallbackAlt),
      };
    }
  }
  return { src: fallback, alt: fallbackAlt };
}

export function badgeColorClass(hex: string, fallback: string): string {
  if (!hex) return fallback;
  if (hex.startsWith("bg-")) return hex;
  return `bg-[${hex}]`;
}
