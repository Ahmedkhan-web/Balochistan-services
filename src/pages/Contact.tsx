import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/common/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_DEFAULT_MESSAGE,
  )}`;

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Contact Balochistan Standard Services for fire safety and security solutions, quotes and emergency support."
      />

      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Reach out for quotes, service requests or emergency support. We
            respond within one business day.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Info + map */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <Phone className="size-5 text-primary" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-muted-foreground">{SITE.phone}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <Mail className="size-5 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-muted-foreground">{SITE.email}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <MapPin className="size-5 text-primary" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {SITE.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-3 p-5">
                  <Clock className="size-5 text-primary" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon–Sat, 9am–8pm • 24/7 Emergency
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 font-semibold text-white transition hover:opacity-90"
            >
              <MessageCircle className="size-5" /> Chat on WhatsApp
            </a>

            <div className="overflow-hidden rounded-xl border">
              <iframe
                title="BSS location"
                src={SITE.mapsEmbed}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Send us a message</h2>
              {submitted ? (
                <div className="mt-6 rounded-lg bg-accent p-6 text-center text-accent-foreground">
                  <p className="font-semibold">Thank you!</p>
                  <p className="mt-1 text-sm">
                    Your message has been sent. We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    toast.success("Message sent successfully");
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="cname">Full Name</Label>
                    <Input id="cname" required placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cemail">Email</Label>
                    <Input
                      id="cemail"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cphone">Phone</Label>
                    <Input id="cphone" placeholder="+92 3xx xxxxxxx" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ctopic">Subject</Label>
                    <Select id="ctopic" defaultValue="quote">
                      <option value="quote">Request a Quote</option>
                      <option value="service">Service Request</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cmsg">Message</Label>
                    <Textarea
                      id="cmsg"
                      required
                      placeholder="How can we help?"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
