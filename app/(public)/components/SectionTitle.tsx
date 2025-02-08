"use client";

import { CSSProperties } from "react";

interface SectionTitleProps {
  title: string;
  bgColor?: CSSProperties["backgroundColor"];
  color?: CSSProperties["color"];
  margin?: CSSProperties["margin"];
}

export default function SectionTitle({
  title,
  color = "white",
  margin = "0 auto",
  bgColor,
}: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2
        className="text-3xl font-semibold py-3 px-4 rounded-full custom-font"
        style={{
          backgroundColor: bgColor,
          width: "fit-content",
          color,
          margin,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
