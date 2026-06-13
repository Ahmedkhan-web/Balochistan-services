/**
 * Supabase database types.
 *
 * These mirror the schema defined in `supabase/migrations`. In a real project
 * you would regenerate this file with:
 *   supabase gen types typescript --project-id <id> > src/types/database.ts
 */
import type {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ServiceRequestStatus,
  TicketStatus,
  UserRole,
} from "./index";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          city: string | null;
          country: string | null;
          company: string | null;
          facility_type: string | null;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          city?: string | null;
          country?: string | null;
          company?: string | null;
          facility_type?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category_id: string | null;
          description: string | null;
          specifications: Record<string, string>;
          price: number;
          discount_price: number | null;
          stock: number;
          rating: number;
          reviews_count: number;
          featured: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["products"]["Row"],
          "id" | "created_at" | "rating" | "reviews_count"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["products"]["Insert"]
        >;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          reference: string;
          status: OrderStatus;
          payment_status: PaymentStatus;
          payment_method: PaymentMethod;
          subtotal: number;
          tax: number;
          total: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["orders"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      service_requests: {
        Row: {
          id: string;
          user_id: string;
          service_id: string | null;
          reference: string;
          status: ServiceRequestStatus;
          address: string;
          scheduled_at: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["service_requests"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["service_requests"]["Insert"]
        >;
        Relationships: [];
      };
      tickets: {
        Row: {
          id: string;
          user_id: string;
          subject: string;
          status: TicketStatus;
          priority: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["tickets"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["tickets"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Enums: {
      user_role: UserRole;
      order_status: OrderStatus;
      payment_status: PaymentStatus;
      payment_method: PaymentMethod;
      service_request_status: ServiceRequestStatus;
      ticket_status: TicketStatus;
    };
  };
}
