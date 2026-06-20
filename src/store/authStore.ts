import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile, UserRole } from "@/types";
import {
  getSupabaseClient,
  isSupabaseConfigured,
  requireSupabase,
} from "@/lib/supabase";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      loading: false,
      initialized: false,

      setProfile: (profile) => set({ profile }),

      initialize: async () => {
        if (!isSupabaseConfigured) {
          set({ profile: null, initialized: true });
          return;
        }

        try {
          const supabase = await getSupabaseClient();
          if (!supabase) {
            set({ profile: null, initialized: true });
            return;
          }
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            const profile = await loadOrCreateProfile(
              supabase,
              data.session.user.id,
              data.session.user.email ?? "",
              data.session.user.user_metadata?.full_name,
            );
            set({ profile });
          } else {
            set({ profile: null });
          }
        } catch {
          set({ profile: null });
        } finally {
          set({ initialized: true });
        }
      },

      signIn: async (email, password) => {
        set({ loading: true });
        try {
          const supabase = await requireSupabase();
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
          const profile = await loadOrCreateProfile(
            supabase,
            data.user.id,
            data.user.email ?? email,
            data.user.user_metadata?.full_name,
          );
          set({ profile });
        } finally {
          set({ loading: false });
        }
      },

      signUp: async (email, password, details = {}) => {
        set({ loading: true });
        try {
          const supabase = await requireSupabase();
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
            const { data: savedProfile } = await supabase
              .from("profiles")
              .upsert({
                id: data.user.id,
                full_name: details.fullName?.trim() || email.split("@")[0],
                email: email.trim().toLowerCase(),
                phone: details.phone?.trim() || null,
                city: details.city?.trim() || null,
                country: details.country?.trim() || null,
                company: details.company?.trim() || null,
                facility_type: details.facilityType?.trim() || null,
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
          const supabase = await requireSupabase();

          if (!currentProfile) {
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
              })
              .select("*")
              .single();
            if (profile) set({ profile: profile as Profile });
            return;
          }

          const nextProfile: Profile = {
            ...currentProfile,
            full_name: details.fullName,
            phone: details.phone || null,
            city: details.city || null,
            country: details.country || null,
            company: details.company || null,
            facility_type: details.facilityType || null,
          };

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
        const supabase = await requireSupabase();
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
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

export const ADMIN_ROLES: UserRole[] = ["admin"];

async function loadOrCreateProfile(
  supabase: Awaited<ReturnType<typeof requireSupabase>>,
  userId: string,
  email: string,
  fullName?: unknown,
) {
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (existingProfile) {
    return existingProfile as Profile;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const fallbackName =
    typeof fullName === "string" && fullName.trim()
      ? fullName.trim()
      : normalizedEmail.split("@")[0] || "BSS Customer";

  const { data: createdProfile, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      full_name: fallbackName,
      email: normalizedEmail,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return createdProfile as Profile;
}
