import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  PackageCheck,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { MOCK_ORDERS } from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

type BuyerOrderStatus = "pending" | "processing" | "delivered";

const STATUS_STYLES: Record<BuyerOrderStatus, string> = {
  pending: "border-amber-500/30 bg-amber-500/12 text-amber-100",
  processing: "border-[#bde8c0]/30 bg-[#1f3b31] text-[#d9ffe2]",
  delivered: "border-emerald-400/30 bg-emerald-500/14 text-emerald-100",
};

export default function Orders() {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Orders"
        description="A simple view of every order and its current status."
        action={
          <Link
            to="/products"
            className={buttonVariants({
              className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
            })}
          >
            Place New Order <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-3">
        {MOCK_ORDERS.map((order) => {
          const buyerStatus = getBuyerStatus(order.status);
          const isOpen = openOrderId === order.id;

          return (
            <Card
              key={order.id}
              className="overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15"
            >
              <CardHeader className="p-4 sm:p-5">
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#07130f] text-[#bde8c0] ring-1 ring-white/10">
                      {buyerStatus === "delivered" ? (
                        <CheckCircle2 className="size-5" />
                      ) : buyerStatus === "processing" ? (
                        <PackageCheck className="size-5" />
                      ) : (
                        <Clock3 className="size-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-base sm:text-lg">
                          {order.reference}
                        </CardTitle>
                        <span
                          className={[
                            "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize",
                            STATUS_STYLES[buyerStatus],
                          ].join(" ")}
                        >
                          {buyerStatus}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(order.created_at)} - {order.items.length}{" "}
                        item{order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wide text-white/45">
                        Total
                      </p>
                      <p className="font-bold">{formatCurrency(order.total)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="border-white/15 bg-white/[0.04] text-[#bde8c0] hover:border-[#bde8c0]/50 hover:bg-[#1f3b31] hover:text-white"
                      aria-label={`${isOpen ? "Hide" : "View"} details for ${
                        order.reference
                      }`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenOrderId((current) =>
                          current === order.id ? null : order.id,
                        )
                      }
                    >
                      <Eye className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isOpen && (
                <OrderDetails order={order} buyerStatus={buyerStatus} />
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function OrderDetails({
  order,
  buyerStatus,
}: {
  order: Order;
  buyerStatus: BuyerOrderStatus;
}) {
  return (
    <CardContent className="border-t border-white/10 bg-[#07130f] p-4 sm:p-5">
      <div className="grid gap-3">
        {order.items.map((item) => (
          <div
            key={item.name}
            className="grid gap-3 rounded-lg border border-white/10 bg-[#10231d] p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
          >
            <div className="min-w-0">
              <p className="font-semibold">{item.name}</p>
              <p className="mt-1 text-sm text-white/58">
                Quantity {item.quantity} - Unit price{" "}
                {formatCurrency(item.price)}
              </p>
            </div>
            <Badge className="w-fit bg-white/[0.08] text-[#bde8c0] hover:bg-white/[0.08]">
              {formatCurrency(item.quantity * item.price)}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-lg border border-white/10 bg-[#10231d] p-4 text-sm sm:grid-cols-3">
        <DetailItem label="Order status" value={buyerStatus} />
        <DetailItem label="Payment" value={order.payment_status} />
        <DetailItem
          label="Method"
          value={order.payment_method.replace(/_/g, " ")}
        />
      </div>
    </CardContent>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
        {label}
      </p>
      <p className="mt-1 font-semibold capitalize">{value}</p>
    </div>
  );
}

function getBuyerStatus(status: string): BuyerOrderStatus {
  if (status === "delivered") {
    return "delivered";
  }

  if (status === "pending") {
    return "pending";
  }

  return "processing";
}
