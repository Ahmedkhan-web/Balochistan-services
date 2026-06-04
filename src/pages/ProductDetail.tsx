import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, Heart, Minus, Plus, ShoppingCart, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from "@/components/common/StarRating";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductBySlug, PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { cn, discountPercent, formatCurrency } from "@/lib/utils";

const SAMPLE_REVIEWS = [
  { author: "Verified Buyer", rating: 5, comment: "Excellent quality and fast delivery. Installation support was great." },
  { author: "Procurement Officer", rating: 4, comment: "Met our compliance requirements. Good value for the price." },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [qty, setQty] = useState(1);
  const { addItem, toggleWishlist, isWishlisted } = useCartStore();

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="mt-4 inline-block text-primary">
          ← Back to products
        </Link>
      </div>
    );
  }

  const category = PRODUCT_CATEGORIES.find((c) => c.id === product.category);
  const discount = discountPercent(product.price, product.discount_price);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);
  const wished = isWishlisted(product.id);

  return (
    <>
      <Seo
        title={product.name}
        path={`/products/${product.slug}`}
        description={product.description}
      />

      <div className="container py-8">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="aspect-square w-full rounded-2xl bg-muted object-cover"
              />
            ) : (
              <ImagePlaceholder
                icon={category?.icon ?? "shield"}
                label={product.subcategory}
                className="aspect-square w-full rounded-2xl"
              />
            )}
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                product.images[0] ? (
                  <img
                    key={i}
                    src={product.images[0]}
                    alt={`${product.name} view ${i + 1}`}
                    className="aspect-square rounded-lg bg-muted object-cover opacity-80"
                  />
                ) : (
                  <ImagePlaceholder
                    key={i}
                    icon={category?.icon ?? "shield"}
                    className="aspect-square rounded-lg opacity-80"
                  />
                )
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{category?.name}</Badge>
              <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <div className="mt-3">
              <StarRating value={product.rating} count={product.reviews_count} />
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(product.discount_price ?? product.price)}
              </span>
              {product.discount_price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge variant="destructive">-{discount}%</Badge>
                </>
              )}
            </div>

            <p className="mt-5 text-muted-foreground">{product.description}</p>

            <Separator className="my-6" />

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                className="flex-1"
                disabled={product.stock === 0}
                onClick={() => {
                  addItem(product, qty);
                  toast.success(`${product.name} added to cart`);
                }}
              >
                <ShoppingCart className="size-4" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Wishlist"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  className={cn(
                    "size-5",
                    wished && "fill-destructive text-destructive",
                  )}
                />
              </Button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                to="/checkout"
                className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80"
                onClick={() => addItem(product, qty)}
              >
                Buy Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold hover:bg-accent"
              >
                <Wrench className="size-4" /> Request Installation
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({product.reviews_count})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specs">
              <Card>
                <CardContent className="p-0">
                  <dl className="divide-y">
                    {Object.entries(product.specifications).map(([k, v]) => (
                      <div
                        key={k}
                        className="grid grid-cols-2 gap-4 px-6 py-3 text-sm"
                      >
                        <dt className="font-medium text-muted-foreground">
                          {k}
                        </dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4">
                {SAMPLE_REVIEWS.map((r, i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{r.author}</p>
                        <StarRating value={r.rating} />
                      </div>
                      <p className="mt-2 flex items-center gap-1 text-xs text-primary">
                        <Check className="size-3" /> Verified purchase
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {r.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
