import { SITE } from "@/lib/constants";

export function SiteLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className={[
        "fixed inset-0 z-[9999] grid place-items-center bg-[#07130f] text-white transition-opacity duration-300",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-live="polite"
      aria-busy={visible}
    >
      <div className="flex w-[min(86vw,340px)] flex-col items-center text-center">
        <div className="relative flex size-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-2 rounded-full border-2 border-[#c91616] border-t-transparent motion-safe:animate-spin" />
          <img
            src="/assets/images/bss-logo.png"
            alt={`${SITE.name} logo`}
            className="size-16 object-contain"
            width={64}
            height={64}
            decoding="async"
          />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#bde8c0]">
          Balochistan Standard Services
        </p>
        <p className="mt-2 text-sm text-white/65">Loading critical safety systems</p>
      </div>
    </div>
  );
}
