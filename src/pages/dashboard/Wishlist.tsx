import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function Wishlist() {
  const wishlist = useCartStore((s) => s.wishlist);

  return (
    <div>
      <PageHeader
        title="Wishlist"
        description="Products you've saved for later."
      />
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed py-20 text-center">
          <Heart className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">Your wishlist is empty.</p>
          <Link to="/products" className={buttonVariants()}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
