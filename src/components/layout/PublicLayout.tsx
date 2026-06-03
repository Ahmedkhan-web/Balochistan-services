import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "@/components/common/FloatingActions";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <ScrollRestoration />
    </div>
  );
}
