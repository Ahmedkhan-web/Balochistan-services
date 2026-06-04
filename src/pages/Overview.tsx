import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, PhoneCall, Search, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Icon } from "@/components/common/Icon";
import { ProductCard } from "@/components/products/ProductCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { StarRating } from "@/components/common/StarRating";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getFeaturedServices } from "@/data/services";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";
import {
  CERTIFICATIONS,
  CORE_VALUES,
  INDUSTRIES,
  PARTNERS,
  PROJECTS,
  TESTIMONIALS,
  WHY_CHOOSE_US,
} from "@/data/content";
import { SITE } from "@/lib/constants";

const PAGE_HEADER =
  "Professional fire safety, CCTV, access control and emergency systems for commercial, industrial and public-sector facilities.";

const TEAM = [
  { name: "Operations Team", role: "Certified field engineers & technicians", icon: "workflow" },
  { name: "Monitoring Center", role: "24/7 surveillance & emergency dispatch", icon: "headset" },
  { name: "Consultancy", role: "Security auditors & compliance experts", icon: "clipboard-check" },
];

const stats = [
  { value: "500+", label: "Installations" },
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Monitoring" },
  { value: "100%", label: "Compliance Focus" },
];

export default function Overview() {
  const [query, setQuery] = useState("");
  const services = getFeaturedServices(6);

  const productGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PRODUCT_CATEGORIES.map((category) => {
      const products = PRODUCTS.filter((product) => {
        const matchesCategory = product.category === category.id;
        const matchesQuery =
          !normalizedQuery ||
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.subcategory?.toLowerCase().includes(normalizedQuery) ||
          category.name.toLowerCase().includes(normalizedQuery);

        return matchesCategory && matchesQuery;
      }).slice(0, 20);

      return { category, products };
    }).filter((group) => group.products.length > 0);
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

      <section className="relative overflow-hidden border-b bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.28),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0),rgba(20,83,45,0.45))]" />
        <div className="container relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge className="border-white/20 bg-white/10 text-white hover:bg-white/10">
              Enterprise Fire Safety & Security
            </Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Balochistan Standard Services
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-200">
              {PAGE_HEADER}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className={buttonVariants({ size: "lg" })}>
                Shop Products <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className={buttonVariants({ size: "lg", variant: "secondary" })}
              >
                <PhoneCall className="size-4" /> Get a Quote
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-2xl font-bold text-orange-300">{stat.value}</dt>
                  <dd className="mt-1 text-xs text-slate-300">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <FireExtinguisherShowcase />
        </div>
      </section>

      <section className="section-y">
        <div className="container grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Company Profile",
              icon: "building-2",
              text: "For over 15 years BSS has delivered enterprise fire safety and security solutions to banks, industries, hospitals and government organizations across Balochistan and beyond.",
            },
            {
              title: "Our Mission",
              icon: "award",
              text: "To protect lives and assets by delivering reliable, standards-compliant fire safety and security systems backed by exceptional service.",
            },
            {
              title: "Our Vision",
              icon: "shield-check",
              text: "To be the most trusted security and fire-safety partner in the region, setting the standard for safety excellence.",
            },
          ].map((item) => (
            <Card key={item.title} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <Icon name={item.icon} className="mb-4 size-8 text-primary" />
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading
            eyebrow="Product Catalogue"
            title="Searchable products by category"
            description="Every category shows up to 20 products on the overview page, with live search across names, subcategories and category labels."
          />

          <div className="mx-auto mb-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search fire extinguishers, cameras, alarms..."
                className="h-12 rounded-full pl-12 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-14">
            {productGroups.map(({ category, products }) => (
              <div key={category.id}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {products.length} shown
                    </Badge>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                      <Icon name={category.icon} className="size-6 text-primary" />
                      {category.name}
                    </h2>
                  </div>
                  <Link
                    to={`/products?category=${category.id}`}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    View category <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}

            {productGroups.length === 0 && (
              <div className="rounded-2xl border border-dashed bg-background py-16 text-center text-muted-foreground">
                No overview products match your search.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why BSS"
              title="Professional systems, installed and supported properly"
              description="The site now keeps company information, services, industries, projects and products together on this first overview page."
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
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item) => (
              <Card key={item.title}>
                <CardContent className="flex gap-4 p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="Installation, maintenance and emergency support"
            description="From survey and supply to installation, training and annual maintenance."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <SectionHeading eyebrow="What drives us" title="Core Values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon name={value.icon} className="size-6" />
                  </div>
                  <p className="font-semibold">{value.title}</p>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Accredited" title="Certifications" />
            <div className="mt-6 space-y-3">
              {CERTIFICATIONS.map((certification) => (
                <Card key={certification}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Icon name="badge-check" className="size-5 text-primary" />
                    <span className="text-sm font-medium">{certification}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Sectors" title="Industries We Serve" />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {INDUSTRIES.map((industry) => (
                <Card key={industry.id}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Icon name={industry.icon} className="size-6 text-primary" />
                    <span className="text-sm font-semibold">{industry.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <SectionHeading eyebrow="Portfolio" title="Latest Projects" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="flex aspect-video items-center justify-center bg-slate-950 text-white">
                  <ShieldCheck className="size-10 text-orange-300" />
                </div>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase text-primary">
                    {project.category} - {project.year}
                  </p>
                  <p className="mt-1 font-semibold">{project.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Our people" title="Team Information" />
          <div className="grid gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-8">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon name={member.icon} className="size-8" />
                  </div>
                  <p className="text-lg font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="Trusted by regional teams" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <StarRating value={testimonial.rating} />
                  <p className="flex-1 text-sm text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/40 py-12">
        <div className="container">
          <p className="mb-8 text-center text-sm font-semibold uppercase text-muted-foreground">
            Authorized technology partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((partner) => (
              <span key={partner.id} className="text-xl font-bold text-muted-foreground/70">
                {partner.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-slate-950 p-10 text-white md:flex-row">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Need urgent fire safety or security help?
              </h2>
              <p className="mt-2 text-slate-300">
                Our emergency response team is available 24/7 across Balochistan.
              </p>
            </div>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              <PhoneCall className="size-5" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function FireExtinguisherShowcase() {
  return (
    <div className="relative mx-auto hidden h-[520px] w-full max-w-lg lg:block">
      <div className="absolute inset-x-10 bottom-8 h-20 rounded-full bg-black/40 blur-3xl" />
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className={[
            "absolute bottom-16 rounded-[2rem] bg-gradient-to-br from-red-600 via-orange-500 to-red-900 shadow-2xl",
            item === 0 ? "left-12 h-80 w-28 rotate-[-12deg]" : "",
            item === 1 ? "left-48 h-96 w-32" : "",
            item === 2 ? "right-12 h-72 w-24 rotate-[13deg]" : "",
          ].join(" ")}
        >
          <div className="absolute -top-10 left-1/2 h-12 w-16 -translate-x-1/2 rounded-t-2xl border-8 border-slate-200 border-b-0" />
          <div className="absolute -top-4 left-1/2 h-8 w-14 -translate-x-1/2 rounded-md bg-slate-200" />
          <div className="absolute left-1/2 top-24 flex size-16 -translate-x-1/2 items-center justify-center rounded-full bg-white/95 text-sm font-black text-red-700">
            BSS
          </div>
          <div className="absolute bottom-8 left-1/2 h-20 w-16 -translate-x-1/2 rounded-xl bg-white/90" />
          <div className="absolute inset-x-4 top-5 h-16 rounded-full bg-white/20 blur-xl" />
        </div>
      ))}
      <div className="absolute right-3 top-10 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
        <p className="text-sm font-semibold">3D Safety Preview</p>
        <p className="mt-1 text-xs text-slate-300">Extinguishers, alarms, CCTV and access systems</p>
      </div>
    </div>
  );
}
