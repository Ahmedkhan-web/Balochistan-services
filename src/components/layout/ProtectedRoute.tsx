import { Navigate, useLocation } from "react-router-dom";
import type { UserRole } from "@/types";
import { useAuthStore } from "@/store/authStore";

export function ProtectedRoute({
  children,
  roles,
  signInPath = "/signin",
}: {
  children: React.ReactNode;
  roles?: UserRole[];
  signInPath?: string;
}) {
  const { profile, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return <Navigate to={signInPath} state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
