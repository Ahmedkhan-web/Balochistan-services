import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/uiStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
