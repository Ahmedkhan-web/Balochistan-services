import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Flame,
  PhoneCall,
  Search,
  Siren,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Icon } from "@/components/common/Icon";
import { StarRating } from "@/components/common/StarRating";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getFeaturedServices } from "@/data/services";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";
import type { Product } from "@/types";
import {
  INDUSTRIES,
  PARTNERS,
  TESTIMONIALS,
  WHY_CHOOSE_US,
} from "@/data/content";
import { SITE } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const PAGE_HEADER =
  "Professional fire safety, CCTV, access control and emergency systems for commercial, industrial and public-sector facilities.";

const HERO_IMAGE = "/assets/images/hero-overview.png";
const FEATURE_FIRE_IMAGE = "/assets/images/feature-fire.jpg";
const ONLINE_FIRE_INSPECTION_IMAGE =
  "https://images.pexels.com/photos/8978625/pexels-photo-8978625.jpeg?auto=compress&cs=tinysrgb&w=1400";
const ONLINE_CONTROL_ROOM_IMAGE =
  "https://images.pexels.com/photos/30481728/pexels-photo-30481728.jpeg?auto=compress&cs=tinysrgb&w=1400";
const ONLINE_SECTOR_SECURITY_IMAGE =
  "https://images.pexels.com/photos/27765780/pexels-photo-27765780.jpeg?auto=compress&cs=tinysrgb&w=1400";
const ONLINE_BLUEPRINT_MONITORING_IMAGE = ONLINE_CONTROL_ROOM_IMAGE;
const ONLINE_BLUEPRINT_FIRE_IMAGE = ONLINE_FIRE_INSPECTION_IMAGE;

const serviceStories = [
  {
    title: "Fire safety installation",
    text: "Detection, alarms, extinguishers and site-ready emergency planning for commercial facilities.",
    image: ONLINE_FIRE_INSPECTION_IMAGE,
  },
  {
    title: "CCTV command coverage",
    text: "Camera placement, recording, storage and monitoring layouts designed around real facility movement.",
    image: ONLINE_CONTROL_ROOM_IMAGE,
  },
  {
    title: "Access control and maintenance",
    text: "Entry control, routine checks and preventive service plans that keep systems inspection-ready.",
    image: ONLINE_SECTOR_SECURITY_IMAGE,
  },
] as const;

const TEAM = [
  { name: "Operations Team", role: "Certified field engineers and technicians", icon: "workflow" },
  { name: "Monitoring Center", role: "24/7 surveillance and emergency dispatch", icon: "headset" },
  { name: "Consultancy", role: "Security auditors and compliance experts", icon: "clipboard-check" },
];

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

const overviewProductMix = [
  { category: "fire-extinguishers", count: 3 },
  { category: "cctv-cameras", count: 3 },
  { category: "recorders", count: 2 },
  { category: "fire-alarm", count: 3 },
  { category: "access-control", count: 2 },
  { category: "accessories", count: 2 },
] as const;

