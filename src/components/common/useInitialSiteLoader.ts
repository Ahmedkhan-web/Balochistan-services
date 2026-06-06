import { useEffect, useState } from "react";
import { HERO_OVERVIEW_IMAGE, SITE_PRELOAD_IMAGES } from "@/lib/siteAssets";

const MAX_LOADING_MS = 1600;
const MIN_LOADING_MS = 350;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
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

async function waitForSiteReadiness() {
  await Promise.all([
    waitForFonts(),
    Promise.all(SITE_PRELOAD_IMAGES.map(preloadImage)),
  ]);
}

async function waitForCriticalHeroImage() {
  await preloadImage(HERO_OVERVIEW_IMAGE);
}

export function useInitialSiteLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const finish = async () => {
      await Promise.all([
        waitForCriticalHeroImage(),
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
