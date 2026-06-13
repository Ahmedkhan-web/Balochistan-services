import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Apple, Mail } from "lucide-react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/common/Seo";
import { GoogleMark } from "@/components/common/GoogleMark";
import {
  NotRegisteredError,
  useAuthStore,
  ADMIN_ROLES,
} from "@/store/authStore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithProvider, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      const profile = useAuthStore.getState().profile;
      toast.success("Welcome back!");
      const from = (location.state as { from?: string } | null)?.from;
      if (from) navigate(from);
      else if (profile && ADMIN_ROLES.includes(profile.role))
        navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      if (err instanceof NotRegisteredError) {
        navigate("/signup", {
          state: {
            email,
            message: "Not registered. Please sign up first.",
          },
        });
        return;
      }
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    }
  };

  const handleProvider = async (provider: "google" | "apple") => {
    try {
      await signInWithProvider(provider, "signin");
    } catch (err) {
      if (err instanceof NotRegisteredError) {
        navigate("/signup", {
          state: { message: "Not registered. Please sign up first." },
        });
        return;
      }
      toast.error(err instanceof Error ? err.message : "Social sign in failed");
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your BSS dashboard"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            Sign up
          </Link>
        </>
      }
    >
      <Seo title="Sign In" />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full justify-center"
            onClick={() => handleProvider("google")}
          >
            <GoogleMark className="size-4" /> Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-center"
            onClick={() => handleProvider("apple")}
          >
            <Apple className="size-4" /> Continue with Apple
          </Button>
        </div>

        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          Email
          <span className="h-px flex-1 bg-border" />
        </div>

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
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          <Mail className="size-4" />
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </AuthShell>
  );
}
