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

type CategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

const CATEGORY_IMAGES: Record<CategoryId, string> = {
  "fire-extinguishers": commonsImage("Fire Extinguisher.JPG"),
  "cctv-cameras": commonsImage("CCTV Security cameras.jpg"),
  recorders: commonsImage("Annke PoE Network Video Recorder (NVR) 2.jpg"),
  "fire-alarm": commonsImage("Smoke detector (1).JPG"),
  "access-control": commonsImage("Turnstile and MagLock Gate.jpg"),
  accessories: commonsImage("Couverture-anti-feu-p1010028.jpg"),
};

function commonsImage(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=900`;
}

const FIRE_TYPES = [
  { code: "co2", label: "CO2", basePrice: 6500 },
  { code: "dcp", label: "DCP", basePrice: 4500 },
  { code: "foam", label: "Foam", basePrice: 5200 },
  { code: "water", label: "Water", basePrice: 3800 },
];
const FIRE_SIZES = ["2 KG", "4 KG", "6 KG", "8 KG", "10 KG", "25 KG", "50 KG"];

function buildFireExtinguishers(): Product[] {
  const products: Product[] = [];
  FIRE_TYPES.forEach((type) => {
    FIRE_SIZES.forEach((size, sizeIndex) => {
      const sizeMultiplier = 1 + sizeIndex * 0.55;
      const price = Math.round((type.basePrice * sizeMultiplier) / 100) * 100;
      const name = `${type.label} Fire Extinguisher - ${size}`;
      const featured = type.code === "dcp" && size === "6 KG";
      products.push({
        id: `fe-${type.code}-${slugify(size)}`,
        name,
        slug: slugify(name),
        category: "fire-extinguishers",
        subcategory: type.label,
        description: `Certified ${type.label} fire extinguisher (${size}) for commercial, industrial and institutional fire safety compliance.`,
        specifications: {
          Type: type.label,
          Capacity: size,
          Standard: "BS EN 3 / PS Certified",
          "Operating Temp": "-20C to +60C",
          Warranty: "1 Year",
          Refillable: "Yes",
        },
        images: [CATEGORY_IMAGES["fire-extinguishers"]],
        price,
        discount_price: featured ? Math.round(price * 0.88) : null,
        rating: 4.5 + (sizeIndex % 3) * 0.1,
        reviews_count: 8 + sizeIndex * 3,
        stock: 25 + sizeIndex,
        featured,
      });
    });
  });
  return products;
}

const CATEGORY_PRODUCT_SEEDS: Record<
  Exclude<CategoryId, "fire-extinguishers">,
  Array<{
    name: string;
    subcategory: string;
    price: number;
    specs: Record<string, string>;
  }>
> = {
  "cctv-cameras": [
    { name: "4MP Dome IP Camera", subcategory: "Dome Camera", price: 12500, specs: { Resolution: "4MP", Lens: "2.8mm", Protection: "IP67" } },
    { name: "5MP Bullet IP Camera", subcategory: "Bullet Camera", price: 15800, specs: { Resolution: "5MP", Lens: "3.6mm", Protection: "IP67" } },
    { name: "2MP PTZ Speed Dome Camera", subcategory: "PTZ Camera", price: 78500, specs: { Resolution: "2MP", Zoom: "25x Optical", Protection: "IP66" } },
    { name: "8MP Varifocal Bullet Camera", subcategory: "Bullet Camera", price: 28500, specs: { Resolution: "8MP", Lens: "2.8-12mm", "Night Vision": "60m IR" } },
    { name: "Color Night Vision Turret Camera", subcategory: "Turret Camera", price: 18200, specs: { Resolution: "5MP", "Night Vision": "Full Color", Audio: "Built-in Mic" } },
  ],
  recorders: [
    { name: "16-Channel 4K NVR", subcategory: "NVR System", price: 42500, specs: { Channels: "16", Resolution: "Up to 8MP", Storage: "2 SATA" } },
    { name: "8-Channel 5MP DVR", subcategory: "DVR System", price: 18900, specs: { Channels: "8", Resolution: "5MP Lite", Storage: "1 SATA" } },
    { name: "32-Channel Enterprise NVR", subcategory: "NVR System", price: 96500, specs: { Channels: "32", Resolution: "4K", Storage: "4 SATA" } },
    { name: "4-Channel Compact DVR", subcategory: "DVR System", price: 12500, specs: { Channels: "4", Resolution: "1080p", "Mobile App": "Yes" } },
    { name: "PoE NVR with 8 Ports", subcategory: "PoE NVR", price: 38500, specs: { Channels: "8", PoE: "Built-in", Compression: "H.265+" } },
  ],
  "fire-alarm": [
    { name: "Photoelectric Smoke Detector", subcategory: "Smoke Detector", price: 3200, specs: { Type: "Photoelectric", Voltage: "15-30V DC", Certification: "UL / EN54" } },
    { name: "8-Zone Fire Alarm Control Panel", subcategory: "Fire Alarm Panel", price: 34500, specs: { Zones: "8", Backup: "24V Battery", Certification: "EN54" } },
    { name: "LED Emergency Exit Light", subcategory: "Emergency Light", price: 2800, specs: { Backup: "3 Hours", Rating: "IP65", Mounting: "Wall / Ceiling" } },
    { name: "Manual Call Point Break Glass", subcategory: "Manual Call Point", price: 1800, specs: { Type: "Conventional", Reset: "Key", Certification: "EN54" } },
    { name: "Addressable Heat Detector", subcategory: "Heat Detector", price: 4200, specs: { Type: "Rate of Rise", Voltage: "Loop Powered", Certification: "EN54" } },
  ],
  "access-control": [
    { name: "Biometric Attendance Machine", subcategory: "Biometric Attendance", price: 21500, specs: { Methods: "Face / Finger / RFID", Capacity: "3000 Users", Connectivity: "TCP/IP" } },
    { name: "Standalone Access Control Reader", subcategory: "Access Control Device", price: 9800, specs: { Methods: "Card / PIN / Finger", Output: "Wiegand", Rating: "IP66" } },
    { name: "Tripod Turnstile Gate", subcategory: "Turnstile System", price: 145000, specs: { Material: "SS304", Throughput: "30 persons/min", Mode: "Bi-directional" } },
    { name: "Magnetic Door Lock 600lbs", subcategory: "Door Lock", price: 6800, specs: { Holding: "600lbs", Voltage: "12/24V", Mounting: "Surface" } },
    { name: "RFID Smart Card Reader", subcategory: "RFID Reader", price: 5600, specs: { Frequency: "125KHz", Output: "Wiegand", Rating: "IP65" } },
  ],
  accessories: [
    { name: "Fire Safety Blanket 1.2m", subcategory: "Fire Safety", price: 1500, specs: { Size: "1.2m x 1.2m", Material: "Fiberglass", Standard: "EN 1869" } },
    { name: "CCTV Junction Box", subcategory: "Camera Accessory", price: 950, specs: { Material: "Aluminum", Rating: "IP66", Mounting: "Wall / Pole" } },
    { name: "Panic Alarm Button", subcategory: "Emergency Accessory", price: 2200, specs: { Type: "Momentary", Output: "NO/NC", Mounting: "Desk / Wall" } },
    { name: "Warning Siren with Strobe", subcategory: "Alarm Accessory", price: 3900, specs: { Output: "110dB", Light: "LED Strobe", Voltage: "12V DC" } },
    { name: "Fire Hose Reel Cabinet", subcategory: "Fire Safety", price: 28500, specs: { Material: "MS Powder Coated", Hose: "30m", Mounting: "Wall" } },
  ],
};

function buildCategoryProducts(category: Exclude<CategoryId, "fire-extinguishers">): Product[] {
  const variants = ["Standard", "Pro", "Plus", "Elite"];
  const seeds = CATEGORY_PRODUCT_SEEDS[category];

  return Array.from({ length: 20 }, (_, index) => {
    const seed = seeds[index % seeds.length];
    const variant = variants[Math.floor(index / seeds.length)];
    const name = `${variant} ${seed.name}`;
    const price = Math.round((seed.price * (1 + index * 0.035)) / 100) * 100;
    const featured = index < 2;

    return {
      id: `${category}-${index + 1}`,
      name,
      slug: slugify(name),
      category,
      subcategory: seed.subcategory,
      description: `${name} supplied by BSS for reliable fire safety, surveillance and security deployments across commercial and industrial sites.`,
      specifications: {
        ...seed.specs,
        Warranty: "1 Year",
        Installation: "Available",
      },
      images: [CATEGORY_IMAGES[category]],
      price,
      discount_price: featured ? Math.round(price * 0.9) : null,
      rating: 4.4 + (index % 5) * 0.1,
      reviews_count: 12 + index * 4,
      stock: 10 + index * 3,
      featured,
    };
  });
}

export const PRODUCTS: Product[] = [
  ...buildFireExtinguishers(),
  ...buildCategoryProducts("cctv-cameras"),
  ...buildCategoryProducts("recorders"),
  ...buildCategoryProducts("fire-alarm"),
  ...buildCategoryProducts("access-control"),
  ...buildCategoryProducts("accessories"),
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return PRODUCTS.filter((product) => product.featured).slice(0, limit);
}

export function getProductsByCategory(category: string, limit = 20): Product[] {
  return PRODUCTS.filter((product) => product.category === category).slice(0, limit);
}
