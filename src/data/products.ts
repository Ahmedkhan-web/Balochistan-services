import type { Product } from "@/types";
import { slugify } from "@/lib/utils";

export const PRODUCT_CATEGORIES = [
  { id: "fire-extinguishers", name: "Fire Extinguishers", icon: "flame" },
  { id: "cctv-cameras", name: "CCTV Cameras", icon: "cctv" },
  { id: "recorders", name: "DVR / NVR Systems", icon: "hard-drive" },
  { id: "fire-alarm", name: "Fire Alarm & Detection", icon: "bell-ring" },
  { id: "access-control", name: "Access Control", icon: "fingerprint" },
  { id: "accessories", name: "Security Accessories", icon: "shield" },
] as const;

const FIRE_TYPES = [
  { code: "co2", label: "CO₂", basePrice: 6500 },
  { code: "dcp", label: "DCP", basePrice: 4500 },
  { code: "foam", label: "Foam", basePrice: 5200 },
  { code: "water", label: "Water", basePrice: 3800 },
];
const FIRE_SIZES = ["2 KG", "4 KG", "6 KG", "8 KG", "10 KG", "25 KG", "50 KG"];

function buildFireExtinguishers(): Product[] {
  const products: Product[] = [];
  FIRE_TYPES.forEach((type) => {
    FIRE_SIZES.forEach((size, sizeIdx) => {
      const sizeMultiplier = 1 + sizeIdx * 0.55;
      const price = Math.round((type.basePrice * sizeMultiplier) / 100) * 100;
      const name = `${type.label} Fire Extinguisher — ${size}`;
      const featured = type.code === "dcp" && size === "6 KG";
      products.push({
        id: `fe-${type.code}-${slugify(size)}`,
        name,
        slug: slugify(name),
        category: "fire-extinguishers",
        subcategory: type.label,
        description: `Certified ${type.label} fire extinguisher (${size}) suitable for commercial, industrial and institutional fire safety compliance. Refillable with pressure gauge and wall bracket included.`,
        specifications: {
          Type: type.label,
          Capacity: size,
          Standard: "BS EN 3 / PS Certified",
          "Operating Temp": "-20°C to +60°C",
          Warranty: "1 Year",
          Refillable: "Yes",
        },
        images: [],
        price,
        discount_price: featured ? Math.round(price * 0.88) : null,
        rating: 4.5 + (sizeIdx % 3) * 0.1,
        reviews_count: 8 + sizeIdx * 3,
        stock: 25 + sizeIdx,
        featured,
      });
    });
  });
  return products;
}

