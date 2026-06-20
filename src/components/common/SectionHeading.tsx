import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "mx-auto text-center md:mx-0 md:text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a4f] sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
