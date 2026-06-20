import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
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

function fieldValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export default function InstallationRequest() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const category = product
    ? PRODUCT_CATEGORIES.find((item) => item.id === product.category)
    : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!product) return;

    const formData = new FormData(event.currentTarget);
    const message = [
      "Hello BSS, I want to request product installation.",
      "",
      "Customer Details:",
      `Name: ${fieldValue(formData, "name")}`,
      `Email: ${fieldValue(formData, "email")}`,
      `Phone: ${fieldValue(formData, "phone")}`,
      `Region: ${fieldValue(formData, "region")}`,
      `City: ${fieldValue(formData, "city")}`,
      `Address: ${fieldValue(formData, "address")}`,
      "",
      "Product Details:",
      `Product: ${product.name}`,
      `Category: ${category?.name ?? product.category}`,
      `Subcategory: ${product.subcategory ?? "N/A"}`,
      `Product URL: ${window.location.origin}/products/${product.slug}`,
      "",
      "Installation Details:",
      `Preferred time: ${fieldValue(formData, "preferredTime")}`,
      `Site type: ${fieldValue(formData, "siteType")}`,
      `Notes: ${fieldValue(formData, "notes") || "N/A"}`,
      "",
      "Please confirm availability and next steps.",
    ].join("\n");

    window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  if (!product) {
    return (
      <>
        <Seo title="Installation Request" path="/installation-request" />
        <section className="section-y">
          <div className="container text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Link to="/products" className={buttonVariants({ className: "mt-5" })}>
              Browse Products
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title={`Installation Request - ${product.name}`}
        path={`/products/${product.slug}/installation`}
        description={`Request professional installation support for ${product.name} from BSS.`}
      />

      <section className="border-b bg-muted/40">
        <div className="container py-9 sm:py-12">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to product
          </Link>
          <Badge variant="secondary" className="mt-5 block w-fit">
            Installation Support
          </Badge>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Request Product Installation
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Share your site details and we will prepare the WhatsApp request for BSS
            with the selected product information.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <Card className="h-fit overflow-hidden lg:sticky lg:top-24">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Wrench className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Selected Product</h2>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-[4/3] w-full bg-muted object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 34vw, 100vw"
                  />
                ) : (
                  <ImagePlaceholder
                    icon={category?.icon ?? "shield"}
                    label={product.subcategory}
                    className="aspect-[4/3] w-full"
                  />
                )}
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{category?.name}</Badge>
                    <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-bold leading-snug">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed p-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Your details will open in WhatsApp with a complete installation
                  request message for the BSS admin team.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="size-5 text-primary" />
                <h2 className="text-xl font-bold">Installation Details</h2>
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium">
                    City
                    <Input name="city" autoComplete="address-level2" required />
                  </label>
                  <label className="grid gap-2 text-sm font-medium">
                    Preferred time
                    <Select name="preferredTime" required defaultValue="Any suitable time">
                      <option value="Any suitable time">Any suitable time</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </Select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-medium">
                  Site type
                  <Select name="siteType" required defaultValue="Commercial">
                    <option value="Commercial">Commercial</option>
                    <option value="Office">Office</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Residential">Residential</option>
                    <option value="Government / Institution">Government / Institution</option>
                  </Select>
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Complete address
                  <Textarea name="address" autoComplete="street-address" required />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Notes
                  <Textarea
                    name="notes"
                    placeholder="Mention installation location, urgency, access details or site requirements"
                  />
                </label>

                <Button className="h-12 w-full">
                  Place Installation Request <MessageCircle className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
