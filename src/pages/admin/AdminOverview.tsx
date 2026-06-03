import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { MOCK_ORDERS, REVENUE_BY_MONTH } from "@/data/dashboard";
import { PRODUCTS } from "@/data/products";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminOverview() {
  const totalRevenue = REVENUE_BY_MONTH.reduce((s, d) => s + d.revenue, 0);

  return (
    <div>
      <PageHeader
        title="Revenue Analytics"
        description="Business performance at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon="scale" trend="+12.5% vs last period" />
        <StatCard label="Orders" value="1,284" icon="package-check" trend="+8.2%" />
        <StatCard label="Products" value={String(PRODUCTS.length)} icon="shield" />
        <StatCard label="Active Customers" value="642" icon="building-2" trend="+21 this week" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue (last 6 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "CCTV & Surveillance", pct: 42 },
              { label: "Fire Extinguishers", pct: 28 },
              { label: "Access Control", pct: 18 },
              { label: "Fire Alarms", pct: 12 },
            ].map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.label}</span>
                  <span className="font-medium">{c.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Reference</TH>
                <TH>Date</TH>
                <TH>Total</TH>
                <TH>Payment</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {MOCK_ORDERS.map((o) => (
                <TR key={o.id}>
                  <TD className="font-medium">{o.reference}</TD>
                  <TD className="text-muted-foreground">
                    {formatDate(o.created_at)}
                  </TD>
                  <TD>{formatCurrency(o.total)}</TD>
                  <TD>
                    <StatusBadge status={o.payment_status} />
                  </TD>
                  <TD>
                    <StatusBadge status={o.status} />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
