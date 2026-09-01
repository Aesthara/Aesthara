import {
  type CmsPageTree,
  cmsMediaUrl,
  fieldBoolean,
  fieldCta,
  fieldLink,
  fieldList,
  fieldNumber,
  fieldString,
  getFirstPostFields,
  getModuleFieldMaps,
  getModulePosts,
  resolveImageSrc,
} from "./client";
import {
  fallbackClientLogos,
  fallbackContactForm,
  fallbackGlobal,
  fallbackMarquee,
  fallbackPrivacySections,
  fallbackProjects,
  fallbackSeo,
  fallbackSteps,
  fallbackTestimonials,
} from "./fallbacks";

function hexToBadgeClass(hex: string, fallback: string) {
  if (!hex) return fallback;
  if (hex.startsWith("bg-")) return hex;
  return `bg-[${hex}]`;
}

export function mapGlobal(tree: CmsPageTree | null) {
  const f = getFirstPostFields(tree, "site.global");
  const g = fallbackGlobal;
  return {
    logoLight: fieldString(f, "logo_light", g.logoLight),
    logoDark: fieldString(f, "logo_dark", g.logoDark),
    logoAlt: fieldString(f, "logo_alt", g.logoAlt),
    navHomeLabel: fieldString(f, "nav_home_label", g.navHomeLabel),
    navServicesLabel: fieldString(f, "nav_services_label", g.navServicesLabel),
    navPortfolioLabel: fieldString(f, "nav_portfolio_label", g.navPortfolioLabel),
    navAboutLabel: fieldString(f, "nav_about_label", g.navAboutLabel),
    navContactLabel: fieldString(f, "nav_contact_label", g.navContactLabel),
    navCtaLabel: fieldString(f, "nav_cta_label", g.navCtaLabel),
    footerHeading: fieldString(f, "footer_heading", g.footerHeading),
    footerSubheading: fieldString(f, "footer_subheading", g.footerSubheading),
    linkedinLabel: fieldString(f, "linkedin_label", g.linkedinLabel),
    linkedinUrl: fieldLink(f, "linkedin_url")?.href ?? g.linkedinUrl,
    instagramLabel: fieldString(f, "instagram_label", g.instagramLabel),
    instagramUrl: fieldLink(f, "instagram_url")?.href ?? g.instagramUrl,
    email: fieldString(f, "email", g.email),
    phone: fieldString(f, "phone", g.phone),
    location: fieldString(f, "location", g.location),
    copyrightName: fieldString(f, "copyright_name", g.copyrightName),
    privacyLinkLabel: fieldString(f, "privacy_link_label", g.privacyLinkLabel),
  };
}

export function mapContactForm(tree: CmsPageTree | null) {
  const f = getFirstPostFields(tree, "site.contact_form");
  const c = fallbackContactForm;
  return {
    formHeading: fieldString(f, "form_heading", c.formHeading),
    placeholderName: fieldString(f, "placeholder_name", c.placeholderName),
    placeholderEmail: fieldString(f, "placeholder_email", c.placeholderEmail),
    placeholderPhone: fieldString(f, "placeholder_phone", c.placeholderPhone),
    placeholderCompany: fieldString(f, "placeholder_company", c.placeholderCompany),
    placeholderMessage: fieldString(f, "placeholder_message", c.placeholderMessage),
    submitLabel: fieldString(f, "submit_label", c.submitLabel),
    submittingLabel: fieldString(f, "submitting_label", c.submittingLabel),
    successHeading: fieldString(f, "success_heading", c.successHeading),
    successMessage: fieldString(f, "success_message", c.successMessage),
    successResetLabel: fieldString(f, "success_reset_label", c.successResetLabel),
    validationError: fieldString(f, "validation_error", c.validationError),
  };
}

export function mapHomeHero(tree: CmsPageTree | null) {
  const f = getFirstPostFields(tree, "home.hero");
  const primary = resolveImageSrc(
    f,
    ["image_primary", "image"],
    "/assets/Hero image 1.jpeg",
    "Aesthara design work",
  );
  const secondary = resolveImageSrc(
    f,
    ["image_secondary"],
    "/assets/Hero image 2 (small).png",
    "Design detail",
  );
  const cta = fieldCta(f, "primary_cta");
  return {
    headlineLine1: fieldString(f, "headline_line1", "Elevating Brands"),
    headlineLine2: fieldString(f, "headline_line2", "Through Visual"),
    headlineLine3: fieldString(f, "headline_line3", "Excellence"),
    subheadline: fieldString(
      f,
      "subheadline",
      "Transforming Ideas into Impactful Visual Stories",
    ),
    ctaLabel: cta?.label ?? "Book a Creative Consultation",
    imagePrimary: primary.src,
    imagePrimaryAlt: primary.alt,
    imageSecondary: secondary.src,
    imageSecondaryAlt: secondary.alt,
  };
}

