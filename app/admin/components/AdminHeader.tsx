"use client";

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { logOut } = useAuthActions();
  const navigate = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate.push("/admin")}
        >
          <h1 className="ml-2 text-xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-stone-950 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={() => {
                  navigate.push("/admin/account");
                  setProfileOpen(false);
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Conta
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={() => {
                  logOut();
                  setProfileOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
