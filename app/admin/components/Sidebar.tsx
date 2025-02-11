"use client";

import { LayoutDashboard, BarChart3 } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { name: "Home", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/products", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <div className="hidden border-r bg-white lg:block lg:w-72">
      <div className="flex h-full flex-col">
        <div className="p-6"></div>
        <div className="flex-1 overflow-y-auto px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900`}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