export function mapMarquee(tree: CmsPageTree | null) {
  const maps = getModuleFieldMaps(tree, "home.marquee");
  if (!maps.length) return fallbackMarquee;
  return maps.map((m, i) => ({
    text: fieldString(m, "text", fallbackMarquee[i]?.text ?? ""),
    color: fieldString(m, "dot_color", fallbackMarquee[i]?.color ?? "#DF9F57"),
  }));
}

export function mapHomeAbout(tree: CmsPageTree | null) {
  const f = getFirstPostFields(tree, "home.about");
  const img = resolveImageSrc(f, ["image", "image_url"], "/assets/homepage 2.png", "Why Aesthara");
  return {
    heading: fieldString(f, "heading", "Why Aesthara"),
    image: img.src,
    imageAlt: img.alt,
    paragraph1: fieldString(
      f,
      "paragraph_1",
      '<strong>Aesthara™</strong> is an independent design and creative studio founded by <a href="https://www.linkedin.com/in/kawaljeet-sk/" target="_blank" rel="noreferrer">Kawaljeet Singh</a>, focused on building thoughtful, strategy-led brands and specializing in visual communication offerings such as graphic design, high-impact presentation design, and corporate branding.',
    ),
    paragraph2: fieldString(
      f,
      "paragraph_2",
      "Blending clarity with aesthetics, Aesthara collaborates with agencies, startups, and enterprises of all scales to build brands that are not only visually distinctive — but strategically aligned for long-term growth.",
    ),
    paragraph3: fieldString(
      f,
      "paragraph_3",
      "Every project is personally led and executed with precision, intention, and creative depth.",
    ),
    paragraph4: fieldString(
      f,
      "paragraph_4",
      "The approach is rooted in strategic thinking, refined execution, and a commitment to creating lasting brand impact.",
    ),
    founderName: fieldString(f, "founder_name", "Kawaljeet Singh"),
    founderLink:
      fieldLink(f, "founder_link")?.href ??
      "https://www.linkedin.com/in/kawaljeet-sk/",
  };
}

export function mapServicesHeader(tree: CmsPageTree | null) {
  const f = getFirstPostFields(tree, "home.services_header");
  return {
    heading: fieldString(f, "heading", "Our Design Services"),
    intro1: fieldString(
      f,
      "intro_1",
      "In today's fast-paced digital world, great design isn't <strong>optional</strong> — it's <strong>essential</strong>.",
    ),
    intro2: fieldString(
      f,
      "intro_2",
      "From developing compelling proposals and high-impact pitch decks to crafting comprehensive marketing collateral, we help businesses communicate with clarity and confidence.",
    ),
    intro3: fieldString(
      f,
      "intro_3",
      "Our experience spans multiple sectors, including financial services, global BPM, D2C brand, business consulting, IT, and AI-driven technology firms. We also excel in building cohesive brand identities, with a strong focus on healthy food and wellness startups.",
    ),
  };
}

