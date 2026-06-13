export type UserRole =
  | "customer"
  | "staff"
  | "manager"
  | "admin"
  | "super_admin";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";

export type PaymentMethod =
  | "stripe"
  | "jazzcash"
  | "easypaisa"
  | "bank_transfer"
  | "cod";

export type ServiceRequestStatus =
  | "requested"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type TicketStatus = "open" | "pending" | "resolved" | "closed";

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

export interface Order {
  id: string;
  reference: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  reference: string;
  service_name: string;
  status: ServiceRequestStatus;
  scheduled_at?: string | null;
  address: string;
  notes?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  tax: number;
  total: number;
  status: PaymentStatus;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: "low" | "medium" | "high";
  created_at: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}
