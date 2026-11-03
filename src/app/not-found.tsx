import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-secondary text-sm font-semibold tracking-[0.16em] uppercase">
        404
      </p>
      <h1 className="text-navy mt-3 text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="text-muted mt-3 max-w-md">
        The page you are looking for does not exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
