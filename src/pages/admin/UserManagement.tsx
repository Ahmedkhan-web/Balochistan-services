import { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireSupabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { Profile } from "@/types";

export default function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customers = useMemo(
    () => users.filter((user) => user.role === "customer"),
    [users],
  );
  const admins = useMemo(
    () => users.filter((user) => user.role === "admin"),
    [users],
  );

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const supabase = await requireSupabase();
        const { data, error: loadError } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (loadError) throw loadError;
        if (active) setUsers((data ?? []) as Profile[]);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load users");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Registered Users"
        description="Customer and admin profiles from Supabase. New signups appear here with their account details."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <UserMetric label="Total Users" value={users.length} helper="All profiles" />
        <UserMetric label="Customers" value={customers.length} helper="Website users" />
        <UserMetric label="Admins" value={admins.length} helper="SQL controlled" />
      </div>

      <Card className="overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
        <CardHeader className="border-b border-white/10 bg-[#07130f]">
          <CardTitle>User Details</CardTitle>
          <p className="mt-1 text-sm text-white/60">
            Name, email, phone, location, company, facility type and join date.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 p-4 sm:p-5">
          {loading ? (
            <EmptyState text="Loading registered users..." />
          ) : error ? (
            <EmptyState text={error} />
          ) : users.length > 0 ? (
            users.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <EmptyState text="No users have registered yet." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UserCard({ user }: { user: Profile }) {
  const isAdmin = user.role === "admin";

  return (
    <div className="rounded-lg border border-white/10 bg-[#07130f] p-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af]">
              {isAdmin ? (
                <ShieldCheck className="size-5" />
              ) : (
                <UserRound className="size-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">{user.full_name}</p>
              <p className="truncate text-sm text-white/55">
                {user.company || "No company provided"}
              </p>
            </div>
            <Badge
              variant={isAdmin ? "default" : "secondary"}
              className="capitalize"
            >
              {user.role}
            </Badge>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-white/62">
            <p className="flex min-w-0 items-center gap-2">
              <Mail className="size-4 shrink-0 text-[#8ed0af]" />
              <span className="truncate">{user.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-[#8ed0af]" />
              {user.phone || "Phone not provided"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-[#8ed0af]" />
              {[user.city, user.country].filter(Boolean).join(", ") ||
                "Location not provided"}
            </p>
          </div>

          <div className="mt-4 grid gap-2 min-[420px]:grid-cols-3">
            <InfoPill label="Facility" value={user.facility_type || "Not provided"} />
            <InfoPill label="Company" value={user.company || "Not provided"} />
            <InfoPill label="Joined" value={formatDate(user.created_at)} />
          </div>
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
    <Card className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
      <CardContent className="p-5">
        <p className="text-sm text-white/58">{label}</p>
        <p className="mt-1 text-3xl font-bold text-[#bde8c0]">{value}</p>
        <p className="mt-1 text-xs font-medium text-white/45">{helper}</p>
      </CardContent>
    </Card>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/42">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-[#07130f] p-6 text-center text-sm text-white/58">
      {text}
    </div>
  );
}
