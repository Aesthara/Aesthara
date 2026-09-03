import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import CmsPendingShell from "./components/CmsPendingShell";
import CmsSnippets from "./components/CmsSnippets";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ensureCmsPage, ensureCmsSite } from "./hooks/useCmsPage";
import type { CmsPageTree, CmsSiteData } from "./lib/cms/client";
import { queryClient } from "./lib/query-client";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

export type RootLoaderData = {
  site: CmsSiteData | null;
  home: CmsPageTree | null;
  portfolio: CmsPageTree | null;
  privacy: CmsPageTree | null;
};

export type PageLoaderData = {
  page: CmsPageTree | null;
};

/** After retries fail, treat as miss so static fallbacks paint once (no null→CMS flash). */
async function safeEnsurePage(slug: string): Promise<CmsPageTree | null> {
  try {
    return await ensureCmsPage(queryClient, slug);
  } catch (error) {
    console.error(`[cms] loader page failed (${slug})`, error);
    return null;
  }
}

async function safeEnsureSite(): Promise<CmsSiteData | null> {
  try {
    return await ensureCmsSite(queryClient);
  } catch (error) {
    console.error("[cms] loader site failed", error);
    return null;
  }
}

function ScrollToTop() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

const rootRoute = createRootRoute({
  loader: async (): Promise<RootLoaderData> => {
    const [site, home, portfolio, privacy] = await Promise.all([
      safeEnsureSite(),
      safeEnsurePage("home"),
      safeEnsurePage("portfolio"),
      safeEnsurePage("privacy-policy"),
    ]);
    return { site, home, portfolio, privacy };
  },
  pendingComponent: CmsPendingShell,
  component: () => (
    <>
      <CmsSnippets />
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: async (): Promise<PageLoaderData> => {
    const page = await safeEnsurePage("home");
    return { page };
  },
  pendingComponent: CmsPendingShell,
  component: HomePage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  loader: async (): Promise<PageLoaderData> => {
    const page = await safeEnsurePage("portfolio");
    return { page };
  },
  pendingComponent: CmsPendingShell,
  component: PortfolioPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  loader: async (): Promise<PageLoaderData> => {
    const page = await safeEnsurePage("privacy-policy");
    return { page };
  },
  pendingComponent: CmsPendingShell,
  component: PrivacyPolicyPage,
});

const routeTree = rootRoute.addChildren([homeRoute, portfolioRoute, privacyPolicyRoute]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: CmsPendingShell,
  defaultPendingMs: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}