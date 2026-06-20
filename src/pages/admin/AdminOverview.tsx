import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { adminPath } from "@/lib/adminRoute";
import { requireSupabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { Profile } from "@/types";

export default function AdminOverview() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const supabase = await requireSupabase();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;
        if (active) setUsers((data ?? []) as Profile[]);
      } catch {
        if (active) setUsers([]);
      } finally {
        if (active) setLoadingUsers(false);
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  const customers = useMemo(
    () => users.filter((user) => user.role === "customer"),
    [users],
  );
  const admins = useMemo(
    () => users.filter((user) => user.role === "admin"),
    [users],
  );

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="A light control view for registered users, catalog readiness and WhatsApp request handling."
        action={
          <Link
            to={adminPath("users")}
            className={buttonVariants({
              className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
            })}
          >
            View Users <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Recent Users"
          value={loadingUsers ? "..." : String(users.length)}
          icon="users"
          trend={`${customers.length} customer accounts`}
        />
        <StatCard
          label="Admin Accounts"
          value={String(admins.length)}
          icon="shield-check"
          trend="SQL controlled access"
        />
      </div>

      <div className="mt-6">
        <Card className="overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardHeader className="border-b border-white/10 bg-[#07130f]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>New Registered Users</CardTitle>
                <p className="mt-1 text-sm text-white/60">
                  Latest customer and admin profiles from Supabase.
                </p>
              </div>
              <Badge className="bg-white/[0.08] text-[#bde8c0] hover:bg-white/[0.08]">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 sm:p-5">
            {loadingUsers ? (
              <div className="rounded-lg border border-white/10 bg-[#07130f] p-4 text-sm text-white/60">
                Loading users...
              </div>
            ) : users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="grid gap-3 rounded-lg border border-white/10 bg-[#07130f] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold">{user.full_name}</p>
                      <Badge
                        variant={user.role === "admin" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-sm text-white/58">
                      {user.email}
                    </p>
                    <p className="mt-1 text-sm text-white/48">
                      {[user.city, user.country].filter(Boolean).join(", ") ||
                        "Location not provided"}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#bde8c0]">
                    {formatDate(user.created_at)}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 bg-[#07130f] p-6 text-center text-sm text-white/58">
                No profiles found yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
