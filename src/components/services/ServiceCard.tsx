import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/common/Icon";
import { formatCurrency } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group flex h-full flex-col transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon name={service.icon} className="size-6" />
        </div>
        <h3 className="text-base font-semibold leading-snug sm:text-lg">{service.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {service.short_description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm leading-6">
              <Check className="mt-1 size-4 shrink-0 text-primary" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3 pt-5 min-[380px]:flex min-[380px]:items-center min-[380px]:justify-between">
          {service.starting_price ? (
            <span className="text-sm text-muted-foreground">
              From{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(service.starting_price)}
              </span>
            </span>
          ) : (
            <span />
          )}
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex h-10 items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
          >
            Details <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