export function mapServiceBlocks(tree: CmsPageTree | null) {
  const maps = getModuleFieldMaps(tree, "home.services");
  const defaults = [
    {
      title: "Presentation Design",
      image: "/assets/PPT Design Services.png",
      imageAlt: "Presentation Design",
      layout: "image-right" as const,
      paragraph1: "How important is your next presentation to you?",
      paragraph2:
        "It would change everything if you could just visually communicate better.",
      paragraph3:
        "Creating effective, dynamic presentations that transform your brand, help you win more business and engage with your audience.",
      tags: [
        "Custom templates & layouts",
        "Corporate and sales presentations",
        "Investor and pitch decks",
        "Infographics",
        "Animated short videos",
      ],
      footnote: "Tailored to suit your brand's visual identity.",
    },
    {
      title: "Graphic & Visual Design",
      image: "/assets/Graphic Design Services home.png",
      imageAlt: "Graphic Design",
      layout: "image-left" as const,
      paragraph1: "A comprehensive range of creative solutions",
      paragraph2: "Comprises the creative process of communicating ideas visually.",
      paragraph3:
        "These services ensure clear messaging, strengthen brand presence, and enhance customer engagement.",
      tags: [
        "Marketing Assets",
        "Flyers and Brochures",
        "Whitepapers",
        "Case Studies",
        "Standees",
        "Poster and Blog/Article Banners",
      ],
      footnote: "",
    },
    {
      title: "Branding",
      image: "/assets/Branding.png",
      imageAlt: "Branding",
      layout: "image-right" as const,
      paragraph1: "Brand identity that stands out",
      paragraph2:
        "Branding services cover a wide range of elements that help businesses establish a strong and consistent identity.",
      paragraph3:
        "We cover majorly here, Visual & Marketing Assets, Logo Design, Branding Style guidelines, Color Palettes, Typography etc.",
      tags: [
        "Brand's Identity",
        "Logos Design and Color Palettes",
        "Typography",
        "Imagery",
        "Style Guidelines",
        "Social Media Post & Ads",
      ],
      footnote: "",
    },
  ];
  if (!maps.length) return defaults;
  return maps.map((m, i) => {
    const d = defaults[i] ?? defaults[0];
    const img = resolveImageSrc(m, ["image", "image_url"], d.image, d.title);
    return {
      title: fieldString(m, "title", d.title),
      image: img.src,
      imageAlt: fieldString(m, "image_alt", d.title),
      layout: (fieldString(m, "layout", d.layout) as "image-left" | "image-right") || d.layout,
      paragraph1: fieldString(m, "paragraph_1", d.paragraph1),
      paragraph2: fieldString(m, "paragraph_2", d.paragraph2),
      paragraph3: fieldString(m, "paragraph_3", d.paragraph3),
      tags: fieldList(m, "tags", d.tags),
      footnote: fieldString(m, "footnote", d.footnote),
    };
  });
}

export function mapStats(tree: CmsPageTree | null) {
  const posts = getModulePosts(tree, "home.stats");
  const footnotePost = posts.find((p) => "footnote" in p.fields && !("value" in p.fields));
  const statPosts = posts.filter((p) => "value" in p.fields);
  const defaultStats = [
    { value: 2500, suffix: "+", label: "Slides Prepared", iconKey: "FileText" },
    { value: 155, suffix: "+", label: "Presentations Designed", iconKey: "Presentation" },
    { value: 7, suffix: "+", label: "Clients Served", iconKey: "Users" },
    { value: 100, suffix: "%", label: "Service Excellence", iconKey: "Star" },
    { value: 60, suffix: "+", label: "Marketing Assets & Branding Projects", iconKey: "PenTool" },
  ];
  const items =
    statPosts.length > 0
      ? statPosts.map((p, i) => ({
          value: fieldNumber(p.fields, "value", defaultStats[i]?.value ?? 0),
          suffix: fieldString(p.fields, "suffix", defaultStats[i]?.suffix ?? "+"),
          label: fieldString(p.fields, "label", defaultStats[i]?.label ?? ""),
          iconKey: fieldString(p.fields, "icon_key", defaultStats[i]?.iconKey ?? "FileText"),
        }))
      : defaultStats;
  return {
    items,
    footnote: fieldString(
      footnotePost?.fields,
      "footnote",
      "* Branding covers — logo design, brand style guidelines, social media posts and campaign ads",
    ),
  };
}

export function mapProcess(tree: CmsPageTree | null) {
  const posts = getModulePosts(tree, "home.process");
  const header = posts.find((p) => "eyebrow" in p.fields) ?? posts[0];
  const steps = posts.filter((p) => "num" in p.fields);
  if (!steps.length) {
    return {
      eyebrow: "OUR PROCESS",
      heading: "A Four-Step Journey",
      subtitle: "From insight to impact.",
      steps: fallbackSteps,
    };
  }
  return {
    eyebrow: fieldString(header?.fields, "eyebrow", "OUR PROCESS"),
    heading: fieldString(header?.fields, "heading", "A Four-Step Journey"),
    subtitle: fieldString(header?.fields, "subtitle", "From insight to impact."),
    steps: steps.map((p, i) => ({
      num: fieldString(p.fields, "num", fallbackSteps[i]?.num ?? ""),
      title: fieldString(p.fields, "title", fallbackSteps[i]?.title ?? ""),
      sub: fieldString(p.fields, "subtitle", fallbackSteps[i]?.sub ?? ""),
      desc: fieldString(p.fields, "description", fallbackSteps[i]?.desc ?? ""),
      iconKey: fieldString(p.fields, "icon_key", fallbackSteps[i]?.iconKey ?? "Target"),
    })),
  };
}

