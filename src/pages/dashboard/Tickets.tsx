import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MOCK_TICKETS } from "@/data/dashboard";
import { formatDate } from "@/lib/utils";

export default function Tickets() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Support Tickets"
        description="Raise and track support requests."
        action={
          <Button onClick={() => setOpen((o) => !o)}>
            {open ? "Close" : "New Ticket"}
          </Button>
        }
      />

      {open && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
                toast.success("Ticket submitted");
              }}
            >
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" required />
              </div>
              <Button type="submit">Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Table>
        <THead>
          <TR>
            <TH>Subject</TH>
            <TH>Priority</TH>
            <TH>Created</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          {MOCK_TICKETS.map((t) => (
            <TR key={t.id}>
              <TD className="font-medium">{t.subject}</TD>
              <TD>
                <Badge
                  variant={
                    t.priority === "high"
                      ? "destructive"
                      : t.priority === "medium"
                        ? "warning"
                        : "secondary"
                  }
                  className="capitalize"
                >
                  {t.priority}
                </Badge>
              </TD>
              <TD className="text-muted-foreground">
                {formatDate(t.created_at)}
              </TD>
              <TD>
                <StatusBadge status={t.status} />
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
