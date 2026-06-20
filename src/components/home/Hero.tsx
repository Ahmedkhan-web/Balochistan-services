import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/buttonVariants";

const stats = [
  { value: "500+", label: "Installations" },
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Monitoring" },
  { value: "100%", label: "Compliance" },
];

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="container grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-4" /> Enterprise Fire Safety &
            Security
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl">
            Fire safety and security systems for serious facilities.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            BSS supplies, installs and maintains fire protection, CCTV, access control and monitoring systems for commercial and public-sector sites.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className={buttonVariants({ size: "lg" })}>
              Shop Products <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Request Service
            </Link>
            <Link
              to="/contact"
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              <PhoneCall className="size-4" /> Get a Quote
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-bold text-primary">{s.value}</dt>
                <dd className="text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 p-1 shadow-2xl">
            <div className="flex h-full flex-col items-center justify-center gap-6 rounded-[22px] bg-brand-950/30 text-white">
              <ShieldCheck className="size-28 opacity-90" />
              <div className="text-center">
                <p className="text-2xl font-bold">BSS Protected</p>
                <p className="text-sm text-white/70">
                  Fire • CCTV • Access • Alarms
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-xl border bg-background p-4 shadow-lg">
            <p className="text-sm font-semibold">Emergency Response</p>
            <p className="text-xs text-muted-foreground">Average 15 min</p>
          </div>
        </div>
      </div>
    </section>
  );
}
