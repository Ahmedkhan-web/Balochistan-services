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

      <section className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#07130f] text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-[70%_center] md:bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,31,23,0.96)_0%,rgba(8,55,38,0.83)_34%,rgba(52,135,77,0.48)_56%,rgba(5,12,13,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#07130f] to-transparent" />

        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container flex flex-wrap items-center justify-between gap-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            <div className="flex flex-wrap items-center gap-3">
              <span>Fire Safety</span>
              <span className="h-1 w-1 rounded-full bg-[#c91616]" />
              <span>CCTV Solutions</span>
              <span className="h-1 w-1 rounded-full bg-[#c91616]" />
              <span>Quality Products</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span>24/7 Support</span>
              <span className="text-[#bde8c0]">{SITE.phone}</span>
            </div>
          </div>
        </div>

        <div className="container flex min-h-[calc(100vh-7rem)] items-center py-14 md:py-20">
          <div className="max-w-3xl">
            <Badge className="border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur hover:bg-white/10">
              Enterprise Fire Safety and Security
            </Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Balochistan Standard Services
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              {PAGE_HEADER}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/products"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "bg-[#c91616] text-white shadow-lg shadow-red-950/30 hover:bg-[#a90f0f]",
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
                    "border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-[#10231d]",
                })}
              >
                <PhoneCall className="size-4" /> Get a Quote
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/15 bg-white/[0.09] p-4 shadow-lg backdrop-blur-md"
                >
                  <dt className="text-2xl font-bold text-[#bde8c0]">{stat.value}</dt>
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
        <div className="container grid gap-4 md:grid-cols-4">
          {heroSignals.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 border-white/10 md:border-l md:pl-4 first:border-l-0 first:pl-0"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#c91616] shadow-lg shadow-red-950/20">
                <item.icon className="size-6" />
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
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeading
              align="left"
              eyebrow="Selected Products"
              title="A focused safety and security lineup"
              description="Fifteen practical products from different categories, chosen for the Overview page. The full catalog stays one click away."
              className="mb-0"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "15", text: "Overview products" },
                { label: "6", text: "Core categories" },
                { label: "1", text: "Unified standard" },
              ].map((item) => (
                <div key={item.text} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-2xl font-bold text-[#bde8c0]">{item.label}</p>
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
                className="h-12 rounded-full border-white/10 bg-[#07130f] pl-12 text-white shadow-xl shadow-black/20 placeholder:text-white/45"
              />
            </div>
            <Link
              to="/products"
              className={buttonVariants({
                size: "lg",
                className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
              })}
            >
              Full Catalog <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group rounded-lg border border-white/10 bg-[#162721] p-4 transition hover:-translate-y-1 hover:border-[#bde8c0]/40 hover:bg-[#1d3029]"
              >
                <Icon name={category.icon} className="size-6 text-[#8ed0af]" />
                <p className="mt-3 text-sm font-semibold">{category.name}</p>
                <p className="mt-1 text-xs text-white/50">View category</p>
              </Link>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {overviewProducts.map((product) => (
              <OverviewProductCard key={product.id} product={product} />
            ))}

            {overviewProducts.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-white/20 py-16 text-center text-white/70">
                No overview products match your search.
              </div>
            )}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-white/10 bg-[#07130f] p-6 md:p-8">
              <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                Product Standards
              </Badge>
              <h3 className="mt-5 text-2xl font-bold">Built for inspection-ready facilities</h3>
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
            <div className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,#19382d,#07130f)] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bde8c0]">
                Need a complete list?
              </p>
              <h3 className="mt-4 text-2xl font-bold">Explore all products by category</h3>
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

          <div className="mt-14 overflow-hidden rounded-lg border border-white/10 bg-[#07130f] shadow-2xl shadow-black/20">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[320px] overflow-hidden">
                <img
                  src={FEATURE_FIRE_IMAGE}
                  alt="Fire extinguishers prepared for facility safety compliance"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-[#07130f]/80 lg:bg-gradient-to-r" />
              </div>
              <div className="p-6 md:p-10">
                <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
                  Fire Readiness
                </Badge>
                <h3 className="mt-5 text-3xl font-bold tracking-tight">
                  Organized equipment, cleaner audits, faster response.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  We help facilities keep extinguishers, detection systems, surveillance
                  and maintenance records aligned so safety checks feel prepared instead
                  of rushed.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
        <div className="container grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why BSS"
              title="Professional systems, installed and supported properly"
              description="Company information, services, industries, projects and products stay together on this first overview page."
              className="[&>p:last-child]:text-white/65"
            />
            <ul className="mt-6 space-y-3">
              {[
                "Compliance with SBP, EN54 and international safety standards",
                "Certified engineers for design, installation and maintenance",
                "Genuine OEM equipment from authorized global partners",
                "24/7 monitoring and rapid emergency response",
                "Detailed documentation and compliance certification",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-[#8ed0af]" />
                  <span className="text-sm text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item) => (
              <Card key={item.title} className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/20">
                <CardContent className="flex gap-4 p-5">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#07130f] text-white">
        <div className="container">
          <SectionHeading eyebrow="What drives us" title="Core Values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value) => (
              <Card key={value.title} className="border-white/10 bg-[#10231d] text-center text-white shadow-xl shadow-black/20">
                <CardContent className="flex flex-col items-center gap-3 p-6">
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
          <div className="grid gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <Card key={member.name} className="border-white/10 bg-[#10231d] text-center text-white shadow-xl shadow-black/20">
                <CardContent className="flex flex-col items-center gap-3 p-8">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#c91616] text-white">
                    <Icon name={member.icon} className="size-8" />
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="h-full border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/20">
                <CardContent className="flex h-full flex-col gap-4 p-6">
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
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((partner) => (
              <span key={partner.id} className="text-xl font-bold text-white/55">
                {partner.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-white/10 bg-[#0f1b18]">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-white/10 bg-[#07130f] p-8 text-white shadow-2xl shadow-black/20 md:flex-row md:p-10">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Need urgent fire safety or security help?
              </h2>
              <p className="mt-2 text-white/65">
                Our emergency response team is available 24/7 across Balochistan.
              </p>
            </div>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={buttonVariants({
                size: "lg",
                className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
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
    <Card className="group relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,#183027,#0b1713)] text-white shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-[#bde8c0]/40 hover:shadow-2xl hover:shadow-black/35">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent" />
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[5/3] overflow-hidden bg-[#ecf4ee]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
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
      <CardContent className="relative flex min-h-[185px] flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ed0af]">
            {product.subcategory}
          </p>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/65">
            In stock
          </span>
        </div>
        <Link
          to={`/products/${product.slug}`}
          className="mt-2 line-clamp-2 font-bold leading-snug hover:text-[#bde8c0]"
        >
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/58">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-end justify-between gap-3 border-t border-white/10 pt-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/45">Starting at</p>
              <p className="mt-1 text-xl font-extrabold text-white">{formatCurrency(price)}</p>
            </div>
            {product.discount_price && (
              <p className="text-xs text-white/45 line-through">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#c91616] px-4 text-sm font-semibold text-white transition hover:bg-[#a90f0f]"
          >
            View Details <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
