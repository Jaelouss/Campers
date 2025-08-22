import { useEffect, useRef } from "react";

interface Props {
  onClose: () => void;
  handleNext: () => void;
  handlePrev: () => void;
}

export const useImageModalNavigation = ({
  onClose,
  handleNext,
  handlePrev,
}: Props) => {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = e.changedTouches[0].clientX - touchStartX.current;

      if (diff > 50) {
        handlePrev();
      } else if (diff < -50) {
        handleNext();
      }

      touchStartX.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose, handleNext, handlePrev]);
};
