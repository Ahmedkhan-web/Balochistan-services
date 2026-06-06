import { Seo } from "@/components/common/Seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

      <section className="border-b border-white/10 bg-[#07130f] text-white">
        <div className="container grid gap-7 py-10 text-center sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-16 lg:text-left">
          <div>
            <Badge className="border-white/15 bg-white/10 text-white hover:bg-white/10">
              Service Center
            </Badge>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Professional fire safety and security services.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:mt-4 sm:text-base">
              Choose the service you need, view the details, or start a direct
              WhatsApp request with the selected service already included.
            </p>
          </div>
          <div className="grid gap-3 text-left min-[380px]:grid-cols-2 sm:gap-4">
            {[
              { label: "Free survey", value: "On-site" },
              { label: "Support", value: "24/7" },
              { label: "Installations", value: "Certified team" },
              { label: "Compliance", value: "Documented" },
            ].map((item) => (
              <Card key={item.label} className="border-white/10 bg-[#10231d] text-white">
                <CardContent className="p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-wide text-white/60">{item.label}</p>
                  <p className="mt-2 text-xl font-bold sm:text-2xl">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="Select a service and contact BSS directly"
            description="Each card includes the core scope, starting price and a direct WhatsApp service request."
            className="text-white"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y border-t border-white/10 bg-[#07130f] text-white">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="Simple service process"
            description="From first contact to site visit and ongoing maintenance, the service path stays clear."
            className="text-white"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((p) => (
              <Card key={p.step} className="relative overflow-hidden border-white/10 bg-[#10231d] text-white">
                <CardContent className="p-5 sm:p-6">
                  <span className="absolute right-4 top-2 text-4xl font-extrabold text-white/5 sm:text-5xl">
                    {p.step}
                  </span>
                  <Icon name={p.icon} className="mb-3 size-8 text-[#8ed0af]" />
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/58">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-[#0f1b18] text-white">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" className="text-white" />
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
