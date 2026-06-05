import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { PRODUCT_CATEGORIES } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { cn, formatCurrency } from "@/lib/utils";

const TAX_RATE = 0.17;

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const sub = subtotal();
  const tax = Math.round(sub * TAX_RATE);
  const total = sub + tax;
  const uniqueItems = items.length;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Seo title="Cart" path="/cart" />

      <section className="border-b bg-muted/40">
        <div className="container py-9 sm:py-12">
          <div className="flex flex-col gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div>
              <Badge variant="secondary" className="mb-3">
                Order Review
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Your Cart
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Review product details, quantities and totals before checkout.
                Each product can be added once and kept up to 10 units.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-left text-sm sm:gap-3">
              <Stat label="Unique items" value={uniqueItems} />
              <Stat label="Total units" value={totalUnits} />
              <Stat label="Max / item" value="10" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed px-5 py-16 text-center sm:py-24">
              <ShoppingBag className="size-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add products from the catalog to build your order.
                </p>
              </div>
              <Link to="/products" className={buttonVariants()}>
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
              <div className="space-y-4">
                {items.map(({ product, quantity }) => {
                  const category = PRODUCT_CATEGORIES.find(
                    (c) => c.id === product.category,
                  );
                  const specs = Object.entries(product.specifications).slice(0, 3);

                  return (
                    <Card key={product.id} className="overflow-hidden">
                      <CardContent className="grid gap-4 p-4 sm:p-5 md:grid-cols-[140px_minmax(0,1fr)]">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="aspect-square w-full rounded-xl bg-muted object-cover"
                          />
                        ) : (
                          <ImagePlaceholder
                            icon={category?.icon ?? "shield"}
                            label={product.subcategory}
                            className="aspect-square w-full rounded-xl"
                          />
                        )}

                        <div className="flex min-w-0 flex-col gap-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">{category?.name}</Badge>
                                <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </Badge>
                                <Badge variant="outline">Qty {quantity}/10</Badge>
                              </div>
                              <Link
                                to={`/products/${product.slug}`}
                                className="mt-2 block truncate text-lg font-semibold hover:text-primary"
                              >
                                {product.name}
                              </Link>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {product.subcategory}
                              </p>
                            </div>
                            <div className="w-full text-left sm:w-auto sm:text-right">
                              <p className="text-lg font-bold text-primary">
                                {formatCurrency(
                                  (product.discount_price ?? product.price) *
                                    quantity,
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatCurrency(
                                  product.discount_price ?? product.price,
                                )} each
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-2 min-[420px]:grid-cols-3">
                            {specs.map(([label, value]) => (
                              <div
                                key={label}
                                className="rounded-xl border bg-muted/30 px-3 py-2"
                              >
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                  {label}
                                </p>
                                <p className="mt-1 text-sm font-medium">{value}</p>
                              </div>
                            ))}
                          </div>

                          <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                            <div className="flex items-center rounded-md border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-9"
                                disabled={quantity <= 1}
                                onClick={() =>
                                  updateQuantity(product.id, quantity - 1)
                                }
                              >
                                <Minus className="size-3.5" />
                              </Button>
                              <span className="w-11 text-center text-sm font-semibold">
                                {quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-9"
                                disabled={quantity >= 10}
                                onClick={() =>
                                  updateQuantity(product.id, quantity + 1)
                                }
                              >
                                <Plus className="size-3.5" />
                              </Button>
                            </div>

                            <div className="grid gap-2 min-[420px]:flex min-[420px]:items-center">
                              <Link
                                to={`/products/${product.slug}`}
                                className={cn(
                                  buttonVariants({
                                    variant: "outline",
                                  size: "sm",
                                  className: "w-full min-[420px]:w-auto",
                                  }),
                                  "gap-2",
                                )}
                              >
                                View Product <ArrowRight className="size-4" />
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => removeItem(product.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="h-fit border-slate-200 shadow-sm lg:sticky lg:top-24">
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Order Summary
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">Ready to checkout</h2>
                  </div>

                  <div className="space-y-3 rounded-2xl bg-muted/40 p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Unique products</span>
                      <span>{uniqueItems}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total units</span>
                      <span>{totalUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(sub)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (17% GST)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Each product is kept as a single cart line and can be
                        adjusted up to 10 units before checkout.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Proceed to Checkout
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-card px-3 py-3 sm:px-4">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">{label}</p>
      <p className="mt-1 text-xl font-bold sm:text-2xl">{value}</p>
    </div>
  );
}
