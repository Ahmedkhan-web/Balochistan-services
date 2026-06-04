import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore, ADMIN_ROLES } from "@/store/authStore";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "overview" },
  { to: "/products", key: "products" },
  { to: "/services", key: "services" },
  { to: "/contact", key: "contact" },
];

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.count());
  const { profile, signOut, hasRole } = useAuthStore();
  const navigate = useNavigate();

  const dashboardPath = hasRole(...ADMIN_ROLES) ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[4.5rem] items-center justify-between gap-4">
        <Logo className="max-w-[230px] sm:max-w-[320px]" />

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary",
                  isActive
                    ? "bg-accent text-primary shadow-sm"
                    : "text-foreground/70",
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="size-5" />
            </Button>
            {count > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-[10px]">
                {count}
              </Badge>
            )}
          </Link>

          {profile ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(dashboardPath)}
              >
                <User className="size-4" /> {t("nav.dashboard")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
              >
                {t("nav.logout")}
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" onClick={() => navigate("/signin")}>
                {t("nav.signin")}
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                {t("nav.signup")}
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t xl:hidden">
          <nav className="container flex flex-col py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium",
                    isActive
                      ? "bg-accent text-primary"
                      : "text-foreground/80 hover:bg-muted",
                  )
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2 border-t pt-3">
              {profile ? (
                <>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      navigate(dashboardPath);
                    }}
                  >
                    {t("nav.dashboard")}
                  </Button>
                  <Button
                    className="flex-1"
                    variant="ghost"
                    onClick={async () => {
                      setOpen(false);
                      await signOut();
                      navigate("/");
                    }}
                  >
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      navigate("/signin");
                    }}
                  >
                    {t("nav.signin")}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setOpen(false);
                      navigate("/signup");
                    }}
                  >
                    {t("nav.signup")}
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
