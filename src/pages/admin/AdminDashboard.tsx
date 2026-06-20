import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/layout/DashboardLayout";
import { adminPath } from "@/lib/adminRoute";

const NAV: DashboardNavItem[] = [
  {
    to: adminPath(),
    label: "Dashboard",
    icon: "layout-dashboard",
    end: true,
  },
  { to: adminPath("users"), label: "Registered Users", icon: "users" },
];

export default function AdminDashboard() {
  return <DashboardLayout title="Admin" nav={NAV} />;
}
