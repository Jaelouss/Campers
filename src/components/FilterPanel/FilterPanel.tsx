import type { CamperFilters } from "@type/camperApiTypes";
import styled, { css } from "styled-components";
import { Badges, CustomButton, LocationInput } from "@UI";
import { FILTERS_BADGES } from "@constants/badges";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { htmlScrollLock } from "@utils/htmlScrollLock";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@store/store";
import { clearFilters } from "@store/filtersSlice/filtersSlice";
import { fetchCampers } from "@store/campers/campersActions";

interface Props {
  filters: CamperFilters;
}

export const FilterPanel = ({ filters }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1440;
      setIsDesktop(desktop);
      if (desktop) {
        setIsOpen(false);
        htmlScrollLock(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      const input = e.currentTarget.elements.namedItem(key) as HTMLInputElement;
      if (input.type === "checkbox") {
        query[key] = input.checked ? "true" : "false";
        continue;
      }
      if (input.type === "radio" && input.checked) {
        query[key] = value.toString();
        continue;
      }
      let val = value.toString();
      if (key === "location") {
        val = val.trim().split(",")[0].toLowerCase();
        if (!val) continue;
      }
      query[key] = val;
    }

    const params = new URLSearchParams(query).toString();
    navigate(`${location.pathname}?${params}`);
    setIsOpen(false);
    htmlScrollLock(false);
  };

  const handleReset = () => {
    dispatch(clearFilters());
    dispatch(fetchCampers({ reset: true }));
    navigate(location.pathname);
    setIsOpen(false);
    htmlScrollLock(false);
  };

  return (
    <>
      {!isDesktop && isOpen && (
        <Backdrop
          onClick={() => {
            htmlScrollLock(false);
            setIsOpen(false);
          }}
        />
      )}

      {!isDesktop && !isOpen && (
        <OpenButton
          onClick={() => {
            htmlScrollLock(true);
            setIsOpen(true);
          }}
        >
          {"❯❯"}
        </OpenButton>
      )}

      <Form
        as="form"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        isDesktop={isDesktop}
      >
        {!isDesktop && (
          <CloseButton
            onClick={() => {
              htmlScrollLock(false);
              setIsOpen(false);
            }}
          >
            ✕
          </CloseButton>
        )}

        <LocationInput filters={filters} />
        <Span>Filters</Span>

        <Box>
          <Header>Vehicle equipment</Header>
          <Line />
          <FiltersList>
            <Badges
              featuresToShow={FILTERS_BADGES.EQUIPMENT}
              Badge={FilterCheckBox}
              iconHeight="32px"
              iconWidth="32px"
              filters={filters}
            />
          </FiltersList>
        </Box>

        <Box>
          <Header>Vehicle type</Header>
          <Line />
          <FiltersList>
            <Badges
              featuresToShow={FILTERS_BADGES.VEHICLE_TYPE}
              Badge={FilterCheckBox}
              iconHeight="32px"
              iconWidth="32px"
              filters={filters}
            />
          </FiltersList>
        </Box>

        <BoxButton>
          <CustomButton type="Reset" onClick={handleReset} />
          <CustomButton type="Search" />
        </BoxButton>
      </Form>
    </>
  );
};

const FlexColumnBase = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const BoxButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
  transition: opacity 0.3s ease-in-out;
`;

const Form = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isDesktop",
})<{ isOpen: boolean; isDesktop: boolean }>`
  ${FlexColumnBase};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #fff;
  padding: 12px;
  width: 100%;
  max-width: 360px;
  gap: 16px;
  z-index: 1000;
  overflow-y: auto;

  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  @media (width>=1440px) {
    position: static;
    height: auto;
    max-width: none;
    width: auto;
    padding: 16px;
    gap: 32px;
    overflow: visible;
    transform: none;
    transition: none;
  }
`;

const OpenButton = styled.button`
  position: fixed;
  top: 20%;
  left: 0;
  transform: translateY(-50%);
  background: #fff;
  border: 2px solid var(--Gray-Light);
  border-radius: 0 20px 20px 0;
  width: 35px;
  height: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: var(--Button);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: bounce 2s infinite alternate;
  z-index: 1100;
  line-height: 1;

  &:hover {
    transform: translateY(-50%) scale(1.05);
    transition: transform 0.2s;
  }

  @keyframes bounce {
    0% {
      transform: translateY(-50%) translateY(0);
    }
    50% {
      transform: translateY(-50%) translateY(-6px);
    }
    100% {
      transform: translateY(-50%) translateY(0);
    }
  }
  @media (width>= 768px) {
    font-size: 22px;
    width: 42px;
    height: 75px;
  }
  @media (width>= 1000px) {
    font-size: 28px;
    width: 50px;
    height: 100px;
  }
  @media (width>= 1440px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  @media (width>= 768px) {
    font-size: 24px;
  }
  @media (width>= 1440px) {
    display: none;
  }
`;

const Span = styled.span`
  color: var(--Text);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const Box = styled.div`
  ${FlexColumnBase};
  gap: 24px;
`;

const Header = styled.span`
  color: var(--Main);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--Gray-Light);
`;

const FiltersList = styled.div`
  ${FlexColumnBase};
  gap: 8px;
`;

const FilterCheckBox = styled.label.withConfig({
  shouldForwardProp: (prop) =>
    !["checked", "iconHeight", "iconWidth"].includes(prop),
})<{
  iconHeight?: string;
  iconWidth?: string;
}>`
  border: 1px solid var(--Gray-Light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  width: 90px;
  color: var(--Main);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.08px;

  input[type="checkbox"],
  input[type="radio"] {
    display: none;
  }

  &:has(input:checked) {
    border-color: var(--Button);
  }
  @media (width>=360px) {
    width: 100px;
    height: 80px;
  }
  @media (width>=1440px) {
    width: 112px;
    height: 96px;
  }

  svg {
    width: ${({ iconWidth }) => iconWidth || "32px"};
    height: ${({ iconHeight }) => iconHeight || "32px"};
  }
`;
