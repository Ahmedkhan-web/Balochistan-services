import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#c91616] text-white",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        success: "border-transparent bg-brand-900 text-brand-100",
        warning: "border-transparent bg-amber-900 text-amber-100",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
