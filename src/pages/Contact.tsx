import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Badge } from "@/components/ui/badge";
import { createWhatsAppLink, SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

const contactMethods = [
  {
    label: "Call",
    value: SITE.phoneDisplay,
    href: `tel:${SITE.phone.replace(/\D/g, "")}`,
    icon: Phone,
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
  {
    label: "Visit",
    value: SITE.address,
    href: SITE.mapsEmbed,
    icon: MapPin,
  },
] as const;

const serviceIntents = [
  "Fire safety inspection",
  "CCTV installation",
  "Extinguisher refilling",
  "Access control",
] as const;

export default function Contact() {
  const waLink = createWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Contact Balochistan Standard Services for fire safety, CCTV, access control, inspections and emergency support."
      />

      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#07130f_0%,#10231d_58%,#07130f_100%)] text-white">
        <div className="container grid gap-8 py-12 md:py-16 lg:grid-cols-[1fr_420px] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <Badge className="border-white/15 bg-white/10 text-white hover:bg-white/10">
              BSS Contact Desk
            </Badge>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Get the right safety team on site.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              For fire safety, CCTV, access control, refilling, inspections and
              urgent support, contact BSS directly. Share the site details and
              our team will guide the next step.
            </p>

            <div className="mt-7 grid gap-3 min-[440px]:flex min-[440px]:flex-wrap">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-sm font-bold text-white shadow-xl shadow-black/25 transition hover:bg-[#20bd5a]"
              >
                <MessageCircle className="size-5" /> Chat on WhatsApp
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.08] px-5 text-sm font-bold text-white backdrop-blur transition hover:border-[#bde8c0]/60 hover:bg-[#1f3b31]"
              >
                <Phone className="size-5" /> Call Now
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {serviceIntents.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#10231d]/92 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#c91616] text-white">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <p className="text-lg font-bold">Fast response channels</p>
                <p className="mt-1 text-sm leading-6 text-white/58">
                  Use WhatsApp for the quickest service request. Calls are best
                  for urgent site support.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.label === "Visit" ? "_blank" : undefined}
                  rel={method.label === "Visit" ? "noreferrer" : undefined}
                  className="group flex items-start gap-3 rounded-lg border border-white/10 bg-[#07130f] p-4 transition hover:border-[#bde8c0]/40 hover:bg-[#142a23]"
                >
                  <method.icon className="mt-1 size-5 shrink-0 text-[#8ed0af]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
                      {method.label}
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold leading-6 text-white/78">
                      {method.value}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#8ed0af]" />
                </a>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4">
              <Clock className="size-5 shrink-0 text-[#8ed0af]" />
              <p className="text-sm leading-6 text-white/66">
                Mon-Sat, 9am-8pm. Emergency service support available 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="rounded-lg border border-white/10 bg-[#10231d] p-5 shadow-xl shadow-black/20 sm:p-6">
            <Navigation className="size-8 text-[#8ed0af]" />
            <h2 className="mt-4 text-2xl font-bold">Office location</h2>
            <p className="mt-3 text-sm leading-7 text-white/62">{SITE.address}</p>
            <a
              href={SITE.mapsEmbed}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#c91616] px-4 text-sm font-semibold text-white transition hover:bg-[#a90f0f]"
            >
              Open Map <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#07130f] shadow-2xl shadow-black/25">
            <iframe
              title="BSS location"
              src={SITE.mapsEmbed}
              className="h-[360px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
