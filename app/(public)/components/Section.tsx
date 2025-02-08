"use client";

import { CSSProperties } from "react";

interface SectionProps {
  bgColor?: CSSProperties["backgroundColor"];
  children?: React.ReactNode;
}

export default function Section({ bgColor, children }: SectionProps) {
  return (
    <>
      <section
        className="py-16 px-8 text-center"
        style={{ backgroundColor: bgColor }}
      >
        <div className="max-w-2xl mx-auto text-gray-700">{children}</div>
      </section>
    </>
  );
}
