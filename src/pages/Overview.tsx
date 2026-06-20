import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Flame,
  Siren,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/constants";

const OverviewDeferred = lazy(() => import("@/pages/overview/OverviewDeferred"));

const PAGE_HEADER =
  "Professional fire safety, CCTV, access control and emergency systems for commercial, industrial and public-sector facilities.";

const HERO_IMAGE = "/assets/images/hero-overview.jpg";
const HERO_IMAGE_MOBILE = "/assets/images/hero-overview-mobile.jpg";

const stats = [
  { value: "500+", label: "Installations" },
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Monitoring" },
  { value: "100%", label: "Compliance Focus" },
];

const heroSignals = [
  { icon: Flame, title: "Fire Safety", text: "Extinguishers, alarms, detection and refill support." },
  { icon: Camera, title: "CCTV Systems", text: "Modern surveillance for facilities that need proof." },
  { icon: BadgeCheck, title: "Certified Gear", text: "Selected products with compliance documentation." },
  { icon: Siren, title: "Rapid Support", text: "Emergency service and scheduled maintenance teams." },
];

export default function Overview() {
  const heroImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (heroImageRef.current?.complete) {
      signalCriticalContentReady(heroImageRef.current);
    }
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressRegion: "Balochistan",
      addressCountry: "PK",
    },
  };

  return (
    <>
      <Seo title="Overview" path="/" description={PAGE_HEADER} jsonLd={jsonLd} />

      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#07130f] text-white md:min-h-[calc(100vh-4.5rem)]">
        <picture className="absolute inset-0 -z-20" aria-hidden="true">
          <source media="(max-width: 767px)" srcSet={HERO_IMAGE_MOBILE} />
          <img
            ref={heroImageRef}
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover object-[70%_center] md:object-center"
            fetchPriority="high"
            decoding="async"
            onLoad={(event) => signalCriticalContentReady(event.currentTarget)}
            onError={() => dispatchCriticalContentReady()}
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,31,23,0.96)_0%,rgba(8,55,38,0.83)_34%,rgba(52,135,77,0.48)_56%,rgba(5,12,13,0.2)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(5,31,23,0.72)_0%,rgba(5,96,58,0.4)_36%,rgba(7,19,15,0.52)_72%,rgba(0,0,0,0.38)_100%)] md:hidden" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#07130f] to-transparent" />

        <div className="border-b border-white/10 bg-black/25 backdrop-blur-sm">
          <div className="container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:justify-between sm:text-xs sm:tracking-[0.18em]">
            <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:flex-wrap sm:gap-3">
              <span>Fire Safety</span>
              <span className="h-1 w-1 rounded-full bg-[#c91616]" />
              <span>CCTV Solutions</span>
              <span className="h-1 w-1 rounded-full bg-[#c91616]" />
              <span>Quality Products</span>
            </div>
            <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex sm:gap-3">
              <span>24/7 Support</span>
              <span className="text-[#bde8c0]">{SITE.phoneDisplay}</span>
            </div>
          </div>
        </div>

        <div className="flex min-h-[calc(100svh-6.5rem)] w-full items-center px-4 py-10 sm:px-6 sm:py-14 md:min-h-[calc(100vh-7rem)] md:py-20 lg:px-14 2xl:px-16">
          <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
            <Badge className="border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur hover:bg-white/10">
              Enterprise Fire Safety and Security
            </Badge>
            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:mt-6 md:text-6xl lg:text-7xl">
              Balochistan Standard Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:mx-0 md:mt-6 md:text-lg md:leading-8">
              {PAGE_HEADER}
            </p>
            <div className="mt-7 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:justify-center md:mt-9 md:justify-start">
              <Link
                to="/products"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "w-full bg-[#c91616] text-white shadow-lg shadow-red-950/30 hover:bg-[#a90f0f] min-[420px]:w-auto",
                })}
              >
                Shop Products <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/services"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "w-full border-white/30 bg-white/10 text-white backdrop-blur hover:border-[#bde8c0]/60 hover:bg-[#1f3b31] hover:text-white min-[420px]:w-auto",
                })}
              >
                <Siren className="size-4" /> Need Service
              </Link>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mt-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/15 bg-white/[0.09] p-3 shadow-lg backdrop-blur-md sm:p-4"
                >
                  <dt className="text-xl font-bold text-[#bde8c0] sm:text-2xl">{stat.value}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-white/65">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-[#123828] bg-[#07130f] py-8 text-white">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroSignals.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 border-white/10 sm:gap-4 lg:border-l lg:pl-4 first:border-l-0 first:pl-0"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#c91616] shadow-lg shadow-red-950/20 sm:size-12">
                <item.icon className="size-5 sm:size-6" />
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-white/65">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DeferredOverviewLoader />
    </>
  );
}

function DeferredOverviewLoader() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const reveal = () => setShouldLoad(true);
    const sentinel = sentinelRef.current;

    window.addEventListener("scroll", reveal, { once: true, passive: true });
    window.addEventListener("wheel", reveal, { once: true, passive: true });
    window.addEventListener("touchstart", reveal, { once: true, passive: true });

    if (!sentinel || !("IntersectionObserver" in window)) {
      return () => {
        window.removeEventListener("scroll", reveal);
        window.removeEventListener("wheel", reveal);
        window.removeEventListener("touchstart", reveal);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
        }
      },
      { rootMargin: "250px 0px" },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("wheel", reveal);
      window.removeEventListener("touchstart", reveal);
    };
  }, [shouldLoad]);

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? (
        <Suspense fallback={<DeferredOverviewSkeleton />}>
          <OverviewDeferred />
        </Suspense>
      ) : (
        <DeferredOverviewSkeleton />
      )}
    </div>
  );
}

function DeferredOverviewSkeleton() {
  return (
    <section className="border-t border-white/10 bg-[#0f1b18] py-12 text-white md:py-20">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-44 rounded-lg border border-white/10 bg-[#10231d]"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function signalCriticalContentReady(image: HTMLImageElement) {
  const signal = () => dispatchCriticalContentReady();

  if ("decode" in image) {
    void image.decode().then(signal, signal);
    return;
  }

  signal();
}

function dispatchCriticalContentReady() {
  (window as Window & { __bssCriticalReady?: boolean }).__bssCriticalReady = true;
  window.requestAnimationFrame(() => {
    window.dispatchEvent(new Event("bss:critical-ready"));
  });
}

