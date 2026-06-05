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
        />
      </span>
      {showText && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-[12px] font-extrabold tracking-tight sm:text-base lg:text-lg">
            {SITE.name}
          </span>
          <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:block">
            Fire Safety and Security
          </span>
        </span>
      )}
    </Link>
  );
}
