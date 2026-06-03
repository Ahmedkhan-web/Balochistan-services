import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/common/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t bg-muted/40">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">{SITE.description}</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> {SITE.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> {SITE.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> {SITE.email}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">Security Products</Link></li>
            <li><Link to="/services" className="hover:text-primary">Security Services</Link></li>
            <li><Link to="/overview" className="hover:text-primary">Overview</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/overview" className="hover:text-primary">About BSS</Link></li>
            <li><Link to="/signup" className="hover:text-primary">Create Account</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Customer Portal</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Get a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">{t("footer.newsletter")}</h4>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Subscribed! Thank you for joining our newsletter.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" size="icon" aria-label="Subscribe">
              <Send className="size-4" />
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            Fire safety tips, product updates and offers — no spam.
          </p>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-primary">Privacy</Link>
            <Link to="/contact" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
