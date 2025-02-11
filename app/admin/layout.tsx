"use client";

import React from "react";
import { AdminHeader } from "./components/AdminHeader";
import { MobileNav } from "./components/MobileNav";
import { Sidebar } from "./components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className=" p-6 pb-16 lg:pb-6 ">
            <div className="p-4 md:p-6 max-w-4xl mx-auto">{children}</div>
          </main>
          <MobileNav />
        </div>
      </div>
    </>
  );
}
