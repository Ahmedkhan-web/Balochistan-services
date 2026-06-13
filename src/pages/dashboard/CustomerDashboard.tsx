import { useEffect } from "react";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/layout/DashboardLayout";

const NAV: DashboardNavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: "layout-dashboard", end: true },
  { to: "/dashboard/orders", label: "Orders", icon: "package-check" },
  { to: "/dashboard/requests", label: "Services", icon: "wrench" },
  { to: "/dashboard/profile", label: "Account", icon: "settings" },
];

export default function CustomerDashboard() {
  useEffect(() => {
    const preloadDashboardSections = () => {
      void Promise.all([
        import("@/pages/dashboard/CustomerOverview"),
        import("@/pages/dashboard/Orders"),
        import("@/pages/dashboard/ServiceRequests"),
        import("@/pages/dashboard/Profile"),
      ]);
    };

    const timeoutId = window.setTimeout(preloadDashboardSections, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return <DashboardLayout title="Buyer Dashboard" nav={NAV} />;
}
