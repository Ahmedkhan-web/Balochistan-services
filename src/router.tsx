import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ADMIN_ROLES } from "@/store/authStore";

import Overview from "@/pages/Overview";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/NotFound";

import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

import CustomerDashboard from "@/pages/dashboard/CustomerDashboard";
import CustomerOverview from "@/pages/dashboard/CustomerOverview";
import Orders from "@/pages/dashboard/Orders";
import ServiceRequests from "@/pages/dashboard/ServiceRequests";
import Invoices from "@/pages/dashboard/Invoices";
import Wishlist from "@/pages/dashboard/Wishlist";
import Notifications from "@/pages/dashboard/Notifications";
import Tickets from "@/pages/dashboard/Tickets";
import Profile from "@/pages/dashboard/Profile";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOverview from "@/pages/admin/AdminOverview";
import ProductManagement from "@/pages/admin/ProductManagement";
import OrderManagement from "@/pages/admin/OrderManagement";
import ServiceManagement from "@/pages/admin/ServiceManagement";
import UserManagement from "@/pages/admin/UserManagement";
import ReviewManagement from "@/pages/admin/ReviewManagement";
import ContentManagement from "@/pages/admin/ContentManagement";
import AuditLogs from "@/pages/admin/AuditLogs";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Overview /> },
      { path: "/overview", element: <Overview /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:slug", element: <ProductDetail /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:slug", element: <ServiceDetail /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },

  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <CustomerDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CustomerOverview /> },
      { path: "orders", element: <Orders /> },
      { path: "requests", element: <ServiceRequests /> },
      { path: "invoices", element: <Invoices /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "notifications", element: <Notifications /> },
      { path: "tickets", element: <Tickets /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={[...ADMIN_ROLES]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminOverview /> },
      { path: "products", element: <ProductManagement /> },
      { path: "orders", element: <OrderManagement /> },
      { path: "services", element: <ServiceManagement /> },
      { path: "users", element: <UserManagement /> },
      { path: "reviews", element: <ReviewManagement /> },
      { path: "cms", element: <ContentManagement /> },
      { path: "audit", element: <AuditLogs /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);
