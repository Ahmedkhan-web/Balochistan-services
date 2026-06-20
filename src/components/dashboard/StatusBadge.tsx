import { Badge } from "@/components/ui/badge";

const MAP: Record<string, "success" | "warning" | "destructive" | "secondary" | "default"> = {
  delivered: "success",
  completed: "success",
  paid: "success",
  active: "success",
  resolved: "success",
  closed: "secondary",
  processing: "warning",
  scheduled: "warning",
  pending: "warning",
  requested: "warning",
  in_progress: "warning",
  open: "default",
  unpaid: "destructive",
  cancelled: "destructive",
  failed: "destructive",
  refunded: "secondary",
  inactive: "secondary",
};

export function StatusBadge({ status }: { status: string }) {
  const variant = MAP[status] ?? "secondary";
  return (
    <Badge variant={variant} className="capitalize">
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
