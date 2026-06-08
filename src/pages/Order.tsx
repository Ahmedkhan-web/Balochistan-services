import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { PRODUCT_CATEGORIES, getProductBySlug } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types";

const MAX_QUANTITY = 10;

export default function Order() {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get("product");
  const singleProduct = productSlug ? getProductBySlug(productSlug) : undefined;
  const { items, clear } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [directQuantity, setDirectQuantity] = useState(1);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const orderItems = useMemo<CartItem[]>(
    () =>
      singleProduct
        ? [{ product: singleProduct, quantity: directQuantity }]
        : items,
    [directQuantity, items, singleProduct],
  );

  const displayItems = orderItems;

  useEffect(() => {
    setDirectQuantity(1);
    setOrderPlaced(false);
  }, [productSlug]);

  function handleQuantityChange(productId: string, nextQuantity: number) {
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, nextQuantity));

    if (singleProduct?.id === productId) {
      setDirectQuantity(quantity);
      return;
    }

    updateQuantity(productId, quantity);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setOrderPlaced(true);

    if (!singleProduct) {
      clear();
    }

    setIsSubmitting(false);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (!orderPlaced && displayItems.length === 0) {
    return (
      <>
        <Seo
          title="Place Order"
          path="/order"
          description="Place a BSS product order with cash on delivery in Balochistan, Pakistan."
        />
        <section className="section-y">
          <div className="container">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-lg border border-dashed px-5 py-16 text-center">
              <ShoppingBag className="size-12 text-muted-foreground" />
              <div>
                <h1 className="text-2xl font-bold">No products selected</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Add a product to your cart or order directly from a product category.
                </p>
              </div>
              <Link to="/products" className={buttonVariants()}>
                Browse Security Products
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Place Order"
        path="/order"
        description="Place a BSS product order with cash on delivery in Balochistan, Pakistan."
      />

      <section className="border-b bg-muted/40">
        <div className="container py-9 sm:py-12">
          <Badge variant="secondary" className="mb-3">
            Cash on Delivery
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {orderPlaced ? "Order Received" : "Place Your Order"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Orders are available for Pakistan / Balochistan only and are confirmed
            with cash on delivery.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          {orderPlaced ? (
            <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-emerald-700/30 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
              <div className="border-l-4 border-emerald-700 bg-[#e6f7ed] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-emerald-800 text-white hover:bg-emerald-800">
                        Request submitted
                      </Badge>
                      <span className="text-xs font-bold uppercase tracking-wide text-emerald-950">
                        BSS order notification
                      </span>
                    </div>
                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#062f1f] sm:text-3xl">
                      Order request received
                    </h2>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#0b3b28] sm:text-base">
                      Your request has been placed successfully. Expected delivery:
                      within 24 hours after confirmation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-950">
                    <CheckCircle2 className="size-5 text-emerald-700" />
                    <p className="mt-3 text-sm font-bold">Order saved</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">
                      Your product request is now recorded.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-950">
                    <Clock3 className="size-5 text-emerald-700" />
                    <p className="mt-3 text-sm font-bold">Quick follow-up</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">
                      BSS will contact you for confirmation.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-950">
                    <PackageCheck className="size-5 text-emerald-700" />
                    <p className="mt-3 text-sm font-bold">24-hour delivery</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">
                      Delivery is arranged after confirmation.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                  <p className="text-sm font-medium leading-6 text-slate-800">
                    Please keep your phone available. Our team may call to verify
                    product quantity, delivery area and cash-on-delivery details.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link to="/products" className={buttonVariants({ variant: "outline" })}>
                    Browse Products
                  </Link>
                  <Link to="/contact" className={buttonVariants()}>
                    Contact BSS
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <Card className="h-fit overflow-hidden lg:sticky lg:top-24">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <PackageCheck className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Order Items</h2>
              </div>

              <div className="mt-5 space-y-4">
                {displayItems.map(({ product, quantity }) => {
                  const category = PRODUCT_CATEGORIES.find(
                    (item) => item.id === product.category,
                  );

                  return (
                    <div
                      key={product.id}
                      className="grid gap-4 rounded-lg border p-3 sm:grid-cols-[88px_minmax(0,1fr)]"
                    >
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="aspect-square w-full rounded-md bg-muted object-cover sm:w-[88px]"
                          loading="lazy"
                          decoding="async"
                          sizes="88px"
                        />
                      ) : (
                        <ImagePlaceholder
                          icon={category?.icon ?? "shield"}
                          label={product.subcategory}
                          className="aspect-square w-full rounded-md sm:w-[88px]"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{category?.name}</Badge>
                        </div>
                        <div className="mt-3 flex items-start gap-3">
                          <QuantityControl
                            quantity={quantity}
                            disabled={orderPlaced}
                            onDecrease={() =>
                              handleQuantityChange(product.id, quantity - 1)
                            }
                            onIncrease={() =>
                              handleQuantityChange(product.id, quantity + 1)
                            }
                          />
                          <div className="min-w-0">
                            <Link
                              to={`/products/${product.slug}`}
                              className="block font-semibold leading-snug hover:text-primary"
                            >
                              {product.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {product.subcategory}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-3 rounded-lg bg-muted/40 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unique products</span>
                  <span>{displayItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total units</span>
                  <span>{displayItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <p className="rounded-md border border-dashed bg-background/70 p-3 text-muted-foreground">
                  The BSS team will review your request and contact you for confirmation.
                </p>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed p-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Payment method is Cash on Delivery. No online payment is required.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Delivery Information</h2>
              </div>

              <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium">
                    Full name
                    <Input name="name" autoComplete="name" required />
                  </label>
                  <label className="grid gap-2 text-sm font-medium">
                    Email
                    <Input name="email" type="email" autoComplete="email" required />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium">
                    Phone number
                    <Input name="phone" type="tel" autoComplete="tel" required />
                  </label>
                  <label className="grid gap-2 text-sm font-medium">
                    Region
                    <Select name="region" required defaultValue="Pakistan / Balochistan">
                      <option value="Pakistan / Balochistan">Pakistan / Balochistan</option>
                    </Select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-medium">
                  City
                  <Input name="city" autoComplete="address-level2" required />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Complete address
                  <Textarea name="address" autoComplete="street-address" required />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Notes
                  <Textarea
                    name="notes"
                    placeholder="Optional delivery instructions"
                  />
                </label>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm font-semibold">Payment method</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Cash on Delivery only
                  </p>
                </div>

                <Button className="h-12 w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
          </div>
          )}
        </div>
      </section>
    </>
  );
}

function QuantityControl({
  quantity,
  disabled,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  disabled?: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center rounded-md border bg-background shadow-sm">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-r-none"
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
        onClick={onDecrease}
      >
        <Minus className="size-3.5" />
      </Button>
      <span className="w-9 text-center text-sm font-bold">{quantity}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-l-none"
        disabled={disabled || quantity >= MAX_QUANTITY}
        aria-label="Increase quantity"
        onClick={onIncrease}
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
}
