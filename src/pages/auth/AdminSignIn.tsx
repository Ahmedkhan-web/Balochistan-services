import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/common/Seo";
import { ADMIN_ROLES, NotRegisteredError, useAuthStore } from "@/store/authStore";
import { ADMIN_BASE_PATH } from "@/lib/adminRoute";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signOut, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signIn(email, password);
      const profile = useAuthStore.getState().profile;

      if (!profile || !ADMIN_ROLES.includes(profile.role)) {
        await signOut();
        toast.error("This account does not have admin access.");
        return;
      }

      toast.success("Admin access confirmed");
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from?.startsWith(ADMIN_BASE_PATH) ? from : ADMIN_BASE_PATH);
    } catch (err) {
      if (err instanceof NotRegisteredError) {
        toast.error("Admin account not found.");
        return;
      }

      toast.error(err instanceof Error ? err.message : "Admin sign in failed");
    }
  };

  return (
    <AuthShell
      title="Admin sign in"
      subtitle="Restricted access for BSS administrators"
    >
      <Seo title="Admin Sign In" />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="admin-email">Admin email</Label>
          <Input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter admin email"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          <LockKeyhole className="size-4" />
          {loading ? "Checking access..." : "Enter Admin Dashboard"}
        </Button>
      </form>
    </AuthShell>
  );
}
