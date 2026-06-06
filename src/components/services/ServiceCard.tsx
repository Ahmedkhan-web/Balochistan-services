import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import type { Service } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/common/Icon";
import { createServiceWhatsAppMessage, createWhatsAppLink } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const serviceImages: Record<string, string> = {
  "fire-refilling": "/assets/images/category-fire-extinguishers-new.jpg",
  "cctv-installation": "/assets/images/category-accessories-new.jpg",
  "fire-alarm-installation": "/assets/images/section-fire-alarm-installation.jpg",
  "smoke-detector-installation": "/assets/images/category-fire-alarm-new.jpg",
  "security-system-installation": "/assets/images/section-access-control.jpg",
  "bank-security": "/assets/images/project-bank-security.jpg",
  amc: "/assets/images/section-maintenance-engineer.jpg",
  "security-audits": "/assets/images/section-warehouse-security.jpg",
  "fire-inspections": "/assets/images/section-fire-installation.jpg",
};

export function ServiceCard({ service }: { service: Service }) {
  const whatsappLink = createWhatsAppLink(createServiceWhatsAppMessage(service.name));
  const image = serviceImages[service.id] ?? "/assets/images/section-cctv-control-room.jpg";

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15 transition hover:-translate-y-1 hover:border-[#bde8c0]/40 hover:shadow-2xl hover:shadow-black/25">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#07130f]">
        <img
          src={image}
          alt={service.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07130f] via-[#07130f]/25 to-transparent" />
        <div className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-lg bg-[#07130f]/85 text-[#8ed0af] shadow-lg backdrop-blur">
          <Icon name={service.icon} className="size-5" />
        </div>
        {service.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-[#c91616] px-3 py-1 text-xs font-bold text-white shadow-lg">
            Featured
          </span>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-snug">{service.name}</h3>
        <p className="mt-2 text-sm leading-6 text-white/60">
          {service.short_description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm leading-6 text-white/72">
              <Check className="mt-1 size-4 shrink-0 text-[#8ed0af]" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          {service.starting_price ? (
            <span className="text-sm text-white/50">
              From{" "}
              <span className="font-bold text-[#bde8c0]">
                {formatCurrency(service.starting_price)}
              </span>
            </span>
          ) : (
            <span />
          )}
          <div className="mt-4 grid gap-2 min-[420px]:grid-cols-2">
            <Link
              to={`/services/${service.slug}`}
              className="inline-flex h-10 items-center justify-center gap-1 rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm font-semibold text-white transition hover:border-[#bde8c0]/60 hover:bg-[#1f3b31] group-hover:gap-2"
            >
              View <ArrowRight className="size-4" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
              aria-label={`Take ${service.name} service on WhatsApp`}
            >
              <MessageCircle className="size-4" /> Take Service
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
