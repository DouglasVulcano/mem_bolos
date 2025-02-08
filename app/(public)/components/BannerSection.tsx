"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import logo from "@/public/mem_doces.png";
import banner from "@/public/banner_cakes.jpg";

export default function BannerSection() {
  return (
    <section
      className="relative text-white text-center py-8 px-6"
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <Image src={logo} alt="Logo" width={200} height={200} />
        <h1 className="py-2 mb-12 text-4xl text-orange-900 custom-font text-shadow font-bolder">
          Bolos e Doces Personalizados 🎂
        </h1>
        <a
          href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white text-pink-600 px-6 py-2 rounded-lg shadow-sm hover:bg-pink-50 transition-colors"
        >
          <Instagram size={18} />
          Siga no Instagram
        </a>
      </div>
    </section>
  );
}
