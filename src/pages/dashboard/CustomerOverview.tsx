import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useAuthStore } from "@/store/authStore";
import { createWhatsAppLink } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const fallback = "Not provided";

export default function CustomerOverview() {
  const { profile } = useAuthStore();
  const accountRows = [
    { label: "Full name", value: profile?.full_name },
    { label: "Email", value: profile?.email },
    { label: "Phone", value: profile?.phone },
    { label: "City", value: profile?.city },
    { label: "Country", value: profile?.country },
    { label: "Company", value: profile?.company },
    { label: "Facility type", value: profile?.facility_type },
    {
      label: "Joined",
      value: profile?.created_at ? formatDate(profile.created_at) : undefined,
    },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome, ${profile?.full_name?.split(" ")[0] ?? "Customer"}`}
        description="Your BSS account details and fast request actions."
        action={
          <Link
            to="/products"
            className={buttonVariants({
              className: "bg-[#c91616] text-white hover:bg-[#a90f0f]",
            })}
          >
            Browse Products <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="overflow-hidden border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#c91616] text-white shadow-lg shadow-red-950/20">
                <UserRound className="size-7" />
              </div>
              <div className="min-w-0">
                <Badge className="bg-white/[0.08] text-[#bde8c0] hover:bg-white/[0.08]">
                  Customer Account
                </Badge>
                <p className="mt-4 truncate text-2xl font-bold">
                  {profile?.full_name ?? fallback}
                </p>
                <p className="mt-1 truncate text-sm text-white/60">
                  {profile?.email ?? fallback}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm">
              <ContactLine icon={Phone} value={profile?.phone} />
              <ContactLine icon={Mail} value={profile?.email} />
              <ContactLine
                icon={MapPin}
                value={
                  [profile?.city, profile?.country].filter(Boolean).join(", ") ||
                  undefined
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <p className="mt-1 text-sm text-white/58">
              These details come from your Supabase profile.
            </p>
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

      <div className="mt-6">
        <Card className="border-white/10 bg-[#10231d] text-white shadow-xl shadow-black/15">
          <CardContent className="p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-[#1f3b31] text-[#8ed0af]">
              <MessageCircle className="size-5" />
            </div>
            <h3 className="mt-5 font-bold">Direct Support</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Contact BSS for account corrections, urgent help or quote follow-up.
            </p>
            <a
              href={createWhatsAppLink(
                "Hello BSS, I need help with my customer account.",
              )}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                className:
                  "mt-5 w-full bg-[#25D366] text-white hover:bg-[#20bd5a] sm:w-auto",
              })}
            >
              WhatsApp BSS <MessageCircle className="size-4" />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  value,
}: {
  icon: typeof Phone;
  value?: string | null;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#07130f] p-3">
      <Icon className="size-4 text-[#8ed0af]" />
      <span className="min-w-0 truncate">{value || fallback}</span>
    </div>
  );
}
