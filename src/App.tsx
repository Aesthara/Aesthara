import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import CmsPendingShell from "./components/CmsPendingShell";
import CmsSnippets from "./components/CmsSnippets";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ensureCmsPage, ensureCmsSite } from "./hooks/useCmsPage";
import { queryClient } from "./lib/query-client";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

// Suppress unused Link warning - it's used by child routes
const _Link = Link;

function ScrollToTop() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

const rootRoute = createRootRoute({
  loader: async () => {
    await Promise.all([ensureCmsSite(queryClient), ensureCmsPage(queryClient, "home")]);
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
  loader: async () => {
    await ensureCmsPage(queryClient, "home");
  },
  pendingComponent: CmsPendingShell,
  component: HomePage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  loader: async () => {
    await ensureCmsPage(queryClient, "portfolio");
  },
  pendingComponent: CmsPendingShell,
  component: PortfolioPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  loader: async () => {
    await ensureCmsPage(queryClient, "privacy-policy");
  },
  pendingComponent: CmsPendingShell,
  component: PrivacyPolicyPage,
});

const routeTree = rootRoute.addChildren([homeRoute, portfolioRoute, privacyPolicyRoute]);

const router = createRouter({
  routeTree,
  defaultPendingComponent: CmsPendingShell,
  defaultPendingMs: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
