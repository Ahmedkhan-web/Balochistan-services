import { useState } from "react";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { MOCK_NOTIFICATIONS } from "@/data/dashboard";

export default function Notifications() {
  const [items, setItems] = useState(MOCK_NOTIFICATIONS);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Order, service and maintenance updates."
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setItems((prev) => prev.map((n) => ({ ...n, read: true })))
            }
          >
            Mark all as read
          </Button>
        }
      />
      <div className="space-y-3">
        {items.map((n) => (
          <Card key={n.id} className={cn(!n.read && "border-primary/40")}>
            <CardContent className="flex items-start gap-4 p-4">
              <div
                className={cn(
                  "mt-0.5 flex size-9 items-center justify-center rounded-full",
                  n.read ? "bg-muted" : "bg-accent text-accent-foreground",
                )}
              >
                <Bell className="size-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{n.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(n.created_at)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{n.message}</p>
              </div>
              {!n.read && (
                <span className="mt-1 size-2 rounded-full bg-primary" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
