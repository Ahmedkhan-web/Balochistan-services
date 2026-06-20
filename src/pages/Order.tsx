import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  LogIn,
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
import { createWhatsAppLink } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import type { CartItem } from "@/types";

const MAX_QUANTITY = 10;
const MAX_ITEM_NOTE_LENGTH = 240;

function readQuantityParam(value: string | null) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 1;
  }

  return Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(parsed)));
}

function getDirectNoteKey(productSlug: string | null) {
  return productSlug ? `bss-order-note:${productSlug}` : null;
}

function fieldValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export default function Order() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productSlug = searchParams.get("product");
  const quantityParam = searchParams.get("qty");
  const singleProduct = productSlug ? getProductBySlug(productSlug) : undefined;
  const { items, clear } = useCartStore();
  const { profile, initialized } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [directNote, setDirectNote] = useState(() => {
    const key = getDirectNoteKey(productSlug);
    return key ? (window.sessionStorage.getItem(key) ?? "") : "";
  });
  const [directQuantity, setDirectQuantity] = useState(() =>
    readQuantityParam(quantityParam),
  );
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const updateItemNote = useCartStore((state) => state.updateItemNote);

  const orderItems = useMemo<CartItem[]>(
    () =>
      singleProduct
        ? [
            {
              product: singleProduct,
              quantity: directQuantity,
              note: directNote.trim() ? directNote : undefined,
            },
          ]
        : items,
    [directNote, directQuantity, items, singleProduct],
  );

  const displayItems = orderItems;

  useEffect(() => {
    setDirectQuantity(readQuantityParam(quantityParam));
    const key = getDirectNoteKey(productSlug);
    setDirectNote(key ? (window.sessionStorage.getItem(key) ?? "") : "");
    setOrderPlaced(false);
  }, [productSlug, quantityParam]);

  function handleQuantityChange(productId: string, nextQuantity: number) {
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, nextQuantity));

    if (singleProduct?.id === productId) {
      setDirectQuantity(quantity);
      const params = new URLSearchParams(searchParams);
      params.set("qty", String(quantity));
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      return;
    }

    updateQuantity(productId, quantity);
  }

  function handleItemNoteChange(productId: string, note: string) {
    const limitedNote = note.slice(0, MAX_ITEM_NOTE_LENGTH);

    if (singleProduct?.id === productId) {
      setDirectNote(limitedNote);
      const key = getDirectNoteKey(productSlug);

      if (key) {
        if (limitedNote.trim()) {
          window.sessionStorage.setItem(key, limitedNote);
        } else {
          window.sessionStorage.removeItem(key);
        }
      }

      return;
    }

    updateItemNote(productId, limitedNote);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile) {
      navigate("/signin", {
        state: { from: `${location.pathname}${location.search}` },
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const orderMessage = [
      "Hello BSS, I want to place a product order.",
      "",
      "Customer Account:",
      `Account name: ${profile.full_name}`,
      `Account email: ${profile.email}`,
      "",
      "Delivery Details:",
      `Name: ${fieldValue(formData, "name")}`,
      `Email: ${fieldValue(formData, "email")}`,
      `Phone: ${fieldValue(formData, "phone")}`,
      `Region: ${fieldValue(formData, "region")}`,
      `City: ${fieldValue(formData, "city")}`,
      `Address: ${fieldValue(formData, "address")}`,
      `Notes: ${fieldValue(formData, "notes") || "N/A"}`,
      "",
      "Order Items:",
      ...displayItems.flatMap(({ product, quantity, note }, index) => [
        `${index + 1}. ${product.name}`,
        `   Category: ${
          PRODUCT_CATEGORIES.find((item) => item.id === product.category)?.name ??
          product.category
        }`,
        `   Subcategory: ${product.subcategory ?? "N/A"}`,
        `   Quantity: ${quantity}`,
        `   Product URL: ${window.location.origin}/products/${product.slug}`,
        `   Product note: ${note?.trim() || "N/A"}`,
      ]),
      "",
      "Payment: Cash on Delivery",
      "Please confirm availability, delivery time, and final amount.",
    ].join("\n");

    setIsSubmitting(true);
    window.open(createWhatsAppLink(orderMessage), "_blank", "noopener,noreferrer");
    setOrderPlaced(true);

    if (!singleProduct) {
      clear();
    } else {
      const key = getDirectNoteKey(productSlug);
      if (key) {
        window.sessionStorage.removeItem(key);
      }
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
                  Add a product to your cart or order directly from a product
                  category.
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
            Orders are available for Pakistan / Balochistan only and are
            confirmed with cash on delivery.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          {orderPlaced ? (
            <div className="mx-auto max-w-xl overflow-hidden rounded-lg border bg-card shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
              <div className="bg-[#07130f] p-5 text-white sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#c91616]">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <div>
                    <Badge className="bg-white/10 text-white hover:bg-white/10">
                      Submitted
                    </Badge>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight">
                      Order request sent
                    </h2>
                    <p className="mt-1 text-sm text-white/70">
                      BSS will confirm by phone before delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
                <Link
                  to="/products"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Browse Products
                </Link>
                <Link to="/contact" className={buttonVariants()}>
                  Contact BSS
                </Link>
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
                    {displayItems.map(({ product, quantity, note }) => {
                      const category = PRODUCT_CATEGORIES.find(
                        (item) => item.id === product.category,
                      );

                      return (
                        <div
                          key={product.id}
                          className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 rounded-lg border bg-background p-3 shadow-sm sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4"
                        >
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="size-[76px] rounded-md bg-muted object-cover sm:size-[88px]"
                              loading="lazy"
                              decoding="async"
                              sizes="88px"
                            />
                          ) : (
                            <ImagePlaceholder
                              icon={category?.icon ?? "shield"}
                              label={product.subcategory}
                              className="size-[76px] rounded-md sm:size-[88px]"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                              <Badge variant="secondary">
                                {category?.name}
                              </Badge>
                              <span className="rounded-full border px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                                Qty {quantity}
                              </span>
                            </div>
                            <div className="mt-2 min-w-0">
                              <Link
                                to={`/products/${product.slug}`}
                                className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary sm:text-base"
                              >
                                {product.name}
                              </Link>
                              <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
                                {product.subcategory}
                              </p>
                            </div>
                          </div>

                          <div className="col-span-full grid gap-3 rounded-lg bg-muted/30 p-3 min-[420px]:grid-cols-[auto_minmax(0,1fr)] min-[420px]:items-start">
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
                            <label className="grid gap-2 text-sm font-medium">
                              Product note
                              <Textarea
                                value={note ?? ""}
                                maxLength={MAX_ITEM_NOTE_LENGTH}
                                placeholder="Optional: size, location, brand preference..."
                                className="min-h-20 resize-none bg-background"
                                onChange={(event) =>
                                  handleItemNoteChange(
                                    product.id,
                                    event.target.value,
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 space-y-3 rounded-lg bg-muted/40 p-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Unique products
                      </span>
                      <span>{displayItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total units</span>
                      <span>
                        {displayItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </span>
                    </div>
                    <p className="rounded-md border border-dashed bg-background/70 p-3 text-muted-foreground">
                      The BSS team will review your request and contact you for
                      confirmation.
                    </p>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed p-4">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      Payment method is Cash on Delivery. No online payment is
                      required.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 sm:p-6">
                  {!initialized ? (
                    <div className="flex min-h-64 items-center justify-center text-sm text-muted-foreground">
                      Checking account...
                    </div>
                  ) : !profile ? (
                    <div className="rounded-lg border border-dashed bg-muted/30 p-5 text-center sm:p-8">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <LogIn className="size-5" />
                      </div>
                      <h2 className="mt-4 text-xl font-bold">
                        Sign in to place order
                      </h2>
                      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                        Your selected products and quantities will stay saved.
                      </p>
                      <Link
                        to="/signin"
                        state={{
                          from: `${location.pathname}${location.search}`,
                        }}
                        className={buttonVariants({ className: "mt-5" })}
                      >
                        Sign In <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-primary" />
                        <h2 className="text-xl font-bold">
                          Delivery Information
                        </h2>
                      </div>

                      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-sm font-medium">
                            Full name
                            <Input
                              name="name"
                              autoComplete="name"
                              defaultValue={profile.full_name}
                              required
                            />
                          </label>
                          <label className="grid gap-2 text-sm font-medium">
                            Email
                            <Input
                              name="email"
                              type="email"
                              autoComplete="email"
                              defaultValue={profile.email}
                              required
                            />
                          </label>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="grid gap-2 text-sm font-medium">
                            Phone number
                            <Input
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              defaultValue={profile.phone ?? ""}
                              required
                            />
                          </label>
                          <label className="grid gap-2 text-sm font-medium">
                            Region
                            <Select
                              name="region"
                              required
                              defaultValue="Pakistan / Balochistan"
                            >
                              <option value="Pakistan / Balochistan">
                                Pakistan / Balochistan
                              </option>
                            </Select>
                          </label>
                        </div>

                        <label className="grid gap-2 text-sm font-medium">
                          City
                          <Input
                            name="city"
                            autoComplete="address-level2"
                            defaultValue={profile.city ?? ""}
                            required
                          />
                        </label>

                        <label className="grid gap-2 text-sm font-medium">
                          Complete address
                          <Textarea
                            name="address"
                            autoComplete="street-address"
                            required
                          />
                        </label>

                        <label className="grid gap-2 text-sm font-medium">
                          Notes
                          <Textarea
                            name="notes"
                            placeholder="Optional delivery instructions"
                          />
                        </label>

                        <div className="rounded-lg border bg-muted/30 p-4">
                          <p className="text-sm font-semibold">
                            Payment method
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Cash on Delivery only
                          </p>
                        </div>

                        <Button className="h-12 w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Opening WhatsApp..." : "Place Order on WhatsApp"}
                        </Button>
                      </form>
                    </>
                  )}
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
