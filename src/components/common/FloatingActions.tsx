import { MessageCircle, Phone } from "lucide-react";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

/** WhatsApp quick contact + emergency call floating buttons. */
export function FloatingActions() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_DEFAULT_MESSAGE,
  )}`;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        className="group flex items-center gap-2 rounded-full bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground shadow-lg transition hover:scale-105"
        aria-label="Emergency call"
      >
        <Phone className="size-5 animate-pulse" />
        <span className="hidden sm:inline">Emergency</span>
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
        aria-label="WhatsApp quick contact"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
