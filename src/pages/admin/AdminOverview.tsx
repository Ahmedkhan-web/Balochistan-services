import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, PackageCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import {
  ADMIN_USERS,
  MOCK_ORDERS,
  MOCK_SERVICE_REQUESTS,
  REVENUE_BY_MONTH,
} from "@/data/dashboard";
import { PRODUCTS } from "@/data/products";
import { formatCurrency, formatDate } from "@/lib/utils";

const activeOrderStatuses = ["pending", "confirmed", "processing", "shipped"];

export default function AdminOverview() {
  const totalRevenue = REVENUE_BY_MONTH.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );
  const receivedOrders = MOCK_ORDERS.length;
  const processingOrders = MOCK_ORDERS.filter((order) =>
    activeOrderStatuses.includes(order.status),
  );
  const customers = ADMIN_USERS.filter((user) => user.role === "customer");
  const openServices = MOCK_SERVICE_REQUESTS.filter(
    (request) => request.status !== "completed",
  );

  return (
    <div>
      <PageHeader
        title="Admin Control Center"
        description="Manage received orders, customers, services, stock and business activity from one modern overview."
        action={
          <Link
            to="/admin/orders"
            className={buttonVariants({
              className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
            })}
          >
            Review Orders <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue"
          value={formatCurrency(totalRevenue)}
          icon="scale"
          trend="+12.5% vs last period"
        />
        <StatCard
          label="Received Orders"
          value={String(receivedOrders)}
          icon="package-check"
          trend={`${processingOrders.length} active`}
        />
        <StatCard
          label="Users & Customers"
          value={String(ADMIN_USERS.length)}
          icon="users"
          trend={`${customers.length} customers`}
        />
        <StatCard
          label="Products Listed"
          value={String(PRODUCTS.length)}
          icon="shield"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Trend</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Last six months of sales activity.
              </p>
            </div>
            <Badge variant="secondary">Live mock data</Badge>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <CardHeader className="border-b bg-[#07130f] text-white">
            <CardTitle>Processing Queue</CardTitle>
            <p className="mt-1 text-sm text-white/60">
              Orders that still need admin attention.
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 p-4">
            {processingOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border bg-background p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{order.reference}</p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(order.created_at)} - {formatCurrency(order.total)}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <PackageCheck className="size-4 text-primary" />
                  {order.items.length} product line(s)
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="border-slate-200 shadow-sm xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Received Orders</CardTitle>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-primary"
            >
              Manage all
            </Link>
          </CardHeader>
          <CardContent className="grid gap-3">
            {MOCK_ORDERS.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="grid gap-3 rounded-lg border p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{order.reference}</p>
                    <StatusBadge status={order.payment_status} />
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.items
                      .map((item) => item.name)
                      .slice(0, 2)
                      .join(", ")}
                  </p>
                </div>
                <p className="text-lg font-bold">
                  {formatCurrency(order.total)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>User Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {ADMIN_USERS.slice(0, 4).map((user) => (
              <div
                key={user.id}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Users className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.company}
                  </p>
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {user.role.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Service Workload</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {openServices.map((request) => (
              <div key={request.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{request.service_name}</p>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {request.reference} - {request.address}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Admin Priorities</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              "Confirm COD orders before dispatch",
              "Assign technicians to unscheduled service requests",
              "Review inactive customer accounts",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-[#c91616]" />
                <p className="text-sm font-medium leading-6">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
