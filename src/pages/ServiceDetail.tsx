import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";
import { getServiceBySlug, SERVICES } from "@/data/services";
import { formatCurrency } from "@/lib/utils";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [submitted, setSubmitted] = useState(false);

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

          {/* Booking form */}
          <Card className="h-fit lg:sticky lg:top-24">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold">Request this service</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get an instant quote and book a visit.
              </p>
              {submitted ? (
                <div className="mt-6 rounded-lg bg-accent p-4 text-center text-sm text-accent-foreground">
                  <Check className="mx-auto mb-2 size-6 text-primary" />
                  Request received! Our team will contact you shortly.
                </div>
              ) : (
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    toast.success("Service request submitted");
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" required placeholder="+92 3xx xxxxxxx" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">Site Address</Label>
                    <Input id="address" required placeholder="Installation address" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Tell us about your requirements" />
                  </div>
                  <Button type="submit" className="h-11 w-full">
                    Request Quote
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
