import type { GalleryItem } from "@type/camperApiTypes";
import { useState, useEffect } from "react";

export const useCarousel = (gallery: GalleryItem[]) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getIndex = (i: number) => {
    const len = gallery.length;
    return ((i % len) + len) % len;
  };

  const getVisibleItems = () => {
    const items = [];
    const half = Math.floor(visibleCount / 2);
    for (let i = 0; i < visibleCount; i++) {
      const index = activeIndex - half + i;
      items.push(gallery[getIndex(index)]);
    }
    return items;
  };

  const handlePrev = () => setActiveIndex(getIndex(activeIndex - 1));
  const handleNext = () => setActiveIndex(getIndex(activeIndex + 1));

  return {
    visibleItems: getVisibleItems(),
    activePosition: Math.floor(visibleCount / 2),
    handlePrev,
    handleNext,
    visibleCount,
  };
};
