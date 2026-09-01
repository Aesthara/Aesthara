import { useQuery } from "@tanstack/react-query";
import { fetchCmsPage, fetchCmsSite, type CmsPageTree, type CmsSiteData } from "../lib/cms/client";

const STALE_TIME = 5 * 60 * 1000;

export function useCmsSite() {
  return useQuery<CmsSiteData | null>({
    queryKey: ["cms", "site"],
    queryFn: fetchCmsSite,
    staleTime: STALE_TIME,
    retry: 1,
  });
}

export function useCmsPage(slug: string) {
  return useQuery<CmsPageTree | null>({
    queryKey: ["cms", "page", slug],
    queryFn: () => fetchCmsPage(slug),
    staleTime: STALE_TIME,
    retry: 1,
  });
}
