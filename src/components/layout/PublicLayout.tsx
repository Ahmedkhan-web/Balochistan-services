import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

const Footer = lazy(() =>
  import("./Footer").then((module) => ({ default: module.Footer })),
);
const FloatingActions = lazy(() =>
  import("@/components/common/FloatingActions").then((module) => ({
    default: module.FloatingActions,
  })),
);

export function PublicLayout() {
  const location = useLocation();
  const [showPeripheralUi, setShowPeripheralUi] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/overview") {
      return;
    }

    window.requestAnimationFrame(() => {
      (window as Window & { __bssCriticalReady?: boolean }).__bssCriticalReady = true;
      window.dispatchEvent(new Event("bss:critical-ready"));
    });
  }, [location.pathname]);

  useEffect(() => {
    const show = () => setShowPeripheralUi(true);
    const timeoutId = globalThis.setTimeout(show, 8000);

    window.addEventListener("scroll", show, { once: true, passive: true });
    window.addEventListener("touchstart", show, { once: true, passive: true });
    window.addEventListener("pointerdown", show, { once: true, passive: true });

    return () => {
      globalThis.clearTimeout(timeoutId);
      window.removeEventListener("scroll", show);
      window.removeEventListener("touchstart", show);
      window.removeEventListener("pointerdown", show);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {showPeripheralUi && (
        <Suspense fallback={null}>
          <Footer />
          <FloatingActions />
        </Suspense>
      )}
      <ScrollRestoration />
    </div>
  );
}
