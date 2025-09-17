"use client";

import { useEffect, useRef, useState } from "react";

type LazySectionProps = {
  children: React.ReactNode;
  placeholderHeight?: number;
};

export default function LazySection({ children, placeholderHeight = 200 }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : placeholderHeight }}>
      {isVisible && children}
    </div>
  );
}

