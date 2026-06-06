import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Icon } from "@/components/common/Icon";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const categoryImages: Record<string, string> = {
  "fire-extinguishers": "/assets/images/category-fire-extinguishers-new.jpg",
  "cctv-cameras": "/assets/images/category-accessories-new.jpg",
  recorders: "/assets/images/category-recorders-new.jpg",
  "fire-alarm": "/assets/images/category-fire-alarm-new.jpg",
  "access-control": "/assets/images/category-access-control-new.jpg",
  accessories: "/assets/images/category-cctv-cameras-new.jpg",
};

export default function ProductCategory() {
  const { categoryId } = useParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const category = PRODUCT_CATEGORIES.find((item) => item.id === categoryId);

  const products = useMemo(() => {
    let list = PRODUCTS.filter((product) => product.category === categoryId);
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.subcategory?.toLowerCase().includes(normalizedQuery),
      );
    }

    return [...list].sort((a, b) => {
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
  }, [categoryId, query, sort]);

  if (!category) {
    return (
      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container text-center">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <Link
            to="/products"
            className={buttonVariants({
              className: "mt-6 bg-[#c91616] text-white hover:bg-[#a90f0f]",
            })}
          >
            Back to Categories
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={category.name}
        path={`/products/category/${category.id}`}
        description={`Browse ${category.name} product varieties from BSS.`}
      />

      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#07130f] text-white">
        <img
          src={categoryImages[category.id]}
          alt={category.name}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          decoding="async"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07130f] via-[#07130f]/88 to-[#07130f]/40" />
        <div className="container py-10 sm:py-14">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-[#bde8c0]"
          >
            <ArrowLeft className="size-4" />
            Back to categories
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex size-14 items-center justify-center rounded-lg bg-[#c91616] text-white shadow-xl shadow-red-950/25">
              <Icon name={category.icon} className="size-7" />
            </div>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              Browse all available product varieties in this category. Search by
              model, subcategory, size or type.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container">
          <div className="mb-8 rounded-lg border border-white/10 bg-[#07130f] p-4 shadow-2xl shadow-black/20 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8ed0af]" />
                <Input
                  placeholder={`Search ${category.name.toLowerCase()}...`}
                  className="h-12 border-white/10 bg-[#10231d] pl-11 text-white placeholder:text-white/40"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <Select
                className="h-12 w-full border-white/10 bg-[#10231d] text-white lg:w-56"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Select>
              <Badge className="h-12 justify-center rounded-md bg-white/[0.06] px-4 text-white hover:bg-white/[0.06]">
                {products.length} products
              </Badge>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-white/20 py-20 text-center text-white/60">
              No products match your search.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              to="/products"
              className={buttonVariants({
                variant: "outline",
                className: "border-white/20 bg-white/[0.04] text-white hover:border-[#bde8c0]/60 hover:bg-[#1f3b31] hover:text-white",
              })}
            >
              View All Categories <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
