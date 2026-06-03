import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { MOCK_ORDERS } from "@/data/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrderManagement() {
  return (
    <div>
      <PageHeader
        title="Order Management"
        description="Process, fulfil and update customer orders."
      />
      <Table>
        <THead>
          <TR>
            <TH>Reference</TH>
            <TH>Date</TH>
            <TH>Items</TH>
            <TH>Total</TH>
            <TH>Method</TH>
            <TH>Payment</TH>
            <TH>Update Status</TH>
          </TR>
        </THead>
        <TBody>
          {MOCK_ORDERS.map((o) => (
            <TR key={o.id}>
              <TD className="font-medium">{o.reference}</TD>
              <TD className="text-muted-foreground">
                {formatDate(o.created_at)}
              </TD>
              <TD>{o.items.length}</TD>
              <TD className="font-semibold">{formatCurrency(o.total)}</TD>
              <TD className="capitalize">{o.payment_method.replace("_", " ")}</TD>
              <TD>
                <StatusBadge status={o.payment_status} />
              </TD>
              <TD>
                <Select defaultValue={o.status} className="w-40">
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
