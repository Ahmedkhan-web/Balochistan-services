import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/common/Icon";
import { SERVICES } from "@/data/services";
import { FAQS } from "@/data/content";

const PROCESS = [
  { step: "01", title: "Request & Survey", description: "Submit a request and we conduct a free on-site survey.", icon: "clipboard-check" },
  { step: "02", title: "Proposal & Quote", description: "Receive a tailored solution design with transparent pricing.", icon: "scale" },
  { step: "03", title: "Installation", description: "Certified engineers install and configure your system.", icon: "workflow" },
  { step: "04", title: "Support & AMC", description: "Ongoing maintenance, monitoring and priority support.", icon: "headset" },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Security Services"
        path="/services"
        description="Fire extinguisher refilling, CCTV & fire alarm installation, bank security solutions, AMC, audits and inspections."
      />

      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Security Services
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            End-to-end fire safety and security services with online booking,
            instant quotes, service tracking and maintenance scheduling.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="Our Process" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <Card key={p.step} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <span className="absolute right-4 top-2 text-5xl font-extrabold text-muted/40">
                    {p.step}
                  </span>
                  <Icon name={p.icon} className="mb-3 size-8 text-primary" />
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <Accordion>
            {FAQS.map((f) => (
              <AccordionItem key={f.q} question={f.q}>
                {f.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
