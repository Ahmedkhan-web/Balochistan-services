import { REVENUE_BY_MONTH } from "@/data/dashboard";

export function RevenueChart() {
  const max = Math.max(...REVENUE_BY_MONTH.map((d) => d.revenue));
  return (
    <div className="flex h-56 items-end justify-between gap-2">
      {REVENUE_BY_MONTH.map((d) => (
        <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
              style={{ height: `${(d.revenue / max) * 100}%` }}
              title={`Rs ${d.revenue.toLocaleString()}`}
            />
          </div>
          <span className="text-xs text-muted-foreground">{d.month}</span>
        </div>
      ))}
    </div>
  );
}
