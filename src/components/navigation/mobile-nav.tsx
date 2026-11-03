"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { mainNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-border absolute inset-x-0 top-full z-50 border-b bg-white shadow-lg"
        >
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {mainNavigation.map((item) => {
              if (item.children?.length) {
                return (
                  <div key={item.href} className="rounded-xl">
                    <button
                      type="button"
                      className="text-navy hover:bg-background flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((value) => !value)}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          servicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {servicesOpen ? (
                      <div className="border-border mb-2 ml-2 space-y-1 border-l pl-3">
                        <Link
                          href={item.href}
                          className="text-primary block rounded-lg px-3 py-2 text-sm font-medium"
                          onClick={() => setOpen(false)}
                        >
                          All Services
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-body hover:bg-background hover:text-primary block rounded-lg px-3 py-2 text-sm"
                            onClick={() => setOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "hover:bg-background rounded-xl px-3 py-2.5 text-sm font-semibold",
                    pathname === item.href ? "text-primary" : "text-navy",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              );
            })}
            <Button asChild className="mt-2 w-full">
              <Link href="/appointment" onClick={() => setOpen(false)}>
                Book Appointment
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
