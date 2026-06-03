import { Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MOCK_INVOICES } from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function Invoices() {
  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Download invoices and receipts for your orders."
      />
      <Table>
        <THead>
          <TR>
            <TH>Invoice #</TH>
            <TH>Date</TH>
            <TH>Amount</TH>
            <TH>Tax</TH>
            <TH>Total</TH>
            <TH>Status</TH>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {MOCK_INVOICES.map((inv) => (
            <TR key={inv.id}>
              <TD className="font-medium">{inv.number}</TD>
              <TD className="text-muted-foreground">
                {formatDate(inv.created_at)}
              </TD>
              <TD>{formatCurrency(inv.amount)}</TD>
              <TD>{formatCurrency(inv.tax)}</TD>
              <TD className="font-semibold">{formatCurrency(inv.total)}</TD>
              <TD>
                <StatusBadge status={inv.status} />
              </TD>
              <TD>
                <Button variant="outline" size="sm">
                  <Download className="size-4" /> PDF
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
