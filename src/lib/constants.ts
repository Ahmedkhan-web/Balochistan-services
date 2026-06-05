export const SITE = {
  name: "Balochistan Standard Services",
  shortName: "BSS",
  tagline: "Protecting Lives. Securing Assets. Building Trust.",
  description:
    "Professional Fire Safety and Security Solutions for Banks, Offices, Industries, Commercial Buildings, and Government Organizations.",
  url: import.meta.env.VITE_SITE_URL || "https://bss.example.com",
  email: import.meta.env.VITE_COMPANY_EMAIL || "info@bss.com.pk",
  phone: import.meta.env.VITE_EMERGENCY_PHONE || "0300-8999654",
  secondaryPhone: import.meta.env.VITE_SECONDARY_PHONE || "0370-0120640",
  phoneDisplay:
    import.meta.env.VITE_PHONE_DISPLAY || "0300-8999654 / 0370-0120640",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "923008999654",
  address: "Office No.18, Shezad Plaza, Moti Ram Road, Near Ghazi Cinema, Quetta",
  mapsEmbed:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    "https://www.google.com/maps?q=Shezad%20Plaza%20Moti%20Ram%20Road%20Near%20Ghazi%20Cinema%20Quetta&output=embed",
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello BSS, I would like to request a quote for your fire safety / security solutions.";
