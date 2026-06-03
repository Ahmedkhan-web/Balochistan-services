import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
    <Link to={to} className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 64 64"
        className="size-9 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bss-logo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#12b76a" />
            <stop offset="1" stopColor="#027a48" />
          </linearGradient>
        </defs>
        <path
          d="M32 4 L56 13 V31 C56 46 45 56 32 60 C19 56 8 46 8 31 V13 Z"
          fill="url(#bss-logo)"
        />
        <path
          d="M32 18 c4 5 7 8 7 13 a7 7 0 0 1-14 0 c0-3 2-5 3-7 c1 2 2 3 4 3 c-2-4-2-8 0-12 Z"
          fill="#fff"
        />
      </svg>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight">
            BSS
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Standard Services
          </span>
        </span>
      )}
    </Link>
  );
}
