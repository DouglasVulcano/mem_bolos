"use client";

import React from "react";
import { PublicHeader } from "@/app/(public)/components/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-pink-100">
      <PublicHeader />
      <main className="max-w-7xl mx-auto pt-16">{children}</main>
      <footer
        className="text-white text-center py-6"
        style={{ backgroundColor: "SaddleBrown" }}
      >
        <p>
          &copy; {new Date().getFullYear()} M&M Doces - Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
