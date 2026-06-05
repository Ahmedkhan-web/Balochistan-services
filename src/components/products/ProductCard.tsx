import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/common/StarRating";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Icon } from "@/components/common/Icon";
import { PRODUCT_CATEGORIES } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { buttonVariants } from "@/components/ui/button";
import { cn, discountPercent, formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleWishlist, isWishlisted, items } = useCartStore();
  const wished = isWishlisted(product.id);
  const cartItem = items.find((item) => item.product.id === product.id);
  const category = PRODUCT_CATEGORIES.find((c) => c.id === product.category);
  const discount = discountPercent(product.price, product.discount_price);

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/products/${product.slug}`} className="relative block">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="aspect-[4/3] w-full bg-muted object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder
            icon={category?.icon ?? "shield"}
            label={product.subcategory}
            className="aspect-[4/3] w-full"
          />
        )}
        {discount > 0 && (
          <Badge className="absolute left-3 top-3" variant="destructive">
            -{discount}%
          </Badge>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
            toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute right-3 top-3 rounded-full bg-background/90 p-2 shadow-sm transition hover:scale-110"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={cn(
              "size-4",
              wished ? "fill-destructive text-destructive" : "text-foreground",
            )}
          />
        </button>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name={category?.icon ?? "shield"} className="size-3.5 shrink-0" />
          <span className="min-w-0 truncate">{category?.name}</span>
        </div>
        <Link
          to={`/products/${product.slug}`}
          className="line-clamp-2 text-base font-semibold leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <StarRating value={product.rating} count={product.reviews_count} />
        <div className="mt-auto flex min-w-0 items-end justify-between gap-2 pt-2">
          <div className="min-w-0 flex-1">
            {product.discount_price ? (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(product.discount_price)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <Badge className="shrink-0" variant={product.stock > 0 ? "success" : "destructive"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        {cartItem ? (
          <Link
            to="/cart"
            className={buttonVariants({
              variant: "outline",
              className: "mt-2 h-11 w-full",
            })}
          >
            In Cart · Qty {cartItem.quantity}/10
          </Link>
        ) : (
          <Button
            className="mt-2 h-11 w-full"
            disabled={product.stock === 0}
            onClick={() => {
              addItem(product, 1);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingCart className="size-4" /> Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
