export const SITE = {
  name: "Balochistan Standard Services",
  shortName: "BSS",
  tagline: "Protecting Lives. Securing Assets. Building Trust.",
  description:
    "Professional Fire Safety and Security Solutions for Banks, Offices, Industries, Commercial Buildings, and Government Organizations.",
  url: import.meta.env.VITE_SITE_URL || "https://bss.example.com",
  email: import.meta.env.VITE_COMPANY_EMAIL || "info@bss.com.pk",
  phone: import.meta.env.VITE_EMERGENCY_PHONE || "+92 300 1234567",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "923001234567",
  address: "Jinnah Road, Quetta, Balochistan, Pakistan",
  mapsEmbed:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    "https://www.google.com/maps?q=Quetta,Balochistan&output=embed",
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello BSS, I would like to request a quote for your fire safety / security solutions.";
