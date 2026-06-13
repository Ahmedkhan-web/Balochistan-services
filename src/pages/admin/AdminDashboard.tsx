import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/layout/DashboardLayout";

const NAV: DashboardNavItem[] = [
  {
    to: "/admin",
    label: "Control Center",
    icon: "layout-dashboard",
    end: true,
  },
  { to: "/admin/orders", label: "Received Orders", icon: "package-check" },
  { to: "/admin/users", label: "Users & Customers", icon: "users" },
  { to: "/admin/products", label: "Products", icon: "package" },
  { to: "/admin/services", label: "Services", icon: "wrench" },
  { to: "/admin/reviews", label: "Reviews", icon: "star" },
  { to: "/admin/cms", label: "CMS & Settings", icon: "settings" },
  { to: "/admin/audit", label: "Audit Logs", icon: "file-text" },
];

export default function AdminDashboard() {
  return <DashboardLayout title="Admin Console" nav={NAV} />;
}
