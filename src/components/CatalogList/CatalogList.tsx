import { CatalogCard, Pagination } from "@components";
import { CatalogCardPlaceholder } from "@UI";
import { usePagination } from "@hooks/usePagination";
import type { CampersResponse } from "@type/camperApiTypes";
import styled from "styled-components";

export const CatalogList = ({
  error,
  campers,
}: {
  error: boolean;
  campers: CampersResponse;
}) => {
  const { isEndOfList, showMore, visibleCars } = usePagination({
    total: campers.total,
    items: campers.items,
  });

  return (
    <StyledList>
      {error ? (
        <StyledItem>
          <CatalogCardPlaceholder />
        </StyledItem>
      ) : (
        <>
          {visibleCars?.map((camper) => (
            <StyledItem key={camper.id}>
              <CatalogCard car={camper} />
            </StyledItem>
          ))}
          {visibleCars.length > 0 && (
            <StyledItem>
              <Pagination isEndOfList={isEndOfList} onLoadMore={showMore} />
            </StyledItem>
          )}
        </>
      )}
    </StyledList>
  );
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  @media (width>=768px) {
    gap: 24px;
  }
  @media (width>=1440px) {
    gap: 32px;
  }
`;
const StyledItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
