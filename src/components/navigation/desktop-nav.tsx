"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
      {mainNavigation.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        if (item.children?.length) {
          return (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "hover:bg-background hover:text-primary inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-primary" : "text-navy",
                )}
              >
                {item.title}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="border-border grid w-[22rem] gap-1 rounded-2xl border bg-white p-3 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="hover:bg-background rounded-xl px-3 py-2.5"
                    >
                      <span className="text-navy block text-sm font-semibold">
                        {child.title}
                      </span>
                      {child.description ? (
                        <span className="text-muted mt-0.5 block text-xs">
                          {child.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:bg-background hover:text-primary rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
              isActive ? "text-primary" : "text-navy",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
