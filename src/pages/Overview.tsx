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
import { ServiceCard } from "@/components/services/ServiceCard";
import { StarRating } from "@/components/common/StarRating";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getFeaturedServices } from "@/data/services";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";
import type { Product } from "@/types";
import {
  CORE_VALUES,
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
              <span className="text-[#bde8c0]">{SITE.phone}</span>
            </div>
          </div>
        </div>

        <div className="container flex min-h-[calc(100svh-6.5rem)] items-center py-10 sm:py-14 md:min-h-[calc(100vh-7rem)] md:py-20">
          <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
            <Badge className="border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur hover:bg-white/10">
              Enterprise Fire Safety and Security
            </Badge>
            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:mt-6 md:text-6xl lg:text-7xl">
              Balochistan Standard Services
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:mt-6 md:text-lg md:leading-8">
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
                to="/contact"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "w-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-[#10231d] min-[420px]:w-auto",
                })}
              >
                <PhoneCall className="size-4" /> Get a Quote
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
                to={`/products?category=${category.id}`}
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
        <div className="container grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why BSS"
              title="Professional systems, installed and supported properly"
              description="Company information, services, industries, projects and products stay together on this first overview page."
              className="[&>p:last-child]:text-white/65"
            />
            <ul className="mt-5 space-y-3 sm:mt-6">
              {[
                "Compliance with SBP, EN54 and international safety standards",
                "Certified engineers for design, installation and maintenance",
                "Genuine OEM equipment from authorized global partners",
                "24/7 monitoring and rapid emergency response",
                "Detailed documentation and compliance certification",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-[#8ed0af]" />
                  <span className="text-sm leading-6 text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item) => (
              <Card key={item.title} className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/20">
                <CardContent className="flex gap-3 p-5 sm:gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af]">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-white/60">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#0f1b18] text-white [&_.text-foreground]:text-white [&_.text-muted-foreground]:text-white/60 [&_.group]:border-white/10 [&_.group]:bg-[#10231d] [&_.group]:text-white">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="Installation, maintenance and emergency support"
            description="From survey and supply to installation, training and annual maintenance."
            className="[&>p:last-child]:text-white/65"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#07130f] text-white">
        <div className="container">
          <SectionHeading eyebrow="What drives us" title="Core Values" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CORE_VALUES.map((value) => (
              <Card key={value.title} className="border-white/10 bg-[#10231d] text-center text-white shadow-xl shadow-black/20">
                <CardContent className="flex flex-col items-center gap-3 p-5 sm:p-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#1f3b31] text-[#8ed0af]">
                    <Icon name={value.icon} className="size-6" />
                  </div>
                  <p className="font-semibold">{value.title}</p>
                  <p className="text-sm text-white/60">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#0f1b18] text-white">
        <div className="container">
          <SectionHeading
            eyebrow="Sectors"
            title="Industries We Serve"
            description="Fire safety, surveillance and access control for facilities where reliability, records and response time matter."
            className="[&>p:last-child]:text-white/65"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <Card key={industry.id} className="border-white/10 bg-[#10231d] text-white">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#c91616] text-white">
                    <Icon name={industry.icon} className="size-5" />
                  </div>
                  <span className="text-sm font-semibold">{industry.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#07130f] text-white">
        <div className="container">
          <SectionHeading eyebrow="Our people" title="Team Information" />
          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {TEAM.map((member) => (
              <Card key={member.name} className="border-white/10 bg-[#10231d] text-center text-white shadow-xl shadow-black/20">
                <CardContent className="flex flex-col items-center gap-3 p-6 sm:p-8">
                  <div className="flex size-14 items-center justify-center rounded-full bg-[#c91616] text-white sm:size-16">
                    <Icon name={member.icon} className="size-7 sm:size-8" />
                  </div>
                  <p className="text-lg font-semibold">{member.name}</p>
                  <p className="text-sm text-white/60">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#0f1b18] text-white">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="Trusted by regional teams" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="h-full border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/20">
                <CardContent className="flex h-full flex-col gap-4 p-5 sm:p-6">
                  <StarRating value={testimonial.rating} />
                  <p className="flex-1 text-sm text-white/60">
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

      <section className="border-y border-white/10 bg-[#07130f] py-12 text-white">
        <div className="container">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            Authorized technology partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:gap-x-12 sm:gap-y-6">
            {PARTNERS.map((partner) => (
              <span key={partner.id} className="text-base font-bold text-white/55 sm:text-xl">
                {partner.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#0f1b18]">
        <div className="container">
          <div className="flex flex-col items-stretch justify-between gap-5 rounded-lg border border-white/10 bg-[#07130f] p-5 text-white shadow-2xl shadow-black/20 sm:p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
                Need urgent fire safety or security help?
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/65 sm:text-base">
                Our emergency response team is available 24/7 across Balochistan.
              </p>
            </div>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={buttonVariants({
                size: "lg",
                className: "w-full bg-[#c91616] text-white hover:bg-[#a90f0f] md:w-auto",
              })}
            >
              <PhoneCall className="size-5" /> {SITE.phone}
            </a>
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
            to={`/products/${product.slug}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#c91616] px-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#a90f0f] group-hover:bg-[#b81212]"
          >
            View Details <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
