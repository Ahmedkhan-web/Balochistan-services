import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/layout/DashboardLayout";

const NAV: DashboardNavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: "layout-dashboard", end: true },
];

export default function CustomerDashboard() {
  return <DashboardLayout title="Customer" nav={NAV} />;
}
