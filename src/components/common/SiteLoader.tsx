import { useEffect, useState } from "react";
import { SITE_PRELOAD_IMAGES } from "@/lib/siteAssets";
import { SITE } from "@/lib/constants";

const MAX_LOADING_MS = 4800;
const MIN_LOADING_MS = 700;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitForWindowLoad() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

async function waitForFonts() {
  if ("fonts" in document) {
    await document.fonts.ready;
  }
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => {
      if ("decode" in image) {
        void image.decode().finally(resolve);
        return;
      }

      resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  });
}

async function waitForMountedImages() {
  const images = Array.from(document.images);

  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
}

async function waitForSiteReadiness() {
  await Promise.all([
    waitForWindowLoad(),
    waitForFonts(),
    waitForMountedImages(),
    Promise.all(SITE_PRELOAD_IMAGES.map(preloadImage)),
  ]);
}

export function useInitialSiteLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const finish = async () => {
      await Promise.all([
        Promise.race([waitForSiteReadiness(), delay(MAX_LOADING_MS)]),
        delay(MIN_LOADING_MS),
      ]);

      if (active) {
        setIsLoading(false);
      }
    };

    void finish();

    return () => {
      active = false;
    };
  }, []);

  return isLoading;
}

export function SiteLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className={[
        "fixed inset-0 z-[9999] grid place-items-center bg-[#07130f] text-white transition-all duration-500",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-live="polite"
      aria-busy={visible}
    >
      <div className="flex w-[min(88vw,360px)] flex-col items-center text-center">
        <div className="relative flex size-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-2 rounded-full border-2 border-[#c91616] border-t-transparent motion-safe:animate-spin" />
          <img
            src="/assets/images/bss-logo.png"
            alt={`${SITE.name} logo`}
            className="size-16 object-contain"
          />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#bde8c0]">
          Balochistan Standard Services
        </p>
        <p className="mt-2 text-sm text-white/65">Preparing safety systems</p>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-[#c91616] motion-safe:animate-[loader-progress_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