export function mapTestimonials(tree: CmsPageTree | null) {
  const posts = getModulePosts(tree, "home.testimonials");
  const header = posts.find((p) => "eyebrow" in p.fields) ?? posts[0];
  const items = posts.filter((p) => "quote" in p.fields);
  return {
    eyebrow: fieldString(header?.fields, "eyebrow", "TESTIMONIALS"),
    heading: fieldString(header?.fields, "heading", "Trusted by Our Clients"),
    items:
      items.length > 0
        ? items.map((p, i) => ({
            name: fieldString(p.fields, "name", fallbackTestimonials[i]?.name ?? ""),
            role: fieldString(p.fields, "role", fallbackTestimonials[i]?.role ?? ""),
            quote: fieldString(p.fields, "quote", fallbackTestimonials[i]?.quote ?? ""),
          }))
        : fallbackTestimonials,
  };
}

export function mapClients(tree: CmsPageTree | null) {
  const posts = getModulePosts(tree, "home.clients");
  const header = posts.find((p) => "subtitle" in p.fields) ?? posts[0];
  const logoPosts = posts.filter(
    (p) => "image_url" in p.fields || "image" in p.fields,
  );
  return {
    heading: fieldString(header?.fields, "heading", "Clients Served"),
    subtitle: fieldString(header?.fields, "subtitle", "Trusted by Leading Companies"),
    logos:
      logoPosts.length > 0
        ? logoPosts.map((p, i) => {
            const img = resolveImageSrc(
              p.fields,
              ["image", "image_url"],
              `/assets/Client logos/${fallbackClientLogos[i]?.file ?? ""}`,
              fallbackClientLogos[i]?.alt ?? "",
            );
            return { src: img.src, alt: fieldString(p.fields, "alt", img.alt) };
          })
        : fallbackClientLogos.map((l) => ({
            src: `/assets/Client logos/${l.file}`,
            alt: l.alt,
          })),
  };
}

export function mapPortfolioPreview(tree: CmsPageTree | null) {
  const posts = getModulePosts(tree, "home.portfolio_preview");
  const header = posts.find((p) => "eyebrow" in p.fields) ?? posts[0];
  const items = posts.filter((p) => "badge" in p.fields && "description" in p.fields);
  const cta = fieldCta(header?.fields, "cta");
  const defaultItems = fallbackProjects.filter((p) => p.showOnHome);
  return {
    eyebrow: fieldString(header?.fields, "eyebrow", "Our Portfolio"),
    heading: fieldString(header?.fields, "heading", "Work That"),
    headingHighlight: fieldString(header?.fields, "heading_highlight", "Inspires"),
    ctaLabel: cta?.label ?? "View All Projects",
    ctaHref: cta?.href ?? "/portfolio",
    items:
      items.length > 0
        ? items.map((p, i) => {
            const img = resolveImageSrc(
              p.fields,
              ["image", "image_url"],
              defaultItems[i]?.img ?? "",
              fieldString(p.fields, "title", ""),
            );
            return {
              title: fieldString(p.fields, "title", defaultItems[i]?.title ?? ""),
              img: img.src,
              badge: fieldString(p.fields, "badge", defaultItems[i]?.badge ?? ""),
              badgeColor: hexToBadgeClass(
                fieldString(p.fields, "badge_color", ""),
                defaultItems[i]?.badgeColor ?? "bg-[#DF9F57]",
              ),
              desc: fieldString(p.fields, "description", defaultItems[i]?.desc ?? ""),
            };
          })
        : defaultItems.map((p) => ({
            title: p.title,
            img: p.img,
            badge: p.badge,
            badgeColor: p.badgeColor,
            desc: p.desc,
          })),
  };
}

export type PortfolioProject = {
  id: number;
  title: string;
  img: string;
  category: "All" | "Branding" | "Graphic Design" | "Presentations";
  badge: string;
  badgeColor: string;
  desc: string;
};

