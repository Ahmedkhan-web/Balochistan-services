import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";

const fallback = "Not provided";

export default function Profile() {
  const { profile } = useAuthStore();

  const accountRows = [
    { label: "Full name", value: profile?.full_name },
    { label: "Email", value: profile?.email },
    { label: "Phone", value: profile?.phone },
    { label: "City", value: profile?.city },
    { label: "Country", value: profile?.country },
    { label: "Company", value: profile?.company },
    { label: "Facility type", value: profile?.facility_type },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Account"
        description="Your registered BSS account information. Contact support if any detail needs to be updated."
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#c91616] text-white shadow-lg shadow-red-950/20">
                <ShieldCheck className="size-7" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xl font-bold">
                  {profile?.full_name ?? "BSS Customer"}
                </p>
                <p className="mt-1 truncate text-sm text-white/60">
                  {profile?.email ?? fallback}
                </p>
                <Badge className="mt-4 bg-white/[0.08] text-[#bde8c0] hover:bg-white/[0.08]">
                  {profile?.role?.replace("_", " ") ?? "customer"}
                </Badge>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#07130f] p-3">
                <Phone className="size-4 text-[#8ed0af]" />
                <span className="min-w-0 truncate">
                  {profile?.phone ?? fallback}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#07130f] p-3">
                <Mail className="size-4 text-[#8ed0af]" />
                <span className="min-w-0 truncate">
                  {profile?.email ?? fallback}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#07130f] p-3">
                <MapPin className="size-4 text-[#8ed0af]" />
                <span className="min-w-0 truncate">
                  {[profile?.city, profile?.country].filter(Boolean).join(", ") ||
                    fallback}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardHeader>
            <CardTitle>Registered Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 sm:grid-cols-2">
              {accountRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg border border-white/10 bg-[#07130f] p-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-white/45">
                    {row.label}
                  </dt>
                  <dd className="mt-2 min-h-6 break-words font-semibold">
                    {row.value || fallback}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
