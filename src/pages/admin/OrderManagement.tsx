import { PackageCheck, PhoneCall, Truck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS } from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

const activeStatuses = ["pending", "confirmed", "processing", "shipped"];

export default function OrderManagement() {
  const activeOrders = MOCK_ORDERS.filter((order) =>
    activeStatuses.includes(order.status),
  );
  const completedOrders = MOCK_ORDERS.filter(
    (order) => order.status === "delivered",
  );
  const codOrders = MOCK_ORDERS.filter(
    (order) => order.payment_method === "cod",
  );

  return (
    <div>
      <PageHeader
        title="Received Orders"
        description="Receive, review, confirm and update customer product orders."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <QueueCard
          label="Active Orders"
          value={activeOrders.length}
          helper="Need fulfilment"
        />
        <QueueCard
          label="Completed"
          value={completedOrders.length}
          helper="Delivered orders"
        />
        <QueueCard
          label="COD Confirmation"
          value={codOrders.length}
          helper="Call before dispatch"
        />
      </div>

      <div className="grid gap-5">
        {MOCK_ORDERS.map((order) => (
          <Card
            key={order.id}
            className="overflow-hidden border-slate-200 shadow-sm"
          >
            <CardHeader className="border-b bg-[#07130f] text-white">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-lg">{order.reference}</CardTitle>
                    <StatusBadge status={order.status} />
                    <StatusBadge status={order.payment_status} />
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    Received {formatDate(order.created_at)} -{" "}
                    {order.payment_method.replace("_", " ")}
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-wide text-white/55">
                    Total
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(order.total)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[1fr_320px]">
              <div className="grid gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid gap-2 rounded-lg border bg-background px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity {item.quantity}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {formatCurrency(item.price)}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <PackageCheck className="size-5 text-primary" />
                  <p className="font-semibold">Admin Controls</p>
                </div>
                <label className="grid gap-2 text-sm font-medium">
                  Update order status
                  <Select defaultValue={order.status}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </label>
                <div className="grid gap-2 min-[420px]:grid-cols-2">
                  <Button variant="outline" size="sm">
                    <PhoneCall className="size-4" /> Call User
                  </Button>
                  <Button size="sm">
                    <Truck className="size-4" /> Dispatch
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QueueCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-xs font-medium text-primary">{helper}</p>
      </CardContent>
    </Card>
  );
}
