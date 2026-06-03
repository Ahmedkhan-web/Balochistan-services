import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/layout/DashboardLayout";

const NAV: DashboardNavItem[] = [
  { to: "/dashboard", label: "Overview", icon: "layout-dashboard", end: true },
  { to: "/dashboard/orders", label: "My Orders", icon: "package-check" },
  { to: "/dashboard/requests", label: "Service Requests", icon: "wrench" },
  { to: "/dashboard/invoices", label: "Invoices", icon: "file-text" },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: "heart" },
  { to: "/dashboard/notifications", label: "Notifications", icon: "bell" },
  { to: "/dashboard/tickets", label: "Support Tickets", icon: "ticket" },
  { to: "/dashboard/profile", label: "Profile", icon: "settings" },
];

export default function CustomerDashboard() {
  return <DashboardLayout title="Customer Portal" nav={NAV} />;
}
