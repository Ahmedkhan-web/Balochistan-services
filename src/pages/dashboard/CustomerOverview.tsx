import { Link } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import {
  MOCK_ORDERS,
  MOCK_SERVICE_REQUESTS,
  MOCK_NOTIFICATIONS,
} from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerOverview() {
  const { profile } = useAuthStore();
  const totalSpent = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <PageHeader
        title={`Welcome, ${profile?.full_name?.split(" ")[0] ?? "Customer"}`}
        description="Here's an overview of your account activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={String(MOCK_ORDERS.length)} icon="package-check" trend="+2 this month" />
        <StatCard label="Active Requests" value={String(MOCK_SERVICE_REQUESTS.filter((s) => s.status !== "completed").length)} icon="workflow" />
        <StatCard label="Total Spent" value={formatCurrency(totalSpent)} icon="scale" />
        <StatCard label="Notifications" value={String(MOCK_NOTIFICATIONS.filter((n) => !n.read).length)} icon="bell" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/dashboard/orders" className="text-sm text-primary">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_ORDERS.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{o.reference}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(o.created_at)} • {formatCurrency(o.total)}
                  </p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Service Requests</CardTitle>
            <Link to="/dashboard/requests" className="text-sm text-primary">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_SERVICE_REQUESTS.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{s.service_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.reference} •{" "}
                    {s.scheduled_at
                      ? formatDate(s.scheduled_at)
                      : "Awaiting schedule"}
                  </p>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
