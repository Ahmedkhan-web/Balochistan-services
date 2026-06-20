import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * Branded gradient placeholder used in place of product/project photography.
 * Swap with real <img src> once Cloudinary/Supabase storage URLs are available.
 */
export function ImagePlaceholder({
  icon = "shield",
  label,
  className,
}: {
  icon?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-600 to-brand-800 text-white",
        className,
      )}
    >
      <Icon name={icon} className="size-12 opacity-90" />
      {label && (
        <span className="px-4 text-center text-xs font-medium opacity-90">
          {label}
        </span>
      )}
    </div>
  );
}
