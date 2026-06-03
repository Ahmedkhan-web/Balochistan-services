import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { TESTIMONIALS, PARTNERS } from "@/data/content";
import { SITE } from "@/lib/constants";

export default function ContentManagement() {
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Saved successfully");
  };

  return (
    <div>
      <PageHeader
        title="CMS & Website Settings"
        description="Manage banners, content, testimonials and global settings."
      />
      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">Website Settings</TabsTrigger>
          <TabsTrigger value="banner">Banner</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6">
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={save}>
                <div className="space-y-1.5">
                  <Label htmlFor="cname">Company Name</Label>
                  <Input id="cname" defaultValue={SITE.name} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cemail">Contact Email</Label>
                  <Input id="cemail" defaultValue={SITE.email} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cphone">Phone</Label>
                  <Input id="cphone" defaultValue={SITE.phone} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cwa">WhatsApp Number</Label>
                  <Input id="cwa" defaultValue={SITE.whatsapp} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="caddr">Address</Label>
                  <Input id="caddr" defaultValue={SITE.address} />
                </div>
                <Button type="submit">Save Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banner">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={save}>
                <div className="space-y-1.5">
                  <Label htmlFor="bhead">Hero Headline</Label>
                  <Input
                    id="bhead"
                    defaultValue="Protecting Lives. Securing Assets. Building Trust."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bsub">Hero Subheadline</Label>
                  <Textarea
                    id="bsub"
                    defaultValue="Professional Fire Safety and Security Solutions for Banks, Offices, Industries, Commercial Buildings, and Government Organizations."
                  />
                </div>
                <Button type="submit">Update Banner</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Table>
            <THead>
              <TR>
                <TH>Name</TH>
                <TH>Company</TH>
                <TH>Rating</TH>
              </TR>
            </THead>
            <TBody>
              {TESTIMONIALS.map((t) => (
                <TR key={t.id}>
                  <TD className="font-medium">{t.name}</TD>
                  <TD className="text-muted-foreground">{t.company}</TD>
                  <TD>{t.rating} / 5</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </TabsContent>

        <TabsContent value="partners">
          <div className="flex flex-wrap gap-3">
            {PARTNERS.map((p) => (
              <span
                key={p.id}
                className="rounded-lg border px-4 py-2 font-semibold text-muted-foreground"
              >
                {p.logo}
              </span>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
