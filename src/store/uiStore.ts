import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  applyTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        get().applyTheme();
      },
      toggleTheme: () => {
        set({ theme: get().theme === "light" ? "dark" : "light" });
        get().applyTheme();
      },
      applyTheme: () => {
        const root = document.documentElement;
        if (get().theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
      },
    }),
    { name: "bss-ui" },
  ),
);
