import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/common/Seo";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a strong password for your account"
    >
      <Seo title="Reset Password" />
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
          }
          if (isSupabaseConfigured && supabase) {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) {
              toast.error(error.message);
              return;
            }
          }
          toast.success("Password updated");
          navigate("/signin");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>
    </AuthShell>
  );
}
