import { lazy, Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteLoader } from "@/components/common/SiteLoader";
import { router } from "@/router";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";

const Toaster = lazy(() =>
  import("sonner").then((module) => ({ default: module.Toaster })),
);

export default function App() {
  const applyTheme = useUIStore((s) => s.applyTheme);
  const initialize = useAuthStore((s) => s.initialize);
  const [showToaster, setShowToaster] = useState(false);
  const [isCriticalLoading, setIsCriticalLoading] = useState(true);

  useEffect(() => {
    applyTheme();
    void initialize();
  }, [applyTheme, initialize]);

  useEffect(() => {
    const show = () => setShowToaster(true);
    const timeoutId = globalThis.setTimeout(show, 8000);

    window.addEventListener("pointerdown", show, { once: true, passive: true });
    window.addEventListener("keydown", show, { once: true });

    return () => {
      globalThis.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", show);
      window.removeEventListener("keydown", show);
    };
  }, []);

  useEffect(() => {
    const markReady = () => setIsCriticalLoading(false);
    const safetyTimeoutId = globalThis.setTimeout(markReady, 5000);
    const readinessWindow = window as Window & { __bssCriticalReady?: boolean };

    if (readinessWindow.__bssCriticalReady) {
      markReady();
    }

    window.addEventListener("bss:critical-ready", markReady, { once: true });

    return () => {
      globalThis.clearTimeout(safetyTimeoutId);
      window.removeEventListener("bss:critical-ready", markReady);
    };
  }, []);

  return (
    <HelmetProvider>
      <div aria-hidden={isCriticalLoading}>
        <RouterProvider router={router} />
      </div>
      <SiteLoader visible={isCriticalLoading} />
      {showToaster && (
        <Suspense fallback={null}>
          <Toaster position="top-right" richColors closeButton />
        </Suspense>
      )}
    </HelmetProvider>
  );
}
