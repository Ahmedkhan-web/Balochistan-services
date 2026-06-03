import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
}: {
  label: string;
  value: string;
  icon: string;
  trend?: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
          {trend && (
            <p className="mt-1 text-xs font-medium text-primary">{trend}</p>
          )}
        </div>
        <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon name={icon} className={cn("size-6")} />
        </div>
      </CardContent>
    </Card>
  );
}
