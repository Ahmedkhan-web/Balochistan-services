import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";

const TAX_RATE = 0.17;

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const sub = subtotal();
  const tax = Math.round(sub * TAX_RATE);
  const total = sub + tax;

  return (
    <>
      <Seo title="Cart" path="/cart" />
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed py-20 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/products" className={buttonVariants()}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <Card key={product.id}>
                  <CardContent className="flex gap-4 p-4">
                    <ImagePlaceholder
                      icon="shield"
                      className="size-24 shrink-0 rounded-lg"
                    />
                    <div className="flex flex-1 flex-col">
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(product.discount_price ?? product.price)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                          >
                            <Plus className="size-3" />
                          </Button>
                        </div>
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
                    <div className="text-right font-semibold">
                      {formatCurrency(
                        (product.discount_price ?? product.price) * quantity,
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="h-fit">
              <CardContent className="space-y-3 p-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>
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
                <Link
                  to="/checkout"
                  className={buttonVariants({ className: "mt-2 w-full" })}
                >
                  Proceed to Checkout
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
