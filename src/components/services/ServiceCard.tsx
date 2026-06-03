import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/common/Icon";
import { formatCurrency } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon name={service.icon} className="size-6" />
        </div>
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {service.short_description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <Check className="size-4 text-primary" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-5">
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
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
          >
            Details <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
