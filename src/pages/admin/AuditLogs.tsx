import { PageHeader } from "@/components/dashboard/PageHeader";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { AUDIT_LOGS } from "@/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function AuditLogs() {
  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Immutable trail of administrative actions."
      />
      <Table>
        <THead>
          <TR>
            <TH>Actor</TH>
            <TH>Action</TH>
            <TH>Target</TH>
            <TH>Time</TH>
          </TR>
        </THead>
        <TBody>
          {AUDIT_LOGS.map((log) => (
            <TR key={log.id}>
              <TD className="font-medium">{log.actor}</TD>
              <TD>{log.action}</TD>
              <TD className="text-muted-foreground">{log.target}</TD>
              <TD className="text-muted-foreground">{formatDate(log.time)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