export default function Overview() {
  const [query, setQuery] = useState("");
  const services = getFeaturedServices(6);

  const overviewProducts = useMemo(() => {
    const selected = overviewProductMix.flatMap(({ category, count }) =>
      PRODUCTS.filter((product) => product.category === category).slice(0, count),
    );
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return selected;
    }

    return selected.filter((product) => {
      const category = PRODUCT_CATEGORIES.find((item) => item.id === product.category);

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.subcategory?.toLowerCase().includes(normalizedQuery) ||
        category?.name.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

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
        <div
          className="absolute inset-0 -z-20 bg-cover bg-[70%_center] md:bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden="true"
        />
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

      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container">
          <div className="mb-8 grid gap-6 lg:mb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeading
              align="left"
              eyebrow="Selected Products"
              title="A focused safety and security lineup"
              description="Fifteen practical products from different categories, chosen for the Overview page. The full catalog stays one click away."
              className="mb-0"
            />
            <div className="grid gap-3 min-[420px]:grid-cols-3">
              {[
                { label: "15", text: "Overview products" },
                { label: "6", text: "Core categories" },
                { label: "1", text: "Unified standard" },
              ].map((item) => (
                <div key={item.text} className="rounded-lg border border-white/10 bg-white/[0.06] p-3 sm:p-4">
                  <p className="text-xl font-bold text-[#bde8c0] sm:text-2xl">{item.label}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/55">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#8ed0af]" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the featured overview products..."
                className="h-12 rounded-lg border-white/10 bg-[#07130f] pl-12 text-white shadow-xl shadow-black/20 placeholder:text-white/45 sm:rounded-full"
              />
            </div>
            <Link
              to="/products"
              className={buttonVariants({
                size: "lg",
                className: "w-full bg-[#c91616] text-white hover:bg-[#a90f0f] lg:w-auto",
              })}
            >
              Full Catalog <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/products/category/${category.id}`}
                className="group rounded-lg border border-white/10 bg-[#162721] p-4 text-center transition hover:-translate-y-1 hover:border-[#bde8c0]/40 hover:bg-[#1d3029] sm:text-left"
              >
                <Icon name={category.icon} className="mx-auto size-6 text-[#8ed0af] sm:mx-0" />
                <p className="mt-3 text-sm font-semibold">{category.name}</p>
                <p className="mt-1 text-xs text-white/50">View category</p>
              </Link>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {overviewProducts.map((product) => (
              <OverviewProductCard key={product.id} product={product} />
            ))}

            {overviewProducts.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-white/20 py-16 text-center text-white/70">
                No overview products match your search.
              </div>
            )}
          </div>

          <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
            <div className="rounded-lg border border-white/10 bg-[#07130f] p-5 md:p-8">
              <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                Product Standards
              </Badge>
              <h3 className="mt-5 text-xl font-bold sm:text-2xl">Built for inspection-ready facilities</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                Every featured item supports a larger facility workflow: prevention, monitoring,
                emergency response, access control and annual maintenance.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Certified supply", "Installation available", "Maintenance support", "Documentation ready"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                    <Check className="size-4 text-[#8ed0af]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,#19382d,#07130f)] p-5 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#bde8c0] sm:text-sm sm:tracking-[0.18em]">
                Need a complete list?
              </p>
              <h3 className="mt-4 text-xl font-bold sm:text-2xl">Explore all products by category</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">
                The Overview stays clean and premium; the Products page carries the full inventory.
              </p>
              <Link
                to="/products"
                className={buttonVariants({
                  className:
                    "mt-6 bg-[#c91616] text-white shadow-lg shadow-red-950/20 hover:bg-[#a90f0f]",
                })}
              >
                Browse Products <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-[#07130f] shadow-2xl shadow-black/20 lg:mt-14">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-[320px]">
                <img
                  src={FEATURE_FIRE_IMAGE}
                  alt="Fire extinguishers prepared for facility safety compliance"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-[#07130f]/80 lg:bg-gradient-to-r" />
              </div>
              <div className="p-5 sm:p-6 md:p-10">
                <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                  Fire Readiness
                </Badge>
                <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                  Organized equipment, cleaner audits, faster response.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  We help facilities keep extinguishers, detection systems, surveillance
                  and maintenance records aligned so safety checks feel prepared instead
                  of rushed.
                </p>
                <div className="mt-6 grid gap-3 min-[420px]:grid-cols-3 sm:mt-8 sm:gap-4">
                  {[
                    { value: "EN3", label: "Equipment guidance" },
                    { value: "AMC", label: "Maintenance plans" },
                    { value: "24/7", label: "Emergency support" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-2xl font-bold text-[#bde8c0]">{item.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#07130f] text-white">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                Why BSS
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Safety systems that look organized before the audit starts.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                BSS brings fire safety, CCTV, access control and maintenance into one
                clean operating standard, so facility managers can move faster with
                fewer surprises.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "500+", label: "Sites supported" },
                { value: "15+", label: "Years experience" },
                { value: "24/7", label: "Urgent response" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-3xl font-extrabold text-[#bde8c0]">{item.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:gap-6">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#10231d] shadow-2xl shadow-black/30 sm:relative sm:min-h-[420px]">
              <div className="relative min-h-[240px] sm:absolute sm:inset-0 sm:min-h-0">
                <img
                  src={ONLINE_FIRE_INSPECTION_IMAGE}
                  alt="Fire safety inspection near a fire hose cabinet"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10231d]/25 to-transparent sm:bg-gradient-to-r sm:from-[#07130f]/92 sm:via-[#07130f]/42 sm:to-transparent" />
              </div>
              <div className="p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-8">
                <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                  Inspection Ready
                </Badge>
                <h3 className="mt-5 max-w-lg text-2xl font-bold leading-tight sm:text-3xl">
                  Fire equipment, records and response plans kept in one professional rhythm.
                </h3>
                <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
                  {["Site survey", "Certified supply", "Maintenance logs"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-black/25 p-3 backdrop-blur">
                      <Check className="size-4 text-[#8ed0af]" />
                      <p className="mt-2 text-sm font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="overflow-hidden rounded-lg border border-white/10 bg-[#10231d] shadow-xl shadow-black/20 sm:relative sm:min-h-[230px]">
                <div className="relative min-h-[190px] sm:absolute sm:inset-0 sm:min-h-0">
                  <img
                    src={ONLINE_CONTROL_ROOM_IMAGE}
                    alt="Security control room monitoring screens"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10231d]/20 to-transparent sm:from-[#07130f] sm:via-[#07130f]/45" />
                </div>
                <div className="p-5 sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ed0af]">
                    Monitoring
                  </p>
                  <p className="mt-2 text-xl font-bold">CCTV and access control designed for real oversight.</p>
                </div>
              </div>

              <div className="grid gap-3">
                {WHY_CHOOSE_US.slice(0, 4).map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-lg border border-white/10 bg-[#10231d] p-4 transition hover:border-[#bde8c0]/35 hover:bg-[#142a23]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af]">
                      <Icon name={item.icon} className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/58">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0f1b18] py-12 text-white md:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                Capabilities
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                One clean system for products, service and response.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                Users should quickly understand what BSS can handle. This section keeps
                services scannable, visual and action-focused.
              </p>
              <Link
                to="/services"
                className={buttonVariants({
                  className: "mt-6 bg-[#c91616] text-white hover:bg-[#a90f0f]",
                })}
              >
                Explore Services <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {services.slice(0, 4).map((service, index) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="group rounded-lg border border-white/10 bg-[#10231d] p-5 shadow-xl shadow-black/15 transition hover:-translate-y-1 hover:border-[#bde8c0]/35 hover:bg-[#142a23] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af] transition group-hover:bg-[#c91616] group-hover:text-white">
                      <Icon name={service.icon} className="size-6" />
                    </div>
                    <span className="text-xs font-semibold text-white/35">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{service.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/58">
                    {service.short_description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#bde8c0]">
                    View service <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 rounded-lg border border-white/10 bg-[#07130f] p-4 sm:grid-cols-3 sm:p-5 lg:mt-14">
            {serviceStories.map((story) => (
              <div key={story.title} className="flex gap-4 rounded-lg p-2">
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-white/10">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{story.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/55">{story.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#07130f] py-12 text-white md:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                Operating Standard
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                A premium process the client can trust before work begins.
              </h2>
            </div>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              Every project moves through a simple professional rhythm: inspect the
              facility, design the right coverage, install cleanly, document the work
              and support it after handover.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {[
              { title: "Survey", icon: "search-check", text: "Site walk-through, risks and coverage gaps." },
              { title: "Design", icon: "workflow", text: "System layout, products and scope clarity." },
              { title: "Install", icon: "wrench", text: "Clean installation by trained technicians." },
              { title: "Document", icon: "file-text", text: "Reports, tags and compliance records." },
              { title: "Support", icon: "headset", text: "Maintenance, emergency help and AMC." },
            ].map((step, index) => (
              <div key={step.title} className="relative rounded-lg border border-white/10 bg-[#10231d] p-5">
                <span className="text-xs font-bold text-white/30">0{index + 1}</span>
                <div className="mt-5 flex size-12 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af]">
                  <Icon name={step.icon} className="size-6" />
                </div>
                <h3 className="mt-5 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0f1b18] py-12 text-white md:py-20">
        <div className="container">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                Sectors
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Protection plans shaped around the facility type.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:ml-auto">
              Banks, hospitals, schools and industrial sites do not need the same
              layout. This section helps visitors see BSS thinking in practical
              environments, not generic packages.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#10231d] shadow-2xl shadow-black/25 sm:relative sm:min-h-[430px]">
              <div className="relative min-h-[240px] sm:absolute sm:inset-0 sm:min-h-0">
                <img
                  src={ONLINE_SECTOR_SECURITY_IMAGE}
                  alt="Surveillance cameras monitoring an industrial facility"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10231d]/25 to-transparent sm:from-[#07130f] sm:via-[#07130f]/45" />
              </div>
              <div className="p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-7">
                <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                  Sector Coverage
                </Badge>
                <h3 className="mt-4 max-w-lg text-2xl font-bold leading-tight sm:text-3xl">
                  CCTV, fire safety and access control planned around real movement.
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { value: "9", label: "Facility types" },
                    { value: "3", label: "Core systems" },
                    { value: "1", label: "Support team" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/10 bg-black/25 p-3 backdrop-blur">
                      <p className="text-2xl font-extrabold text-[#bde8c0]">{item.value}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {INDUSTRIES.map((industry) => (
                <div
                  key={industry.id}
                  className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#10231d] p-4 transition hover:-translate-y-1 hover:border-[#bde8c0]/35 hover:bg-[#142a23]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af] transition group-hover:bg-[#c91616] group-hover:text-white">
                      <Icon name={industry.icon} className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{industry.name}</p>
                      <p className="mt-1 text-sm leading-6 text-white/55">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/35">
                      Coverage
                    </span>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      Fire / CCTV / Access
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#07130f] py-12 text-white md:py-20">
        <div className="container">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                Facility Protection Blueprint
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                A practical safety map from first risk to daily monitoring.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:ml-auto">
              Every facility needs prevention, visibility, controlled access and
              response planning working together. This section shows that complete
              safety logic clearly.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#10231d] shadow-2xl shadow-black/30 sm:relative sm:min-h-[460px]">
              <div className="relative min-h-[260px] sm:absolute sm:inset-0 sm:min-h-0">
                <img
                  src={ONLINE_BLUEPRINT_MONITORING_IMAGE}
                  alt="Security control room monitoring live surveillance feeds"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10231d]/20 to-transparent sm:from-[#07130f] sm:via-[#07130f]/50" />
              </div>
              <div className="p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-8">
                <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                  Control Layer
                </Badge>
                <h3 className="mt-5 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
                  Central monitoring, camera coverage and incident visibility in one view.
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Live surveillance", "Access events", "Emergency alerts"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-black/25 p-3 text-sm font-semibold text-white/75 backdrop-blur">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="overflow-hidden rounded-lg border border-white/10 bg-[#10231d] shadow-xl shadow-black/20 sm:relative sm:min-h-[250px]">
                <div className="relative min-h-[190px] sm:absolute sm:inset-0 sm:min-h-0">
                  <img
                    src={ONLINE_BLUEPRINT_FIRE_IMAGE}
                    alt="Fire safety inspection near a fire hose cabinet"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10231d]/20 to-transparent sm:from-[#07130f] sm:via-[#07130f]/42" />
                </div>
                <div className="p-5 sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ed0af]">
                    Fire Readiness
                  </p>
                  <p className="mt-2 max-w-md text-xl font-bold">
                    Inspection-ready fire equipment, signage and service records.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  { title: "Prevent", icon: "shield-check", text: "Reduce fire and security risk before incidents happen." },
                  { title: "Detect", icon: "cctv", text: "Use cameras, alarms and detectors to capture early signals." },
                  { title: "Control", icon: "fingerprint", text: "Secure entries, sensitive rooms and staff movement." },
                  { title: "Respond", icon: "headset", text: "Keep maintenance and emergency response close to the facility." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-lg border border-white/10 bg-[#10231d] p-4 transition hover:border-[#bde8c0]/35 hover:bg-[#142a23]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af]">
                      <Icon name={item.icon} className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/58">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0f1b18] py-12 text-white md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
              Trust
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              People, partners and clients in one reliable network.
            </h2>
            <div className="mt-7 grid gap-3">
              {TEAM.map((member) => (
                <div key={member.name} className="flex items-center gap-4 rounded-lg border border-white/10 bg-[#10231d] p-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#c91616] text-white">
                    <Icon name={member.icon} className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-white/58">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="h-full border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/20">
                <CardContent className="flex h-full flex-col gap-4 p-5 sm:p-6">
                  <StarRating value={testimonial.rating} />
                  <p className="flex-1 text-sm leading-7 text-white/62">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-white/50">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-[#07130f] py-12 text-white">
        <div className="container">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                Authorized technology partners
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Trusted brands behind reliable systems.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/55">
              Equipment selection stays aligned with proven fire safety, CCTV and access control ecosystems.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#07130f] to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#07130f] to-transparent sm:w-32" />
          <div className="flex w-max animate-marquee-left gap-4 px-4 [animation-play-state:running] hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex h-24 min-w-[190px] items-center justify-center rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 text-center shadow-xl shadow-black/10 backdrop-blur transition hover:border-[#bde8c0]/40 hover:bg-[#10231d] sm:min-w-[220px]"
              >
                <div>
                  <p className="text-lg font-extrabold tracking-wide text-white/78 sm:text-xl">
                    {partner.logo}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8ed0af]/70">
                    Authorized Partner
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0f1b18] py-12 md:py-20">
        <div className="container">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#10231d_0%,#07130f_55%,#142a23_100%)] p-5 text-white shadow-2xl shadow-black/25 sm:p-8 md:p-10">
            <div className="flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ed0af]">
                  Ready for the next site?
                </p>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                  Request a professional safety and security assessment.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  Tell BSS what you need: fire safety, CCTV, access control, maintenance or a full facility plan.
                </p>
              </div>
              <div className="grid gap-3 sm:flex md:shrink-0">
                <a
                  href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                  className={buttonVariants({
                    size: "lg",
                    className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
                  })}
                >
                  <PhoneCall className="size-5" /> {SITE.phoneDisplay}
                </a>
                <Link
                  to="/contact"
                  className={buttonVariants({
                    size: "lg",
                  variant: "outline",
                    className: "border-white/25 bg-white/[0.06] text-white hover:border-[#bde8c0]/60 hover:bg-[#1f3b31] hover:text-white",
                  })}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OverviewProductCard({ product }: { product: Product }) {
  const category = PRODUCT_CATEGORIES.find((item) => item.id === product.category);
  const price = product.discount_price ?? product.price;

  return (
    <Card className="group relative isolate overflow-hidden rounded-lg border-white/10 bg-[linear-gradient(180deg,#183027,#0b1713)] text-white shadow-[0_14px_34px_rgba(0,0,0,0.24)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#bde8c0]/45 hover:shadow-[0_18px_44px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-white/0 transition duration-300 group-hover:ring-[#bde8c0]/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent" />
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[5/3] overflow-hidden bg-[#ecf4ee]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full origin-center object-cover [backface-visibility:hidden] [transform:translateZ(0)] transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130f]/28 via-transparent to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 to-transparent" />
          <div className="absolute left-3 top-3 rounded-full bg-[#07130f]/85 px-3 py-1 text-xs font-semibold text-[#bde8c0] shadow-sm backdrop-blur">
            {category?.name}
          </div>
          {product.discount_price && (
            <div className="absolute right-3 top-3 rounded-full bg-[#c91616] px-3 py-1 text-xs font-bold text-white shadow-sm">
              Offer
            </div>
          )}
        </div>
      </Link>
      <CardContent className="relative flex min-h-[180px] flex-col border-t border-white/10 bg-[linear-gradient(180deg,#183027,#0b1713)] p-4 sm:min-h-[185px]">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <p className="min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8ed0af] sm:text-xs sm:tracking-[0.16em]">
            {product.subcategory}
          </p>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/65">
            In stock
          </span>
        </div>
        <Link
          to={`/products/${product.slug}`}
          className="mt-2 line-clamp-2 font-bold leading-snug transition-colors group-hover:text-[#bde8c0]"
        >
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/58">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-3 grid gap-2 border-t border-white/10 pt-3 min-[380px]:flex min-[380px]:items-end min-[380px]:justify-between min-[380px]:gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/45">Starting at</p>
              <p className="mt-1 text-lg font-extrabold text-white sm:text-xl">{formatCurrency(price)}</p>
            </div>
            {product.discount_price && (
              <p className="text-xs text-white/45 line-through">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>
          <Link
            to={`/products/category/${product.category}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#c91616] px-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#a90f0f] group-hover:bg-[#b81212]"
          >
            View More Varieties <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
