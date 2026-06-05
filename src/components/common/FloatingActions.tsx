import { MessageCircle, Phone } from "lucide-react";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

/** WhatsApp quick contact + emergency call floating buttons. */
export function FloatingActions() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_DEFAULT_MESSAGE,
  )}`;
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
      <a
        href={`tel:${SITE.phone.replace(/\D/g, "")}`}
        className="group flex size-12 items-center justify-center rounded-full bg-destructive text-sm font-semibold text-destructive-foreground shadow-lg transition hover:scale-105 sm:size-auto sm:gap-2 sm:px-4 sm:py-3"
        aria-label="Emergency call"
      >
        <Phone className="size-5 animate-pulse" />
        <span className="hidden sm:inline">Emergency</span>
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="group flex size-12 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-lg transition hover:scale-105 sm:size-auto sm:gap-2 sm:px-4 sm:py-3"
        aria-label="WhatsApp quick contact"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