const OTHER_PRODUCTS: Product[] = [
  {
    id: "cam-dome-4mp",
    name: "4MP Dome IP Camera",
    slug: "4mp-dome-ip-camera",
    category: "cctv-cameras",
    subcategory: "Dome Camera",
    description:
      "Indoor 4MP dome IP camera with IR night vision up to 30m, H.265+ compression and PoE support. Ideal for banks, offices and retail.",
    specifications: {
      Resolution: "4MP (2560×1440)",
      "Night Vision": "30m IR",
      Lens: "2.8mm Fixed",
      Power: "PoE / 12V DC",
      Protection: "IP67",
    },
    images: [],
    price: 12500,
    discount_price: 10999,
    rating: 4.7,
    reviews_count: 42,
    stock: 60,
    featured: true,
  },
  {
    id: "cam-bullet-5mp",
    name: "5MP Bullet IP Camera",
    slug: "5mp-bullet-ip-camera",
    category: "cctv-cameras",
    subcategory: "Bullet Camera",
    description:
      "Weatherproof 5MP bullet camera with colour night vision, motion detection and 40m IR range for outdoor perimeter security.",
    specifications: {
      Resolution: "5MP",
      "Night Vision": "40m IR / ColorVu",
      Lens: "3.6mm",
      Power: "PoE",
      Protection: "IP67",
    },
    images: [],
    price: 15800,
    discount_price: null,
    rating: 4.6,
    reviews_count: 31,
    stock: 45,
    featured: true,
  },
  {
    id: "cam-ptz-2mp",
    name: "2MP PTZ Speed Dome Camera",
    slug: "2mp-ptz-speed-dome",
    category: "cctv-cameras",
    subcategory: "PTZ Camera",
    description:
      "25× optical zoom PTZ camera with 360° pan, auto-tracking and 150m IR. Built for large facilities and parking areas.",
    specifications: {
      Resolution: "2MP",
      Zoom: "25× Optical",
      Pan: "360° Endless",
      "Night Vision": "150m IR",
      Protection: "IP66",
    },
    images: [],
    price: 78500,
    discount_price: 71999,
    rating: 4.8,
    reviews_count: 17,
    stock: 12,
    featured: false,
  },
  {
    id: "nvr-16ch",
    name: "16-Channel 4K NVR",
    slug: "16-channel-4k-nvr",
    category: "recorders",
    subcategory: "NVR System",
    description:
      "16-channel 4K network video recorder with 2 SATA bays, smart H.265+ and AI event search. Records up to 8MP per channel.",
    specifications: {
      Channels: "16",
      Resolution: "Up to 8MP",
      Storage: "2× SATA (up to 20TB)",
      Compression: "H.265+",
      Network: "Gigabit",
    },
    images: [],
    price: 42500,
    discount_price: null,
    rating: 4.7,
    reviews_count: 22,
    stock: 18,
    featured: false,
  },
  {
    id: "dvr-8ch",
    name: "8-Channel 5MP DVR",
    slug: "8-channel-5mp-dvr",
    category: "recorders",
    subcategory: "DVR System",
    description:
      "Penta-brid 8-channel DVR supporting HDCVI/AHD/TVI/CVBS/IP cameras with 5MP recording and mobile remote view.",
    specifications: {
      Channels: "8",
      Resolution: "5MP Lite",
      Inputs: "Penta-brid",
      Storage: "1× SATA",
      "Mobile App": "Yes",
    },
    images: [],
    price: 18900,
    discount_price: 16900,
    rating: 4.5,
    reviews_count: 28,
    stock: 30,
    featured: false,
  },
  {
    id: "smoke-detector",
    name: "Photoelectric Smoke Detector",
    slug: "photoelectric-smoke-detector",
    category: "fire-alarm",
    subcategory: "Smoke Detector",
    description:
      "Addressable photoelectric smoke detector with low-profile design, LED status indicator and self-diagnostics.",
    specifications: {
      Type: "Photoelectric Addressable",
      Voltage: "15–30V DC",
      Coverage: "Up to 60 m²",
      Certification: "UL / EN54",
    },
    images: [],
    price: 3200,
    discount_price: null,
    rating: 4.6,
    reviews_count: 51,
    stock: 120,
    featured: true,
  },
  {
    id: "fire-alarm-panel",
    name: "8-Zone Fire Alarm Control Panel",
    slug: "8-zone-fire-alarm-panel",
    category: "fire-alarm",
    subcategory: "Fire Alarm Panel",
    description:
      "Conventional 8-zone fire alarm control panel with battery backup, fault monitoring and sounder circuits for commercial buildings.",
    specifications: {
      Zones: "8",
      Backup: "24V Battery",
      Outputs: "2 Sounder Circuits",
      Certification: "EN54-2 / EN54-4",
    },
    images: [],
    price: 34500,
    discount_price: 31000,
    rating: 4.7,
    reviews_count: 14,
    stock: 16,
    featured: false,
  },
  {
    id: "emergency-light",
    name: "LED Emergency Exit Light",
    slug: "led-emergency-exit-light",
    category: "fire-alarm",
    subcategory: "Emergency Light",
    description:
      "Maintained LED emergency exit light with 3-hour battery backup and IP65 rating for corridors and stairwells.",
    specifications: {
      Backup: "3 Hours",
      Battery: "Ni-Cd Rechargeable",
      Rating: "IP65",
      Mounting: "Wall / Ceiling",
    },
    images: [],
    price: 2800,
    discount_price: null,
    rating: 4.4,
    reviews_count: 37,
    stock: 90,
    featured: false,
  },
  {
    id: "biometric-machine",
    name: "Biometric Attendance Machine",
    slug: "biometric-attendance-machine",
    category: "access-control",
    subcategory: "Biometric Attendance",
    description:
      "Fingerprint + RFID + face recognition attendance terminal with TCP/IP, cloud sync and payroll-ready reports.",
    specifications: {
      Identification: "Face / Finger / RFID",
      Capacity: "3000 Users",
      Connectivity: "TCP/IP, USB",
      Display: "2.8\" Color",
    },
    images: [],
    price: 21500,
    discount_price: 18999,
    rating: 4.6,
    reviews_count: 26,
    stock: 22,
    featured: true,
  },
  {
    id: "access-control-device",
    name: "Standalone Access Control Reader",
    slug: "standalone-access-control-reader",
    category: "access-control",
    subcategory: "Access Control Device",
    description:
      "Weatherproof access control reader supporting card + PIN + fingerprint, Wiegand output and door lock relay.",
    specifications: {
      Methods: "Card / PIN / Finger",
      Output: "Wiegand 26/34",
      Rating: "IP66",
      Relay: "Built-in",
    },
    images: [],
    price: 9800,
    discount_price: null,
    rating: 4.5,
    reviews_count: 19,
    stock: 34,
    featured: false,
  },
  {
    id: "turnstile",
    name: "Tripod Turnstile Gate",
    slug: "tripod-turnstile-gate",
    category: "access-control",
    subcategory: "Turnstile System",
    description:
      "Bi-directional tripod turnstile with stainless steel housing, access control integration and anti-panic drop arm.",
    specifications: {
      Material: "SS304",
      Throughput: "30 persons/min",
      Integration: "Access Control / RFID",
      Mode: "Bi-directional",
    },
    images: [],
    price: 145000,
    discount_price: 132000,
    rating: 4.7,
    reviews_count: 8,
    stock: 6,
    featured: false,
  },
  {
    id: "fire-blanket",
    name: "Fire Safety Blanket (1.2m × 1.2m)",
    slug: "fire-safety-blanket",
    category: "accessories",
    subcategory: "Security Accessory",
    description:
      "Fiberglass fire blanket for kitchens and labs, smothers small fires and meets EN 1869 standard.",
    specifications: {
      Size: "1.2m × 1.2m",
      Material: "Fiberglass",
      Standard: "EN 1869",
      Mounting: "Quick-release pouch",
    },
    images: [],
    price: 1500,
    discount_price: null,
    rating: 4.3,
    reviews_count: 44,
    stock: 150,
    featured: false,
  },
];

export const PRODUCTS: Product[] = [
  ...buildFireExtinguishers(),
  ...OTHER_PRODUCTS,
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}
