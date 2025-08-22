import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    let attempts = 0;
    const id = location.hash.substring(1);

    const interval = setInterval(() => {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
        clearInterval(interval);
      }
      if (++attempts > 10) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [location.hash]);
};
