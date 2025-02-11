"use client";

import { LayoutDashboard, BarChart3 } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/products", icon: BarChart3 },
];

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-md lg:hidden">
      <nav
        className="flex h-16 items-center justify-around"
        aria-label="Navegação Mobile"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center space-y-1 p-2 hover:bg-gray-100 transition"
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium text-gray-700">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
