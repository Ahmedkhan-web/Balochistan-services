import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS } from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function Orders() {
  return (
    <div>
      <PageHeader
        title="My Orders"
        description="Track and manage your product orders."
      />
      <Table>
        <THead>
          <TR>
            <TH>Reference</TH>
            <TH>Date</TH>
            <TH>Items</TH>
            <TH>Total</TH>
            <TH>Payment</TH>
            <TH>Status</TH>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {MOCK_ORDERS.map((o) => (
            <TR key={o.id}>
              <TD className="font-medium">{o.reference}</TD>
              <TD className="text-muted-foreground">
                {formatDate(o.created_at)}
              </TD>
              <TD>{o.items.length} item(s)</TD>
              <TD className="font-semibold">{formatCurrency(o.total)}</TD>
              <TD>
                <StatusBadge status={o.payment_status} />
              </TD>
              <TD>
                <StatusBadge status={o.status} />
              </TD>
              <TD>
                <Button variant="outline" size="sm">
                  Track
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
