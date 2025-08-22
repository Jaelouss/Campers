import { BADGES_ICONS, FILTERS_BADGES } from "@constants/badges";
import styled from "styled-components";
import type { Camper, CamperFilters } from "@type/camperApiTypes";

interface BadgeItem {
  label: string;
  value: string;
}

interface BadgesProps {
  car?: Camper;
  featuresToShow: readonly (string | BadgeItem)[];
  Badge?: React.ComponentType<
    React.HTMLAttributes<HTMLSpanElement> & { checked?: boolean }
  >;
  iconWidth?: string;
  iconHeight?: string;
  filters?: CamperFilters;
}

export const Badges = ({
  car,
  featuresToShow,
  Badge = BadgeDefault,
  iconWidth,
  iconHeight,
  filters,
}: BadgesProps) => {
  const isFilterBadge = Object.values(FILTERS_BADGES).some(
    (arr) => arr === featuresToShow
  );

  const toText = (value: unknown, fallback: string) => {
    if (typeof value === "string" || typeof value === "number") {
      return (
        value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
      );
    }
    return fallback.charAt(0).toUpperCase() + fallback.slice(1);
  };

  return (
    <Box>
      {featuresToShow.map((f) => {
        const key = typeof f === "string" ? f : f.value;
        const displayValue = typeof f === "string" ? f : f.label;
        const Icon = BADGES_ICONS[key];

        if (car && !isFilterBadge) {
          const value = car[key as keyof Camper];
          if (value === false || value === undefined || value === null)
            return null;

          const text = typeof value === "boolean" ? key : value;
          return (
            <Badge key={key}>
              {Icon && (
                <Icon
                  width={iconWidth ?? "20px"}
                  height={iconHeight ?? "20px"}
                />
              )}
              {toText(text, key)}
            </Badge>
          );
        }

        if (isFilterBadge) {
          const isVehicleType = featuresToShow === FILTERS_BADGES.VEHICLE_TYPE;
          const checked = isVehicleType
            ? filters?.form === key
            : filters?.[key] === "true";

          return (
            <Badge key={key} checked={checked}>
              <input
                type={isVehicleType ? "radio" : "checkbox"}
                name={isVehicleType ? "form" : key}
                value={key}
                defaultChecked={checked}
              />
              <BadgeContent>
                {Icon && (
                  <Icon
                    width={iconWidth ?? "20px"}
                    height={iconHeight ?? "20px"}
                  />
                )}
                {toText(displayValue, key)}
              </BadgeContent>
            </Badge>
          );
        }

        return (
          <Badge key={key}>
            {Icon && (
              <Icon width={iconWidth ?? "20px"} height={iconHeight ?? "20px"} />
            )}
            {toText(displayValue, key)}
          </Badge>
        );
      })}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const BadgeContent = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const BadgeDefault = styled.span`
  display: flex;
  padding: 6px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: var(--Badges);
  color: var(--Main);
  width: fit-content;
  user-select: none;
  @media (width>=500px) {
    padding: 8px 12px;
  }
  @media (width>=768px) {
    padding: 12px 18px;
  }
`;
