import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="divide-y rounded-xl border">{children}</div>;
}

export function AccordionItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="px-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium"
      >
        {question}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-muted-foreground animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
