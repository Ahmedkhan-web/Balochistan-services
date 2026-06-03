import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ADMIN_USERS } from "@/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function UserManagement() {
  return (
    <div>
      <PageHeader
        title="User & Staff Management"
        description="Manage roles, permissions and access."
      />
      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Email</TH>
            <TH>Role</TH>
            <TH>Joined</TH>
            <TH>Status</TH>
            <TH>Change Role</TH>
          </TR>
        </THead>
        <TBody>
          {ADMIN_USERS.map((u) => (
            <TR key={u.id}>
              <TD className="font-medium">{u.name}</TD>
              <TD className="text-muted-foreground">{u.email}</TD>
              <TD>
                <Badge variant="secondary" className="capitalize">
                  {u.role.replace("_", " ")}
                </Badge>
              </TD>
              <TD className="text-muted-foreground">{formatDate(u.joined)}</TD>
              <TD>
                <StatusBadge status={u.status} />
              </TD>
              <TD>
                <Select defaultValue={u.role} className="w-40">
                  <option value="customer">Customer</option>
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </Select>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
