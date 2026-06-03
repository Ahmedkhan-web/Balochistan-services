import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/common/StarRating";

const REVIEWS = [
  { id: "r1", product: "4MP Dome IP Camera", author: "Imran Baloch", rating: 5, comment: "Excellent picture quality.", approved: true },
  { id: "r2", product: "DCP Fire Extinguisher — 6 KG", author: "Tariq M.", rating: 4, comment: "Good value, fast delivery.", approved: false },
  { id: "r3", product: "Biometric Attendance Machine", author: "Sara A.", rating: 5, comment: "Easy to set up and reliable.", approved: false },
];

export default function ReviewManagement() {
  return (
    <div>
      <PageHeader
        title="Review Management"
        description="Approve, reject and moderate customer reviews."
      />
      <Table>
        <THead>
          <TR>
            <TH>Product</TH>
            <TH>Author</TH>
            <TH>Rating</TH>
            <TH>Comment</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          {REVIEWS.map((r) => (
            <TR key={r.id}>
              <TD className="font-medium">{r.product}</TD>
              <TD>{r.author}</TD>
              <TD>
                <StarRating value={r.rating} />
              </TD>
              <TD className="max-w-xs truncate text-muted-foreground">
                {r.comment}
              </TD>
              <TD>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Check className="size-4 text-primary" /> Approve
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <X className="size-4" />
                  </Button>
                </div>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
