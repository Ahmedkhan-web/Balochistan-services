import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_USERS } from "@/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function UserManagement() {
  const customers = ADMIN_USERS.filter((user) => user.role === "customer");
  const staff = ADMIN_USERS.filter((user) => user.role !== "customer");
  const active = ADMIN_USERS.filter((user) => user.status === "active");

  return (
    <div>
      <PageHeader
        title="Users & Customers"
        description="View customer information, staff access, account status and role controls."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <UserMetric
          label="Total Users"
          value={ADMIN_USERS.length}
          helper="Customers and staff"
        />
        <UserMetric
          label="Customers"
          value={customers.length}
          helper="Client accounts"
        />
        <UserMetric
          label="Active Accounts"
          value={active.length}
          helper="Currently enabled"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b bg-[#07130f] text-white">
            <CardTitle>Customer Information</CardTitle>
            <p className="mt-1 text-sm text-white/60">
              Client contact details, company, account activity and order count.
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 p-4 sm:p-5">
            {customers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Staff & Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {staff.map((user) => (
              <UserCard key={user.id} user={user} compact />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserCard({
  user,
  compact = false,
}: {
  user: (typeof ADMIN_USERS)[number];
  compact?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              {user.role === "customer" ? (
                <UserRound className="size-5" />
              ) : (
                <ShieldCheck className="size-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">{user.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {user.company}
              </p>
            </div>
            <StatusBadge status={user.status} />
          </div>

          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <p className="flex min-w-0 items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              <span className="truncate">{user.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              {user.phone}
            </p>
          </div>

          {!compact && (
            <div className="mt-4 grid gap-2 min-[420px]:grid-cols-3">
              <InfoPill label="Orders" value={String(user.orders)} />
              <InfoPill label="Joined" value={formatDate(user.joined)} />
              <InfoPill
                label="Last active"
                value={formatDate(user.lastActive)}
              />
            </div>
          )}
        </div>

        <div className="grid gap-3">
          <Badge variant="secondary" className="w-fit capitalize">
            {user.role.replace("_", " ")}
          </Badge>
          <label className="grid gap-2 text-sm font-medium">
            Change role
            <Select defaultValue={user.role}>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </Select>
          </label>
          <Button variant="outline" size="sm">
            View Account
          </Button>
        </div>
      </div>
    </div>
  );
}

function UserMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-xs font-medium text-primary">{helper}</p>
      </CardContent>
    </Card>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted/40 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
