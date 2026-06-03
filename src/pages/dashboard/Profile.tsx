import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";

export default function Profile() {
  const { profile } = useAuthStore();

  return (
    <div>
      <PageHeader
        title="Profile Settings"
        description="Manage your account details and preferences."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Profile updated");
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={profile?.full_name} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={profile?.email} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={profile?.phone ?? ""} />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Password changed");
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
