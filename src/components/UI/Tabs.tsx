import { useState } from "react";
import styled from "styled-components";

export const Tabs = ({ onChange }: { onChange: (arg0: string) => void }) => {
  const [activeTab, setActiveTab] = useState("Features");

  return (
    <Box>
      <TabButton
        type="button"
        onClick={() => {
          setActiveTab("Features");
          onChange("Features");
        }}
        active={activeTab === "Features"}
      >
        Features
      </TabButton>

      <TabButton
        type="button"
        onClick={() => {
          setActiveTab("Reviews");
          onChange("Reviews");
        }}
        active={activeTab === "Reviews"}
      >
        Reviews
      </TabButton>
    </Box>
  );
};
const Box = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--Gray-Light);
  @media (width>=360px) {
    justify-content: flex-start;
  }
`;

export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  position: relative;
  background: none;
  border: none;
  font-size: 16px;
  color: var(--Text);
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: -27px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: var(--Button);
    border-radius: 2px;

    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;
