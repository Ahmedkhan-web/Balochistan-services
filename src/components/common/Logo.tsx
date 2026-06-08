import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const LOGO_SRC = "/assets/images/bss-logo.png";

export function Logo({
  className,
  showText = true,
  to = "/",
}: {
  className?: string;
  showText?: boolean;
  to?: string;
}) {
  return (
    <Link to={to} className={cn("flex min-w-0 items-center gap-2.5 sm:gap-3", className)}>
      <span className="flex size-10 shrink-0 items-center justify-center sm:size-11">
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
          <span className="text-sm font-extrabold tracking-tight sm:text-lg lg:text-xl">
            {SITE.name}
          </span>
          <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:mt-1 sm:text-[11px] sm:tracking-[0.16em]">
            Fire Safety and Security
          </span>
        </span>
      )}
    </Link>
  );
}
