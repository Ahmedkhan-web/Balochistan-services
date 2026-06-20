import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "fire-refilling",
    name: "Fire Extinguisher Refilling",
    slug: "fire-extinguisher-refilling",
    short_description:
      "Certified refilling and pressure testing for all extinguisher types.",
    description:
      "On-site and workshop refilling of CO₂, DCP, foam and water extinguishers with hydrostatic pressure testing, recharge and certification tagging.",
    icon: "flame",
    starting_price: 800,
    features: [
      "All extinguisher types",
      "Hydrostatic testing",
      "Pickup & delivery",
      "Compliance certificate",
    ],
    featured: true,
  },
  {
    id: "cctv-installation",
    name: "CCTV Installation",
    slug: "cctv-installation",
    short_description:
      "End-to-end CCTV survey, supply, installation and configuration.",
    description:
      "Professional CCTV system design and installation including site survey, cabling, camera mounting, NVR/DVR configuration and remote mobile access setup.",
    icon: "cctv",
    starting_price: 5000,
    features: [
      "Free site survey",
      "IP & HD systems",
      "Remote mobile view",
      "1-year warranty",
    ],
    featured: true,
  },
  {
    id: "fire-alarm-installation",
    name: "Fire Alarm Installation",
    slug: "fire-alarm-installation",
    short_description:
      "Addressable & conventional fire alarm system installation.",
    description:
      "Design and installation of EN54-compliant fire alarm systems with control panels, detectors, sounders and integration with building management systems.",
    icon: "bell-ring",
    starting_price: 15000,
    features: [
      "EN54 compliant",
      "Addressable systems",
      "BMS integration",
      "AMC available",
    ],
    featured: true,
  },
  {
    id: "smoke-detector-installation",
    name: "Smoke Detector Installation",
    slug: "smoke-detector-installation",
    short_description: "Supply and installation of smoke & heat detectors.",
    description:
      "Coverage assessment and installation of photoelectric and heat detectors across offices, server rooms and residential complexes.",
    icon: "siren",
    starting_price: 1200,
    features: ["Coverage assessment", "Photoelectric & heat", "Testing"],
  },
  {
    id: "security-system-installation",
    name: "Security System Installation",
    slug: "security-system-installation",
    short_description:
      "Integrated access control, alarms and intrusion detection.",
    description:
      "Complete integrated security solutions combining access control, intrusion alarms, video surveillance and central monitoring.",
    icon: "shield-check",
    starting_price: 25000,
    features: [
      "Access control",
      "Intrusion alarms",
      "Central monitoring",
      "Integration",
    ],
  },
  {
    id: "bank-security",
    name: "Complete Bank Security Solutions",
    slug: "complete-bank-security-solutions",
    short_description:
      "Turnkey security compliance for banks and financial institutions.",
    description:
      "SBP-compliant turnkey bank security: vault & ATM surveillance, panic alarms, access control, fire safety and 24/7 monitoring.",
    icon: "landmark",
    starting_price: 150000,
    features: [
      "SBP compliance",
      "Vault & ATM coverage",
      "Panic alarms",
      "24/7 monitoring",
    ],
    featured: true,
  },
  {
    id: "amc",
    name: "Annual Maintenance Contracts",
    slug: "annual-maintenance-contracts",
    short_description: "Scheduled preventive maintenance and priority support.",
    description:
      "Comprehensive AMC packages with scheduled inspections, preventive maintenance, priority response and discounted parts for all installed systems.",
    icon: "calendar-check",
    starting_price: 30000,
    features: [
      "Scheduled visits",
      "Priority response",
      "Discounted parts",
      "Compliance reports",
    ],
  },
  {
    id: "security-audits",
    name: "Security Audits",
    slug: "security-audits",
    short_description:
      "Comprehensive physical security risk assessments.",
    description:
      "Independent security audits evaluating physical access, surveillance coverage, fire readiness and providing a prioritized remediation roadmap.",
    icon: "clipboard-check",
    starting_price: 20000,
    features: ["Risk assessment", "Gap analysis", "Remediation roadmap"],
  },
  {
    id: "fire-inspections",
    name: "Fire Safety Inspections",
    slug: "fire-safety-inspections",
    short_description: "Certified fire safety inspections & compliance reports.",
    description:
      "Detailed fire safety inspections covering extinguishers, alarms, exits and signage with certified compliance documentation.",
    icon: "search-check",
    starting_price: 10000,
    features: ["Certified inspectors", "Compliance report", "Action plan"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getFeaturedServices(limit = 6): Service[] {
  return SERVICES.filter((s) => s.featured).slice(0, limit);
}
