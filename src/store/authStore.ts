import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile, UserRole } from "@/types";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export type OAuthProvider = "google" | "apple";

export interface OnboardingDetails {
  fullName: string;
  phone?: string;
  city?: string;
  country?: string;
  company?: string;
  facilityType?: string;
}

interface SignUpResult {
  requiresEmailConfirmation: boolean;
}

interface AuthState {
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    details?: Partial<OnboardingDetails>,
  ) => Promise<SignUpResult>;
  completeOnboarding: (details: OnboardingDetails) => Promise<void>;
  signInWithProvider: (
    provider: OAuthProvider,
    mode: "signin" | "signup",
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
  initialize: () => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
}

export class NotRegisteredError extends Error {
  constructor() {
    super("Not registered. Please sign up first.");
    this.name = "NotRegisteredError";
  }
}

const DEMO_USERS_KEY = "bss-demo-users";

function demoUsers(): Record<string, Profile> {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY) ?? "{}") as Record<
      string,
      Profile
    >;
  } catch {
    return {};
  }
}

function saveDemoUser(profile: Profile) {
  localStorage.setItem(
    DEMO_USERS_KEY,
    JSON.stringify({ ...demoUsers(), [profile.email.toLowerCase()]: profile }),
  );
}

function profileFromDetails(
  email: string,
  details: Partial<OnboardingDetails>,
): Profile {
  return {
    id: `demo-${email.toLowerCase()}`,
    full_name: details.fullName?.trim() || email.split("@")[0],
    email,
    phone: details.phone?.trim() || null,
    city: details.city?.trim() || null,
    country: details.country?.trim() || null,
    company: details.company?.trim() || null,
    facility_type: details.facilityType?.trim() || null,
    role: email.startsWith("admin") ? "super_admin" : "customer",
    avatar_url: null,
    created_at: new Date().toISOString(),
  };
}

/**
 * Demo profile used when Supabase is not configured so the dashboards are
 * still browsable. Real auth is used the moment env vars are provided.
 */
const DEMO_PROFILE: Profile = {
  id: "demo-user",
  full_name: "Demo Customer",
  email: "demo@bss.com.pk",
  phone: "+92 300 0000000",
  city: "Quetta",
  country: "Pakistan",
  company: null,
  facility_type: null,
  role: "customer",
  avatar_url: null,
  created_at: new Date().toISOString(),
};

const DEMO_ADMIN: Profile = {
  ...DEMO_PROFILE,
  id: "demo-admin",
  full_name: "Demo Admin",
  email: "admin@bss.com.pk",
  role: "super_admin",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      loading: false,
      initialized: false,

      setProfile: (profile) => set({ profile }),

      initialize: async () => {
        if (!isSupabaseConfigured) {
          set({ initialized: true });
          return;
        }
        const supabase = await getSupabaseClient();
        if (!supabase) {
          set({ initialized: true });
          return;
        }
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
          if (profile) set({ profile: profile as Profile });
        }
        set({ initialized: true });
      },

      signIn: async (email, password) => {
        set({ loading: true });
        try {
          const supabase = await getSupabaseClient();
          if (!supabase) {
            const normalizedEmail = email.trim().toLowerCase();
            const users = demoUsers();
            const profile = normalizedEmail.startsWith("admin")
              ? DEMO_ADMIN
              : users[normalizedEmail];

            if (!profile) {
              throw new NotRegisteredError();
            }

            set({ profile });
            return;
          }
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            if (error.message.toLowerCase().includes("invalid login")) {
              throw new NotRegisteredError();
            }
            throw error;
          }
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();
          set({ profile: profile as Profile });
        } finally {
          set({ loading: false });
        }
      },

      signUp: async (email, password, details = {}) => {
        set({ loading: true });
        try {
          const supabase = await getSupabaseClient();
          if (!supabase) {
            const profile = profileFromDetails(email.trim().toLowerCase(), details);
            saveDemoUser(profile);
            set({ profile });
            return { requiresEmailConfirmation: false };
          }
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: details.fullName,
                phone: details.phone,
                city: details.city,
                country: details.country,
                company: details.company,
                facility_type: details.facilityType,
              },
            },
          });
          if (error) throw error;
          if (data.user && data.session) {
            const profile = profileFromDetails(email, details);
            const { data: savedProfile } = await supabase
              .from("profiles")
              .upsert({
                id: data.user.id,
                full_name: profile.full_name,
                email,
                phone: profile.phone,
                city: profile.city,
                country: profile.country,
                company: profile.company,
                facility_type: profile.facility_type,
                role: "customer",
              })
              .select("*")
              .single();
            if (savedProfile) set({ profile: savedProfile as Profile });
          }

          return { requiresEmailConfirmation: !data.session };
        } finally {
          set({ loading: false });
        }
      },

      completeOnboarding: async (details) => {
        set({ loading: true });
        try {
          const currentProfile = get().profile;
          const supabase = await getSupabaseClient();

          if (!currentProfile && supabase) {
            const { data } = await supabase.auth.getUser();
            if (!data.user) throw new Error("Please sign in again to finish setup.");

            const { data: profile } = await supabase
              .from("profiles")
              .upsert({
                id: data.user.id,
                full_name: details.fullName,
                email: data.user.email ?? "",
                phone: details.phone ?? null,
                city: details.city ?? null,
                country: details.country ?? null,
                company: details.company ?? null,
                facility_type: details.facilityType ?? null,
                role: "customer",
              })
              .select("*")
              .single();
            if (profile) set({ profile: profile as Profile });
            return;
          }

          if (!currentProfile) throw new Error("Create your account first.");

          const nextProfile: Profile = {
            ...currentProfile,
            full_name: details.fullName,
            phone: details.phone || null,
            city: details.city || null,
            country: details.country || null,
            company: details.company || null,
            facility_type: details.facilityType || null,
          };

          if (!supabase) {
            saveDemoUser(nextProfile);
            set({ profile: nextProfile });
            return;
          }

          const { data, error } = await supabase
            .from("profiles")
            .update({
              full_name: nextProfile.full_name,
              phone: nextProfile.phone,
              city: nextProfile.city,
              country: nextProfile.country,
              company: nextProfile.company,
              facility_type: nextProfile.facility_type,
            })
            .eq("id", nextProfile.id)
            .select("*")
            .single();
          if (error) throw error;
          if (data) set({ profile: data as Profile });
        } finally {
          set({ loading: false });
        }
      },

      signInWithProvider: async (provider, mode) => {
        const supabase = await getSupabaseClient();
        if (!supabase) {
          throw mode === "signin"
            ? new NotRegisteredError()
            : new Error("Social sign up needs Supabase OAuth configuration.");
        }

        const redirectPath = mode === "signup" ? "/signup?step=profile" : "/dashboard";
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}${redirectPath}`,
          },
        });
        if (error) throw error;
      },

      signOut: async () => {
        const supabase = await getSupabaseClient();
        if (supabase) {
          await supabase.auth.signOut();
        }
        set({ profile: null });
      },

      resetPassword: async (email) => {
        const supabase = await getSupabaseClient();
        if (supabase) {
          await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });
        }
      },

      hasRole: (...roles) => {
        const role = get().profile?.role;
        return role ? roles.includes(role) : false;
      },
    }),
    {
      name: "bss-auth",
      partialize: (state) => ({ profile: state.profile }),
    },
  ),
);

export const ADMIN_ROLES: UserRole[] = [
  "staff",
  "manager",
  "admin",
  "super_admin",
];
