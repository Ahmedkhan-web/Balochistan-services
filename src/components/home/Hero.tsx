import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button";

const stats = [
  { value: "500+", label: "Installations" },
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Monitoring" },
  { value: "100%", label: "Compliance" },
];

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="container grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-4" /> Enterprise Fire Safety &
            Security
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl">
            {t("hero.headline")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {t("hero.subheadline")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className={buttonVariants({ size: "lg" })}>
              {t("hero.shop")} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              {t("hero.request")}
            </Link>
            <Link
              to="/contact"
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              <PhoneCall className="size-4" /> {t("hero.quote")}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
