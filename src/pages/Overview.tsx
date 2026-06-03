import { Check } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Icon } from "@/components/common/Icon";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATIONS, CORE_VALUES, INDUSTRIES } from "@/data/content";

const PAGE_HEADER =
  "Company profile, mission, values and the expertise that makes BSS a trusted name in fire safety and security.";

const TEAM = [
  { name: "Operations Team", role: "Certified field engineers & technicians", icon: "workflow" },
  { name: "Monitoring Center", role: "24/7 surveillance & emergency dispatch", icon: "headset" },
  { name: "Consultancy", role: "Security auditors & compliance experts", icon: "clipboard-check" },
];

export default function Overview() {
  return (
    <>
      <Seo title="Overview" path="/overview" description={PAGE_HEADER} />

      <section className="hero-gradient border-b">
        <div className="container py-16 text-center md:py-24">
          <Badge variant="success" className="mb-4">
            About BSS
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            Balochistan Standard Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {PAGE_HEADER}
          </p>
        </div>
      </section>

      {/* Profile / Mission / Vision */}
      <section className="section-y">
        <div className="container grid gap-8 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Icon name="building-2" className="mb-3 size-8 text-primary" />
              <h3 className="text-xl font-semibold">Company Profile</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For over 15 years BSS has delivered enterprise fire safety and
                security solutions to banks, industries, hospitals and
                government organizations across Balochistan and beyond.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Icon name="award" className="mb-3 size-8 text-primary" />
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                To protect lives and assets by delivering reliable,
                standards-compliant fire safety and security systems backed by
                exceptional service.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Icon name="shield-check" className="mb-3 size-8 text-primary" />
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                To be the most trusted security and fire-safety partner in the
                region, setting the standard for safety excellence.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="What drives us" title="Core Values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((v) => (
              <Card key={v.title} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon name={v.icon} className="size-6" />
                  </div>
                  <p className="font-semibold">{v.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Commitment & Expertise */}
      <section className="section-y">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our promise"
              title="Safety Commitment & Security Expertise"
              className="mb-6"
            />
            <ul className="space-y-3">
              {[
                "Compliance with SBP, EN54 and international safety standards",
                "Certified engineers for design, installation and maintenance",
                "Genuine OEM equipment from authorized global partners",
                "24/7 monitoring and rapid emergency response",
                "Detailed documentation and compliance certification",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Accredited"
              title="Certifications"
              className="mb-6"
            />
            <div className="space-y-3">
              {CERTIFICATIONS.map((c) => (
                <Card key={c}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Icon name="badge-check" className="size-5 text-primary" />
                    <span className="text-sm font-medium">{c}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Sectors" title="Industries We Serve" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Card key={ind.id}>
                <CardContent className="flex items-center gap-3 p-5">
                  <Icon name={ind.icon} className="size-6 text-primary" />
                  <span className="font-medium">{ind.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-y">
        <div className="container">
          <SectionHeading eyebrow="Our people" title="Team Information" />
          <div className="grid gap-6 md:grid-cols-3">
            {TEAM.map((m) => (
              <Card key={m.name} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-8">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon name={m.icon} className="size-8" />
                  </div>
                  <p className="text-lg font-semibold">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
