import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/common/Seo";
import { useAuthStore } from "@/store/authStore";

type SignUpStep = "account" | "profile";

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [step, setStep] = useState<SignUpStep>(
    searchParams.get("step") === "profile" ? "profile" : "account",
  );
  const notice = useMemo(
    () => (location.state as { message?: string; email?: string } | null) ?? null,
    [location.state],
  );
  const [account, setAccount] = useState({
    email: notice?.email ?? "",
    password: "",
  });
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    city: "",
    country: "Pakistan",
    company: "",
    facilityType: "",
  });
  const { signUp, completeOnboarding, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signUp(account.email, account.password);
      if (result.requiresEmailConfirmation) {
        toast.success("Account created. Please verify your email, then sign in.");
        navigate("/signin");
        return;
      }
      toast.success("Account created. Finish your profile.");
      setStep("profile");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await completeOnboarding({
        fullName: profile.fullName,
        phone: profile.phone,
        city: profile.city,
        country: profile.country,
        company: profile.company,
        facilityType: profile.facilityType,
      });
      toast.success("Profile completed. Welcome to BSS.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Profile setup failed");
    }
  };

  return (
    <AuthShell
      title={step === "account" ? "Create your account" : "Complete your profile"}
      subtitle={
        step === "account"
          ? "Start with your email, then add only the details BSS needs."
          : "These details help us prepare quotes, orders and service requests faster."
      }
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

      {notice?.message && (
        <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
          {notice.message}
        </div>
      )}

      {step === "account" ? (
        <form className="space-y-4" onSubmit={handleCreateAccount}>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={account.email}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
              placeholder="At least 6 characters"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            <Mail className="size-4" />
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our Terms and Privacy Policy.
          </p>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleProfileSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              required
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                required
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+92 3xx xxxxxxx"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                required
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                placeholder="Quetta"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                required
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="facilityType">Facility type</Label>
              <Input
                id="facilityType"
                value={profile.facilityType}
                onChange={(e) =>
                  setProfile({ ...profile, facilityType: e.target.value })
                }
                placeholder="Office, shop, factory"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">Company or organization</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              placeholder="Optional"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving profile..." : "Continue to Website"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
