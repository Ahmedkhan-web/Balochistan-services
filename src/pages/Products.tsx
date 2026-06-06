import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";

const categoryImages: Record<string, string> = {
  "fire-extinguishers": "/assets/images/category-fire-extinguishers-new.jpg",
  "cctv-cameras": "/assets/images/category-accessories-new.jpg",
  recorders: "/assets/images/category-recorders-new.jpg",
  "fire-alarm": "/assets/images/category-fire-alarm-new.jpg",
  "access-control": "/assets/images/category-access-control-new.jpg",
  accessories: "/assets/images/category-cctv-cameras-new.jpg",
};

const categoryDescriptions: Record<string, string> = {
  "fire-extinguishers":
    "Certified CO2, DCP, foam and water extinguishers for offices, factories and public facilities.",
  "cctv-cameras":
    "Dome, bullet, PTZ and night-vision cameras for clear facility monitoring.",
  recorders:
    "DVR and NVR systems for reliable recording, storage and remote access.",
  "fire-alarm":
    "Panels, detectors, call points and emergency devices for early fire detection.",
  "access-control":
    "Biometric, RFID, lock and turnstile systems for controlled entry points.",
  accessories:
    "Support equipment for security, alarms, fire readiness and installation work.",
};

export default function Products() {
  const categoryCounts = useMemo(
    () =>
      PRODUCTS.reduce<Record<string, number>>((counts, product) => {
        counts[product.category] = (counts[product.category] ?? 0) + 1;
        return counts;
      }, {}),
    [],
  );

  return (
    <>
      <Seo
        title="Security Products"
        path="/products"
        description="Browse BSS product categories for fire extinguishers, CCTV cameras, recorders, fire alarms, access control and security accessories."
      />

      <section className="border-b border-white/10 bg-[#07130f] text-white">
        <div className="container grid gap-7 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge className="bg-[#c91616] text-white hover:bg-[#c91616]">
              Product Categories
            </Badge>
            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Choose a category, then browse the exact product varieties.
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:ml-auto">
            Products are organized by real facility needs, so customers can move
            from category to matching equipment without fighting filters.
          </p>
        </div>
      </section>

      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category, index) => {
              const count = categoryCounts[category.id] ?? 0;

              return (
                <Link
                  key={category.id}
                  to={`/products/category/${category.id}`}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-[#10231d] shadow-2xl shadow-black/15 transition hover:-translate-y-1 hover:border-[#bde8c0]/40 hover:bg-[#142a23]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={categoryImages[category.id]}
                      alt={category.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07130f] via-[#07130f]/28 to-transparent" />
                    <div className="absolute left-4 top-4 flex size-12 items-center justify-center rounded-lg bg-[#07130f]/80 text-[#8ed0af] shadow-lg backdrop-blur">
                      <Icon name={category.icon} className="size-6" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xl font-bold">{category.name}</p>
                        <p className="mt-2 text-sm leading-7 text-white/58">
                          {categoryDescriptions[category.id]}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-[#bde8c0]">
                        {count}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                        <CheckCircle2 className="size-4 text-[#8ed0af]" />
                        View varieties
                      </span>
                      <ArrowRight className="size-5 text-[#8ed0af] transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-lg border border-white/10 bg-[#07130f] p-5 text-white sm:p-7 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-lg font-bold">Need help choosing the right product?</p>
              <p className="mt-2 text-sm leading-7 text-white/60">
                BSS can recommend category, size and installation plan after a site survey.
              </p>
            </div>
            <Link
              to="/contact"
              className={buttonVariants({
                className: "mt-5 bg-[#c91616] text-white hover:bg-[#a90f0f] lg:mt-0",
              })}
            >
              Request Guidance <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
