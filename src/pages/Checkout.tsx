import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import type { PaymentMethod } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";

const METHODS: { id: PaymentMethod; label: string }[] = [
  { id: "stripe", label: "Card (Stripe)" },
  { id: "jazzcash", label: "JazzCash" },
  { id: "easypaisa", label: "EasyPaisa" },
  { id: "bank_transfer", label: "Bank Transfer" },
  { id: "cod", label: "Cash on Delivery" },
];

const TAX_RATE = 0.17;

export default function Checkout() {
  const { items, subtotal, clear } = useCartStore();
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const sub = subtotal();
  const tax = Math.round(sub * TAX_RATE);
  const total = sub + tax;

  if (placed) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center sm:py-24">
        <CheckCircle2 className="size-16 text-primary" />
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Order Placed!</h1>
        <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Thank you for your order. A confirmation and invoice have been sent to
          your email. You can track it from your dashboard.
        </p>
        <div className="mt-6 grid w-full max-w-sm gap-3 sm:flex sm:w-auto">
          <Button className="h-11" onClick={() => navigate("/dashboard/orders")}>
            View Orders
          </Button>
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold hover:bg-accent"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center sm:py-24">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="mt-4 inline-block text-primary">
          ← Browse products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo title="Checkout" path="/checkout" />
      <section className="border-b bg-muted/40">
        <div className="container py-9 text-center sm:py-12 md:text-left">
          <Badge variant="secondary" className="mb-3">
            Secure checkout
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Checkout
          </h1>
        </div>
      </section>

      <div className="container py-8 sm:py-10">
        <form
          className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            setPlaced(true);
            toast.success("Order placed successfully");
          }}
        >
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-5 sm:p-6">
                <h2 className="font-semibold">Billing Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fn">Full Name</Label>
                    <Input id="fn" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ph">Phone</Label>
                    <Input id="ph" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="em">Email</Label>
                  <Input id="em" type="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ad">Delivery Address</Label>
                  <Input id="ad" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 p-6">
                <h2 className="font-semibold">Payment Method</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={cn(
                        "flex min-h-12 items-center gap-2 rounded-lg border p-3 text-left text-sm font-medium transition",
                        method === m.id
                          ? "border-primary bg-accent"
                          : "hover:border-primary/50",
                      )}
                    >
                      <CreditCard className="size-4 text-primary" />
                      {m.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit">
            <CardContent className="space-y-3 p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="grid gap-1 text-sm min-[420px]:flex min-[420px]:justify-between"
                  >
                    <span className="line-clamp-2 text-muted-foreground">
                      {product.name} × {quantity}
                    </span>
                    <span>
                      {formatCurrency(
                        (product.discount_price ?? product.price) * quantity,
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(sub)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (17% GST)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
              <Button type="submit" className="mt-2 h-11 w-full">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  );
}
