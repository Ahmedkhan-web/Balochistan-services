import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile, UserRole } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthState {
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone?: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
  initialize: () => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
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
        if (!isSupabaseConfigured || !supabase) {
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
          if (!isSupabaseConfigured || !supabase) {
            // Demo mode: admin@ -> admin dashboard, anything else -> customer
            set({
              profile: email.startsWith("admin") ? DEMO_ADMIN : DEMO_PROFILE,
            });
            return;
          }
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
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

      signUp: async (email, password, fullName, phone) => {
        set({ loading: true });
        try {
          if (!isSupabaseConfigured || !supabase) {
            set({
              profile: { ...DEMO_PROFILE, full_name: fullName, email },
            });
            return;
          }
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName, phone } },
          });
          if (error) throw error;
          if (data.user) {
            await supabase.from("profiles").insert({
              id: data.user.id,
              full_name: fullName,
              email,
              phone: phone ?? null,
              role: "customer",
            });
          }
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        if (isSupabaseConfigured && supabase) {
          await supabase.auth.signOut();
        }
        set({ profile: null });
      },

      resetPassword: async (email) => {
        if (isSupabaseConfigured && supabase) {
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
