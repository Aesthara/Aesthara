import { useQuery, type QueryClient } from "@tanstack/react-query";
import { fetchCmsPage, fetchCmsSite, type CmsPageTree, type CmsSiteData } from "../lib/cms/client";

/** Short stale window so CMS purge + focus refetch picks up new content quickly. */
export const CMS_STALE_TIME = 30_000;

export function cmsSiteQueryKey() {
  return ["cms", "site"] as const;
}

export function cmsPageQueryKey(slug: string) {
  return ["cms", "page", slug] as const;
}

export function cmsSiteQueryOptions() {
  return {
    queryKey: cmsSiteQueryKey(),
    queryFn: fetchCmsSite,
    staleTime: CMS_STALE_TIME,
    /** Loaders own mount freshness — avoid duplicate fetch races. */
    refetchOnMount: false as const,
    refetchOnWindowFocus: true as const,
    retry: 1 as const,
  };
}

export function cmsPageQueryOptions(slug: string) {
  return {
    queryKey: cmsPageQueryKey(slug),
    queryFn: () => fetchCmsPage(slug),
    staleTime: CMS_STALE_TIME,
    refetchOnMount: false as const,
    refetchOnWindowFocus: true as const,
    retry: 1 as const,
  };
}

/** Prefetch into the shared QueryClient (used by TanStack Router loaders). */
export async function ensureCmsSite(client: QueryClient) {
  return client.ensureQueryData(cmsSiteQueryOptions());
}

export async function ensureCmsPage(client: QueryClient, slug: string) {
  return client.ensureQueryData(cmsPageQueryOptions(slug));
}

export function useCmsSite() {
  return useQuery<CmsSiteData | null>(cmsSiteQueryOptions());
}

export function useCmsPage(slug: string) {
  return useQuery<CmsPageTree | null>(cmsPageQueryOptions(slug));
}
