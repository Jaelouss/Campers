import { AMOUNT_OF_VISIBLE_CARDS } from "@constants/catalog";
import type { CampersResponse } from "@type/camperApiTypes";
import { useEffect, useState } from "react";

export const usePagination = ({ total, items }: CampersResponse) => {
  const [amountOfCards, setAmountOfCards] = useState(AMOUNT_OF_VISIBLE_CARDS);
  const [visibleCars, setVisibleCars] = useState<typeof items>([]);

  useEffect(() => {
    setVisibleCars(items?.slice(0, amountOfCards));
  }, [items, amountOfCards]);

  const isEndOfList = total <= amountOfCards;

  const showMore = () => {
    if (isEndOfList) {
      setAmountOfCards(AMOUNT_OF_VISIBLE_CARDS);
    } else {
      setAmountOfCards((prev) => prev + AMOUNT_OF_VISIBLE_CARDS);
    }
  };

  return { visibleCars, showMore, isEndOfList };
};
