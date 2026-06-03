import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export default function ProductManagement() {
  const [query, setQuery] = useState("");
  const list = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  ).slice(0, 25);

  return (
    <div>
      <PageHeader
        title="Product Management"
        description="Manage catalog, pricing and inventory."
        action={
          <Button>
            <Plus className="size-4" /> Add Product
          </Button>
        }
      />

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Product</TH>
            <TH>Category</TH>
            <TH>Price</TH>
            <TH>Stock</TH>
            <TH>Status</TH>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {list.map((p) => {
            const cat = PRODUCT_CATEGORIES.find((c) => c.id === p.category);
            return (
              <TR key={p.id}>
                <TD>
                  <div className="flex items-center gap-3">
                    <ImagePlaceholder
                      icon={cat?.icon ?? "shield"}
                      className="size-10 shrink-0 rounded-md"
                    />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </TD>
                <TD className="text-muted-foreground">{cat?.name}</TD>
                <TD>{formatCurrency(p.discount_price ?? p.price)}</TD>
                <TD>{p.stock}</TD>
                <TD>
                  <StatusBadge status={p.stock > 0 ? "active" : "inactive"} />
                </TD>
                <TD>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="size-8">
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TD>
              </TR>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}
