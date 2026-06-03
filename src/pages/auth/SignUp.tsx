import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/common/Seo";
import { useAuthStore } from "@/store/authStore";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const { signUp, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(form.email, form.password, form.fullName, form.phone);
      if (isSupabaseConfigured) {
        toast.success("Account created! Check your email to verify.");
        navigate("/signin");
      } else {
        toast.success("Account created!");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join BSS to order products and book services"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <Seo title="Sign Up" />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+92 3xx xxxxxxx"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="At least 6 characters"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By signing up you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
