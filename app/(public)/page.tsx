"use client";

import BannerSection from "./components/BannerSection";
import SectionTitle from "./components/SectionTitle";
import ProductList from "./components/ProductList";
import { useProducts } from "@/hooks/useProducts";
import Section from "./components/Section";
import Image from "next/image";

import party_cake from "@/public/party_cake.png";
import { Phone } from "lucide-react";

export default function Home() {
  const { groupedProducts } = useProducts();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "Cornsilk" }}>
      <BannerSection />
      <ProductList groupedProducts={groupedProducts} />
      <Section bgColor="white">
        <SectionTitle title="Bolos para Festa" bgColor="SaddleBrown" />

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 text-center lg:text-left">
          {/* Imagem com novo estilo */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-orange-400 blur-md" />
            <Image
              src={party_cake}
              alt="Bolo de festa"
              className="rounded-full w-60 h-60 shadow-lg border-4 bg-white"
              style={{ border: "2px solid SaddleBrown" }}
            />
          </div>

          {/* Quadro de informações */}
          <div className="bg-orange-100 p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-4">
            <ul className="text-gray-800 text-md space-y-2">
              <li>
                🎂 <strong>1KG - R$ 65,00</strong>
              </li>
              <li>🍼 Mesversário</li>
              <li>🎨 Decorados</li>
              <li>
                📏 Outros tamanhos -{" "}
                <span className="italic">Consulte valores!</span>
              </li>
            </ul>

            {/* Botão CTA para WhatsApp */}
            <a
              href="https://wa.me/5511930738238?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20bolos!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-green-700 transition"
            >
              <Phone /> Pedir pelo WhatsApp
            </a>
          </div>
        </div>
      </Section>

      <Section bgColor="Cornsilk">
        <SectionTitle title="Sobre nós" bgColor="SaddleBrown" />
        Na <strong>M&M Doces</strong>, fazemos doces artesanais com ingredientes
        selecionados para oferecer a melhor experiência de sabor. Nosso objetivo
        é adoçar seus momentos especiais!
      </Section>
    </main>
  );
}
