import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SUPPORTED_LANGUAGES } from "@/i18n";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const next =
    SUPPORTED_LANGUAGES.find((l) => l.code !== i18n.language) ??
    SUPPORTED_LANGUAGES[0];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(next.code)}
      aria-label="Switch language"
      className="gap-1.5"
    >
      <Languages className="size-4" />
      <span className="text-xs font-semibold">{next.label}</span>
    </Button>
  );
}
