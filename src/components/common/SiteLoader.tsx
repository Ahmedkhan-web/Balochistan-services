import { SITE } from "@/lib/constants";

export function SiteLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className={[
        "fixed inset-0 z-[9999] grid place-items-center bg-[#07130f] text-white transition-all duration-500",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-live="polite"
      aria-busy={visible}
    >
      <div className="flex w-[min(88vw,360px)] flex-col items-center text-center">
        <div className="relative flex size-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-2 rounded-full border-2 border-[#c91616] border-t-transparent motion-safe:animate-spin" />
          <img
            src="/assets/images/bss-logo.png"
            alt={`${SITE.name} logo`}
            className="size-16 object-contain"
          />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#bde8c0]">
          Balochistan Standard Services
        </p>
        <p className="mt-2 text-sm text-white/65">Preparing safety systems</p>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-[#c91616] motion-safe:animate-[loader-progress_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
