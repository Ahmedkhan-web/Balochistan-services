import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Seo } from "@/components/common/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" />
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={buttonVariants({ className: "mt-6" })}>
          Back to Home
        </Link>
      </div>
    </>
  );
}
