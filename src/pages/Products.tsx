import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesQuery && matchesCategory;
    });

    list = [...list].sort((a, b) => {
      const ap = a.discount_price ?? a.price;
      const bp = b.discount_price ?? b.price;
      switch (sort) {
        case "price-asc":
          return ap - bp;
        case "price-desc":
          return bp - ap;
        case "rating":
          return b.rating - a.rating;
        default:
          return Number(b.featured ?? false) - Number(a.featured ?? false);
      }
    });
    return list;
  }, [query, category, sort]);

  return (
    <>
      <Seo
        title="Security Products"
        path="/products"
        description="Shop fire extinguishers, CCTV cameras, DVR/NVR systems, fire alarms, access control and security accessories."
      />

      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Security Products
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Certified fire safety equipment, surveillance and access control
            systems for every environment.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal className="size-4" /> Categories
              </p>
              <div className="flex flex-col gap-1">
                <Button
                  variant={category === "all" ? "default" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={() => setCategory("all")}
                >
                  All Products
                </Button>
                {PRODUCT_CATEGORIES.map((c) => (
                  <Button
                    key={c.id}
                    variant={category === c.id ? "default" : "ghost"}
                    size="sm"
                    className="justify-start"
                    onClick={() => setCategory(c.id)}
                  >
                    {c.name}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <Badge variant="secondary">{filtered.length} products</Badge>
              <Select
                className="w-48"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                No products match your filters.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