export function mapPortfolioProjects(tree: CmsPageTree | null): PortfolioProject[] {
  const maps = getModuleFieldMaps(tree, "portfolio.projects");
  if (!maps.length) {
    return fallbackProjects.map((p) => ({
      id: p.id,
      title: p.title,
      img: p.img,
      category: p.category,
      badge: p.badge,
      badgeColor: p.badgeColor,
      desc: p.desc,
    }));
  }
  return maps.map((m, i) => {
    const d = fallbackProjects[i] ?? fallbackProjects[0];
    const img = resolveImageSrc(m, ["image", "image_url"], d.img, d.title);
    const cat = fieldString(m, "category", d.category) as PortfolioProject["category"];
    return {
      id: i + 1,
      title: fieldString(m, "title", d.title),
      img: img.src,
      category: cat === "All" ? d.category : cat,
      badge: fieldString(m, "badge", d.badge),
      badgeColor: hexToBadgeClass(fieldString(m, "badge_color", ""), d.badgeColor),
      desc: fieldString(m, "description", d.desc),
    };
  });
}

export function mapPortfolioPage(tree: CmsPageTree | null) {
  const hero = getFirstPostFields(tree, "portfolio.hero");
  const intro = getFirstPostFields(tree, "portfolio.intro");
  const filters = getFirstPostFields(tree, "portfolio.filters");
  const ctaFields = getFirstPostFields(tree, "portfolio.cta");
  const modal = getFirstPostFields(tree, "portfolio.modal");
  const cta = fieldCta(ctaFields, "primary_cta");
  const categories = fieldList(filters, "categories", [
    "All",
    "Branding",
    "Graphic Design",
    "Presentations",
  ]) as PortfolioProject["category"][];
  return {
    hero: {
      eyebrow: fieldString(hero, "eyebrow", "Our Portfolio"),
      heading: fieldString(hero, "heading", "Work That Inspires"),
      subheading: fieldString(
        hero,
        "subheading",
        "A showcase of our design expertise across branding, graphic design, and presentations.",
      ),
    },
    intro: fieldString(
      intro,
      "body",
      "<strong>Aesthara</strong> delivers tailored design and creative solutions across industries, partnering with marketing agencies, startups, entrepreneurs, and enterprise firms through project-based engagements, long-term retainers, and dedicated service models.",
    ),
    filters: categories.length ? categories : (["All", "Branding", "Graphic Design", "Presentations"] as const),
    emptyMessage: fieldString(filters, "empty_message", "No projects found for this category."),
    cta: {
      heading: fieldString(ctaFields, "heading", "Ready to start your next project?"),
      label: cta?.label ?? "Start Your Project",
    },
    modal: {
      hoverLabel: fieldString(modal, "hover_label", "View Details"),
      closeLabel: fieldString(modal, "close_label", "Close"),
    },
    projects: mapPortfolioProjects(tree),
  };
}

export function mapPrivacyPolicy(tree: CmsPageTree | null) {
  const posts = getModulePosts(tree, "legal.privacy");
  const header = posts.find((p) => "title" in p.fields) ?? posts[0];
  const sections = posts.filter((p) => p.fields.heading && p.fields.body && !p.fields.title);
  return {
    title: fieldString(header?.fields, "title", "Privacy Policy"),
    effectiveDate: fieldString(
      header?.fields,
      "effective_date",
      "Effective Date: 15 March 2026",
    ),
    lastUpdated: fieldString(
      header?.fields,
      "last_updated",
      "Last Updated: 17 March 2026",
    ),
    intro: fieldString(
      header?.fields,
      "intro",
      'At Aesthara ("we," "our," or "us"), we value your privacy and are committed to protecting the information you share with us through our website.',
    ),
    sections:
      sections.length > 0
        ? sections.map((p, i) => ({
            heading: fieldString(p.fields, "heading", fallbackPrivacySections[i]?.heading ?? ""),
            body: fieldString(p.fields, "body", fallbackPrivacySections[i]?.body ?? ""),
          }))
        : fallbackPrivacySections,
  };
}

export function mapPageSeo(
  slug: string,
  tree: CmsPageTree | null,
  siteSeo?: { title?: string | null; description?: string | null } | null,
) {
  const pageSeo = tree?.page?.seo;
  const fb = fallbackSeo[slug as keyof typeof fallbackSeo] ?? fallbackSeo.home;
  return {
    title: pageSeo?.title || siteSeo?.title || fb.title,
    description: pageSeo?.description || siteSeo?.description || fb.description,
  };
}

export function resolveLogoSrc(url: string) {
  if (url.startsWith("http")) return url;
  if (url.startsWith("/api/")) return cmsMediaUrl(url);
  return url;
}
