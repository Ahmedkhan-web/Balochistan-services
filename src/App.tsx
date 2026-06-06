import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { SiteLoader } from "@/components/common/SiteLoader";
import { useInitialSiteLoader } from "@/components/common/useInitialSiteLoader";
import { router } from "@/router";
import { queryClient } from "@/lib/queryClient";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import "@/i18n";

export default function App() {
  const applyTheme = useUIStore((s) => s.applyTheme);
  const initialize = useAuthStore((s) => s.initialize);
  const isSiteLoading = useInitialSiteLoader();

  useEffect(() => {
    applyTheme();
    void initialize();
  }, [applyTheme, initialize]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div aria-hidden={isSiteLoading}>
          <RouterProvider router={router} />
        </div>
        <SiteLoader visible={isSiteLoading} />
        <Toaster position="top-right" richColors closeButton />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
