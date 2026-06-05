import { PRODUCTS } from "@/data/products";

export const HERO_OVERVIEW_IMAGE = "/assets/images/hero-overview.png";

const STATIC_IMAGE_ASSETS = [
  "/assets/images/bss-logo.png",
  HERO_OVERVIEW_IMAGE,
  "/assets/images/feature-fire.jpg",
  "/assets/images/category-access-control.jpg",
  "/assets/images/category-accessories.jpg",
  "/assets/images/category-cctv.jpg",
  "/assets/images/category-fire-alarm.jpg",
  "/assets/images/category-fire-extinguishers.jpg",
  "/assets/images/category-nvr.jpg",
  "/assets/images/project-bank-security.jpg",
  "/assets/images/project-data-center-security.jpg",
  "/assets/images/project-factory-fire-system.jpg",
  "/assets/images/project-government-building.jpg",
  "/assets/images/project-hospital-fire-safety.jpg",
  "/assets/images/project-hotel-security.jpg",
  "/assets/images/project-industrial-surveillance.jpg",
  "/assets/images/project-mall-safety-system.jpg",
  "/assets/images/project-office-security.jpg",
  "/assets/images/project-parking-access-control.jpg",
  "/assets/images/project-school-safety-system.jpg",
  "/assets/images/section-access-control.jpg",
  "/assets/images/section-cctv-control-room.jpg",
  "/assets/images/section-fire-alarm-installation.jpg",
  "/assets/images/section-fire-installation.jpg",
  "/assets/images/section-maintenance-engineer.jpg",
  "/assets/images/section-warehouse-security.jpg",
];

export const SITE_PRELOAD_IMAGES = Array.from(
  new Set([...STATIC_IMAGE_ASSETS, ...PRODUCTS.flatMap((product) => product.images)]),
);
