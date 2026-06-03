import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { MOCK_SERVICE_REQUESTS } from "@/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function ServiceManagement() {
  return (
    <div>
      <PageHeader
        title="Service Management"
        description="Assign technicians and track service requests."
      />
      <Table>
        <THead>
          <TR>
            <TH>Reference</TH>
            <TH>Service</TH>
            <TH>Address</TH>
            <TH>Scheduled</TH>
            <TH>Status</TH>
            <TH>Assign</TH>
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
              <TD>
                <Select defaultValue="" className="w-40">
                  <option value="">Unassigned</option>
                  <option value="sara">Sara Ahmed</option>
                  <option value="bilal">Bilal Khan</option>
                </Select>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
