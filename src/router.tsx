import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ADMIN_ROLES } from "@/store/authStore";
import { ADMIN_BASE_PATH, ADMIN_SIGN_IN_PATH } from "@/lib/adminRoute";
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
const AdminSignIn = lazy(() => import("@/pages/auth/AdminSignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

const CustomerDashboard = lazy(() => import("@/pages/dashboard/CustomerDashboard"));
const CustomerOverview = lazy(() => import("@/pages/dashboard/CustomerOverview"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));

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
  { path: ADMIN_SIGN_IN_PATH, element: page(AdminSignIn) },
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
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },

  {
    path: ADMIN_BASE_PATH,
    element: (
      <ProtectedRoute roles={[...ADMIN_ROLES]} signInPath={ADMIN_SIGN_IN_PATH}>
        {page(AdminDashboard)}
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: page(AdminOverview) },
      { path: "users", element: page(UserManagement) },
    ],
  },

  { path: "*", element: page(NotFound) },
]);
