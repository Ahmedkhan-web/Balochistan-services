import { Link, useParams } from "react-router-dom";
import { Check, MessageCircle } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/common/Icon";
import { getServiceBySlug, SERVICES } from "@/data/services";
import { createServiceWhatsAppMessage, createWhatsAppLink } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-primary">
          ← Back to services
        </Link>
      </div>
    );
  }

  const others = SERVICES.filter((s) => s.id !== service.id).slice(0, 4);
  const serviceMessage = createServiceWhatsAppMessage(service.name);
  const whatsappLink = createWhatsAppLink(serviceMessage);

  return (
    <>
      <Seo
        title={service.name}
        path={`/services/${service.slug}`}
        description={service.description}
      />

      <section className="border-b bg-muted/40">
        <div className="container py-9 text-center sm:py-12 md:text-left">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link to="/services" className="hover:text-primary">
              Services
            </Link>{" "}
            / <span className="text-foreground">{service.name}</span>
          </nav>
          <div className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row md:items-start">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-14 sm:rounded-xl">
              <Icon name={service.icon} className="size-6 sm:size-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {service.name}
              </h1>
              {service.starting_price && (
                <p className="mt-1 text-muted-foreground">
                  Starting from{" "}
                  <span className="font-semibold text-foreground">
                    {formatCurrency(service.starting_price)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
          <div>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              {service.description}
            </p>
            <h2 className="mt-8 text-xl font-semibold">What's included</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 rounded-lg border p-3 text-sm leading-6"
                >
                  <Check className="mt-1 size-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-semibold">Other Services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className="flex items-center gap-3 rounded-lg border p-4 hover:border-primary"
                >
                  <Icon name={s.icon} className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Service action */}
          <Card className="h-fit lg:sticky lg:top-24">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold">Take this service</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start a WhatsApp conversation with BSS. Your selected service
                will be included in the message automatically.
              </p>
              <div className="mt-5 rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                <p className="font-semibold text-foreground">Message preview</p>
                <p className="mt-2 whitespace-pre-line">{serviceMessage}</p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
              >
                <MessageCircle className="size-5" /> Take Service on WhatsApp
              </a>
              <Link
                to="/services"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-md border px-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                View All Services
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
