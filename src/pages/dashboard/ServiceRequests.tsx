import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MOCK_SERVICE_REQUESTS } from "@/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function ServiceRequests() {
  return (
    <div>
      <PageHeader
        title="Service Requests"
        description="View bookings and track installation/maintenance progress."
        action={
          <Link to="/services" className={buttonVariants()}>
            New Request
          </Link>
        }
      />
      <Table>
        <THead>
          <TR>
            <TH>Reference</TH>
            <TH>Service</TH>
            <TH>Address</TH>
            <TH>Scheduled</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          {MOCK_SERVICE_REQUESTS.map((s) => (
            <TR key={s.id}>
              <TD className="font-medium">{s.reference}</TD>
              <TD>{s.service_name}</TD>
              <TD className="max-w-xs truncate text-muted-foreground">
                {s.address}
              </TD>
              <TD className="text-muted-foreground">
                {s.scheduled_at ? formatDate(s.scheduled_at) : "—"}
              </TD>
              <TD>
                <StatusBadge status={s.status} />
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
