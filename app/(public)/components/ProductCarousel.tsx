"use client";

import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCarouselProps {
  category: string;
  items: Product[];
}

export default function ProductCarousel({
  category,
  items,
}: ProductCarouselProps) {
  return (
    <div className="relative">
      <SectionTitle title={category} bgColor="LightCoral" margin="0" />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          1024: { slidesPerView: 3.2, spaceBetween: 16 },
        }}
        className="pb-8"
      >
        {items.map((product) => (
          <SwiperSlide key={product.id} className="w-full h-full p-1">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
