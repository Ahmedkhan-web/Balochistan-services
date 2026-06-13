import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useAuthStore } from "@/store/authStore";
import {
  MOCK_ORDERS,
  MOCK_SERVICE_REQUESTS,
  MOCK_NOTIFICATIONS,
} from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

const activeOrderStatuses = ["pending", "confirmed", "processing", "shipped"];

export default function CustomerOverview() {
  const { profile } = useAuthStore();
  const totalSpent = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = MOCK_ORDERS.filter(
    (order) => order.status === "delivered",
  );
  const processingOrders = MOCK_ORDERS.filter((order) =>
    activeOrderStatuses.includes(order.status),
  );
  const nextService = MOCK_SERVICE_REQUESTS.find(
    (request) => request.status !== "completed",
  );

  return (
    <div>
      <PageHeader
        title={`Welcome, ${profile?.full_name?.split(" ")[0] ?? "Customer"}`}
        description="A quick view of your orders, service requests and account status."
        action={
          <Link
            to="/products"
            className={buttonVariants({
              className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
            })}
          >
            New Order <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Completed Orders"
          value={String(completedOrders.length)}
          icon="package-check"
          trend="Delivered and closed"
        />
        <StatCard
          label="Processing Orders"
          value={String(processingOrders.length)}
          icon="workflow"
          trend="Active fulfilment"
        />
        <StatCard
          label="Order Value"
          value={formatCurrency(totalSpent)}
          icon="scale"
        />
        <StatCard
          label="Unread Alerts"
          value={String(MOCK_NOTIFICATIONS.filter((n) => !n.read).length)}
          icon="bell"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardHeader className="border-b bg-[#07130f] text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Order Activity</CardTitle>
                <p className="mt-1 text-sm text-white/60">
                  Completed, processing and pending product orders.
                </p>
              </div>
              <Link
                to="/dashboard/orders"
                className="text-sm font-semibold text-[#bde8c0]"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 sm:p-5">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="grid gap-3 rounded-lg border border-white/10 bg-[#07130f] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{order.reference}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(order.created_at)} - {order.items.length}{" "}
                    item(s) - {formatCurrency(order.total)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {order.items.slice(0, 2).map((item) => (
                      <Badge
                        key={item.name}
                        variant="secondary"
                        className="font-normal"
                      >
                        {item.quantity}x {item.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-white/[0.06] px-3 py-2 text-sm">
                  {order.status === "delivered" ? (
                    <CheckCircle2 className="size-4 text-primary" />
                  ) : (
                    <Clock3 className="size-4 text-primary" />
                  )}
                  <span className="font-medium capitalize">
                    {order.status === "delivered" ? "Completed" : order.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <p className="font-semibold">
                    {profile?.full_name ?? "Demo Customer"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profile?.email ?? "demo@bss.com.pk"}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between rounded-md bg-[#07130f] px-3 py-2">
                  <span className="text-white/55">Account type</span>
                  <span className="font-medium capitalize">
                    {profile?.role ?? "customer"}
                  </span>
                </div>
                <div className="flex justify-between rounded-md bg-[#07130f] px-3 py-2">
                  <span className="text-white/55">Location</span>
                  <span className="font-medium">
                    {[profile?.city, profile?.country].filter(Boolean).join(", ") ||
                      "Not provided"}
                  </span>
                </div>
              </div>
              <Link
                to="/dashboard/profile"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "w-full border-white/20 bg-white/[0.04] text-white hover:border-[#bde8c0]/60 hover:bg-[#1f3b31] hover:text-white",
                })}
              >
                View Account
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
            <CardHeader>
              <CardTitle>Next Service</CardTitle>
            </CardHeader>
            <CardContent>
              {nextService ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <PackageCheck className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {nextService.service_name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {nextService.scheduled_at
                          ? formatDate(nextService.scheduled_at)
                          : "Awaiting schedule"}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={nextService.status} />
                  <p className="text-sm leading-6 text-muted-foreground">
                    {nextService.address}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No active service request.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
