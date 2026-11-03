import Link from "next/link";

import { BrandLogo } from "@/components/shared/brand-logo";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur-md">
      <TopBar />
      <div className="relative">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <BrandLogo variant="full" priority />
          <DesktopNav />
          <div className="flex items-center gap-2">
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/appointment">Book Appointment</Link>
            </Button>
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
