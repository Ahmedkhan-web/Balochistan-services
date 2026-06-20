import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07130f] pb-20 text-white sm:pb-0">
      <div className="container grid gap-8 py-10 sm:py-12 lg:grid-cols-[1.3fr_0.7fr_0.9fr] lg:gap-12">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
            {SITE.description}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/overview" className="hover:text-[#bde8c0]">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[#bde8c0]">
                Products
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#bde8c0]">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#bde8c0]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
            Contact
          </h4>
          <div className="space-y-3 text-sm text-white/70">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#8ed0af]" />
              {SITE.address}
            </p>
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className="flex items-start gap-3 hover:text-[#bde8c0]"
            >
              <Phone className="mt-0.5 size-4 shrink-0 text-[#8ed0af]" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-start gap-3 break-all hover:text-[#bde8c0]"
            >
              <Mail className="mt-0.5 size-4 shrink-0 text-[#8ed0af]" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-center text-sm text-white/50 md:flex-row md:text-left">
          <p className="leading-6">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <Link to="/contact" className="font-medium text-white/70 hover:text-[#bde8c0]">
            Request a Quote
          </Link>
        </div>
      </div>
    </footer>
  );
}
