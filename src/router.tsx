import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ADMIN_ROLES } from "@/store/authStore";
import Overview from "@/pages/Overview";
import Products from "@/pages/Products";
import ProductCategory from "@/pages/ProductCategory";
import ProductDetail from "@/pages/ProductDetail";
import InstallationRequest from "@/pages/InstallationRequest";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Order from "@/pages/Order";

const NotFound = lazy(() => import("@/pages/NotFound"));

const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

const CustomerDashboard = lazy(() => import("@/pages/dashboard/CustomerDashboard"));
const CustomerOverview = lazy(() => import("@/pages/dashboard/CustomerOverview"));
const Orders = lazy(() => import("@/pages/dashboard/Orders"));
const ServiceRequests = lazy(() => import("@/pages/dashboard/ServiceRequests"));
const Invoices = lazy(() => import("@/pages/dashboard/Invoices"));
const Wishlist = lazy(() => import("@/pages/dashboard/Wishlist"));
const Notifications = lazy(() => import("@/pages/dashboard/Notifications"));
const Tickets = lazy(() => import("@/pages/dashboard/Tickets"));
const Profile = lazy(() => import("@/pages/dashboard/Profile"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview"));
const ProductManagement = lazy(() => import("@/pages/admin/ProductManagement"));
const OrderManagement = lazy(() => import("@/pages/admin/OrderManagement"));
const ServiceManagement = lazy(() => import("@/pages/admin/ServiceManagement"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const ReviewManagement = lazy(() => import("@/pages/admin/ReviewManagement"));
const ContentManagement = lazy(() => import("@/pages/admin/ContentManagement"));
const AuditLogs = lazy(() => import("@/pages/admin/AuditLogs"));

function page(Component: ComponentType) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-[#0f1b18]" />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: page(Overview) },
      { path: "/overview", element: page(Overview) },
      { path: "/products", element: page(Products) },
      { path: "/products/category/:categoryId", element: page(ProductCategory) },
      { path: "/products/:slug/installation", element: page(InstallationRequest) },
      { path: "/products/:slug", element: page(ProductDetail) },
      { path: "/services", element: page(Services) },
      { path: "/services/:slug", element: page(ServiceDetail) },
      { path: "/contact", element: page(Contact) },
      { path: "/cart", element: page(Cart) },
      { path: "/order", element: page(Order) },
      { path: "/checkout", element: page(Order) },
    ],
  },

  { path: "/signin", element: page(SignIn) },
  { path: "/signup", element: page(SignUp) },
  { path: "/forgot-password", element: page(ForgotPassword) },
  { path: "/reset-password", element: page(ResetPassword) },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        {page(CustomerDashboard)}
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: page(CustomerOverview) },
      { path: "orders", element: page(Orders) },
      { path: "requests", element: page(ServiceRequests) },
      { path: "invoices", element: page(Invoices) },
      { path: "wishlist", element: page(Wishlist) },
      { path: "notifications", element: page(Notifications) },
      { path: "tickets", element: page(Tickets) },
      { path: "profile", element: page(Profile) },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={[...ADMIN_ROLES]}>
        {page(AdminDashboard)}
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: page(AdminOverview) },
      { path: "products", element: page(ProductManagement) },
      { path: "orders", element: page(OrderManagement) },
      { path: "services", element: page(ServiceManagement) },
      { path: "users", element: page(UserManagement) },
      { path: "reviews", element: page(ReviewManagement) },
      { path: "cms", element: page(ContentManagement) },
      { path: "audit", element: page(AuditLogs) },
    ],
  },

  { path: "*", element: page(NotFound) },
]);
