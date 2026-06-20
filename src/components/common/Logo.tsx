import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const LOGO_SRC = "/assets/images/bss-logo.png";

export function Logo({
  className,
  showText = true,
  compact = false,
  to = "/",
}: {
  className?: string;
  showText?: boolean;
  compact?: boolean;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className={cn("flex min-w-0 items-center gap-2.5 sm:gap-3", className)}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center",
          compact ? "size-9" : "size-10 sm:size-11",
        )}
      >
        <img
          src={LOGO_SRC}
          alt={`${SITE.name} logo`}
          className="h-full w-full object-contain"
          width={44}
          height={44}
          decoding="async"
        />
      </span>
      {showText && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={cn(
              "font-extrabold tracking-tight",
              compact
                ? "text-[13px] leading-[1.08]"
                : "text-sm sm:text-lg lg:text-xl",
            )}
          >
            {compact ? (
              <>
                <span className="block">Balochistan</span>
                <span className="block">Standard Services</span>
              </>
            ) : (
              SITE.name
            )}
          </span>
          <span
            className={cn(
              "mt-0.5 font-semibold uppercase text-muted-foreground sm:mt-1",
              compact
                ? "text-[8px] tracking-[0.08em]"
                : "text-[8px] tracking-[0.08em] sm:text-[11px] sm:tracking-[0.16em]",
            )}
          >
            Fire Safety and Security
          </span>
        </span>
      )}
    </Link>
  );
}
