import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore, ADMIN_ROLES } from "@/store/authStore";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.count());
  const { profile, signOut, hasRole } = useAuthStore();
  const navigate = useNavigate();

  const dashboardPath = hasRole(...ADMIN_ROLES) ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/85 backdrop-blur supports-[backdrop-filter]:bg-black/70">
      <div className="container relative flex min-h-16 items-center justify-between gap-2 py-2 md:min-h-[4.5rem] md:gap-3 md:py-0">
        <Logo className="flex-1 xl:flex-none" />

        <nav className="absolute left-[52%] hidden -translate-x-1/2 items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[#c91616]/15 hover:text-[#ff6b5f]",
                  isActive
                    ? "bg-[#c91616] text-white shadow-sm"
                    : "text-foreground/70",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
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
                <User className="size-4" /> Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Sign Up
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
        <div className="border-t border-white/10 bg-black/95 shadow-lg xl:hidden">
          <nav className="container flex max-h-[calc(100vh-4rem)] flex-col overflow-y-auto py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-3 text-center text-sm font-medium",
                    isActive
                      ? "bg-[#c91616] text-white"
                      : "text-foreground/80 hover:bg-[#c91616]/15 hover:text-[#ff6b5f]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 grid gap-2 border-t pt-3 sm:flex">
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
                    Dashboard
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
                    Logout
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
                    Sign In
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setOpen(false);
                      navigate("/signup");
                    }}
                  >
                    Sign Up
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
