import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Hero } from "@/components/home/Hero";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Icon } from "@/components/common/Icon";
import { StarRating } from "@/components/common/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";
import { getFeaturedServices } from "@/data/services";
import {
  INDUSTRIES,
  PARTNERS,
  PROJECTS,
  TESTIMONIALS,
  WHY_CHOOSE_US,
} from "@/data/content";
import { SITE } from "@/lib/constants";

export default function Home() {
  const { t } = useTranslation();
  const products = getFeaturedProducts(8);
  const services = getFeaturedServices(6);

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
      <Seo jsonLd={jsonLd} />
      <Hero />

      {/* Company Introduction */}
      <section className="section-y">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow={t("sections.intro")}
              title="Your trusted partner in safety & security"
              description="Balochistan Standard Services (BSS) is a leading provider of fire safety and security solutions. We design, supply, install and maintain enterprise-grade systems that protect lives and assets across the region."
              className="mb-6"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {WHY_CHOOSE_US.slice(0, 4).map((item) => (
                <div key={item.title} className="flex gap-3">
                  <Icon name={item.icon} className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {INDUSTRIES.slice(0, 4).map((ind) => (
              <Card key={ind.id} className="text-center">
                <CardContent className="flex flex-col items-center gap-2 p-6">
                  <Icon name={ind.icon} className="size-8 text-primary" />
                  <p className="font-semibold">{ind.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {ind.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-y bg-muted/40">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Shop"
              title={t("sections.featuredProducts")}
              className="mb-8"
            />
            <Link
              to="/products"
              className="mb-8 hidden items-center gap-1 text-sm font-semibold text-primary sm:flex"
            >
              {t("common.viewAll")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section-y">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title={t("sections.featuredServices")}
            description="From installation to maintenance, we deliver complete security and fire-safety services."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Why BSS" title={t("sections.whyChooseUs")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item) => (
              <Card key={item.title}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon name={item.icon} className="size-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-y">
        <div className="container">
          <SectionHeading
            eyebrow="Sectors"
            title={t("sections.industries")}
            description="Tailored security and fire-safety solutions for every sector."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Card key={ind.id} className="transition hover:border-primary">
                <CardContent className="flex items-center gap-4 p-5">
                  <Icon name={ind.icon} className="size-7 text-primary" />
                  <div>
                    <p className="font-semibold">{ind.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ind.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Portfolio" title={t("sections.projects")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((p) => (
              <Card key={p.id} className="overflow-hidden">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 text-white">
                  <Icon name="shield-check" className="size-10 opacity-90" />
                </div>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {p.category} • {p.year}
                  </p>
                  <p className="mt-1 font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y">
        <div className="container">
          <SectionHeading
            eyebrow="Testimonials"
            title={t("sections.testimonials")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((tm) => (
              <Card key={tm.id} className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <StarRating value={tm.rating} />
                  <p className="flex-1 text-sm text-muted-foreground">
                    “{tm.quote}”
                  </p>
                  <div>
                    <p className="font-semibold">{tm.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tm.role}, {tm.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-y bg-muted/40 py-12">
        <div className="container">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("sections.partners")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((p) => (
              <span
                key={p.id}
                className="text-xl font-bold text-muted-foreground/70"
              >
                {p.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact CTA */}
      <section className="section-y">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-10 text-white md:flex-row">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">
                Need urgent fire safety or security help?
              </h3>
              <p className="mt-2 text-white/80">
                Our emergency response team is available 24/7 across Balochistan.
              </p>
            </div>
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              <PhoneCall className="size-5" /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
