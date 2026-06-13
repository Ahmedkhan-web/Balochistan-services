import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { isSupabaseConfigured } from "@/lib/supabase";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-brand-700 to-brand-950 p-12 text-white lg:flex">
        <Logo to="/" className="[&_span]:text-white [&_span]:opacity-100" />
        <div>
          <ShieldCheck className="mb-6 size-16 opacity-90" />
          <h2 className="text-3xl font-bold">
            Protecting Lives. Securing Assets. Building Trust.
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Manage your orders, service requests, invoices and security systems
            from one secure dashboard.
          </p>
        </div>
        <p className="text-sm text-white/60">
          Copyright {new Date().getFullYear()} Balochistan Standard Services
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-7 lg:hidden">
            <Logo to="/" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

          {!isSupabaseConfigured && (
            <div className="mt-4 rounded-lg border border-dashed bg-muted/50 p-3 text-xs text-muted-foreground">
              Demo mode (no Supabase configured). Create an account first, then
              sign in with that email. Emails starting with <code>admin</code>{" "}
              open the admin dashboard.
            </div>
          )}

          <div className="mt-6">{children}</div>

          {footer && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
