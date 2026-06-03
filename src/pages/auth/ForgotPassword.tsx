import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/common/Seo";
import { useAuthStore } from "@/store/authStore";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuthStore();

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a secure reset link"
      footer={
        <Link to="/signin" className="font-semibold text-primary">
          ← Back to sign in
        </Link>
      }
    >
      <Seo title="Forgot Password" />
      {sent ? (
        <div className="rounded-lg bg-accent p-6 text-center text-accent-foreground">
          <MailCheck className="mx-auto mb-2 size-8 text-primary" />
          <p className="font-semibold">Check your inbox</p>
          <p className="mt-1 text-sm">
            If an account exists for {email}, you'll receive a reset link
            shortly.
          </p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await resetPassword(email);
            setSent(true);
            toast.success("Reset link sent");
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
