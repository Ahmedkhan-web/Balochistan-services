export type UserRole = "customer" | "admin";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  company?: string | null;
  facility_type?: string | null;
  role: UserRole;
  avatar_url?: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  price: number;
  discount_price?: number | null;
  rating: number;
  reviews_count: number;
  stock: number;
  featured?: boolean;
  reviews?: ProductReview[];
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  starting_price?: number;
  features: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  year: number;
  summary: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}
