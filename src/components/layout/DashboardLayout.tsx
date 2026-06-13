import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { useAuthStore } from "@/store/authStore";
import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

export function DashboardLayout({
  title,
  nav,
}: {
  title: string;
  nav: DashboardNavItem[];
}) {
  const { profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r bg-background transition-transform lg:static lg:translate-x-0",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Logo compact />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-accent",
                )
              }
            >
              <Icon name={item.icon} className="size-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to site
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {initials(profile?.full_name ?? "BSS")}
              </div>
              <div className="hidden text-sm sm:block">
                <p className="font-medium leading-none">{profile?.full_name}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {profile?.role?.replace("_", " ")}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sign out"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              <LogOut className="size-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
