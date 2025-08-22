import { Badges } from "@UI";
import { FEATURES, VEHICLE_DETAILS } from "@constants/badges";
import type { Camper, GalleryItem, Review } from "@type/camperApiTypes";
import styled from "styled-components";

export const FeaturesCard = ({ car }: { car: Camper }) => {
  return (
    <>
      <Badges featuresToShow={FEATURES} car={car} />
      <ScrollBox gap={"24px"}>
        <SubTitle>Vehicle details</SubTitle>
        <Line />
        {VEHICLE_DETAILS.map((detail) => {
          const key = detail.toLowerCase() as keyof Camper;
          const value = car[key];
          return (
            <Row key={detail}>
              <Span>{detail}</Span>
              <Span>{formatDetail(key, value)}</Span>
            </Row>
          );
        })}
      </ScrollBox>
    </>
  );
};

function formatDetail(
  key: string,
  value: string | number | boolean | Review[] | GalleryItem[]
): string | number | null {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    const match = value.match(/-?\d+(\.\d+)?/);
    if (match && key !== "consumption") {
      const numberPart = match[0];
      const rest = value.replace(numberPart, "").trim();
      return rest ? `${numberPart} ${rest}` : numberPart;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return null;
}
const SubTitle = styled.h2`
  color: var(--Main);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;
const Line = styled.div`
  border-bottom: 1px solid var(--Gray-Light);
  width: 100%;
  height: 1px;
`;
const Row = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;
const Span = styled.span`
  color: var(--Main);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
const ScrollBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "gap",
})<{ gap?: string }>`
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: ${({ gap = "28px" }) => gap};
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
