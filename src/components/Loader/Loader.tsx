import styled, { keyframes } from "styled-components";

export const Loader = () => {
  return (
    <Backdrop>
      <LoaderWrapper>
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </LoaderWrapper>
    </Backdrop>
  );
};

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
    background-color: #e44848;
  }
  40% {
    transform: translateY(-20px);
    background-color: #ffc531;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoaderWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const Dot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "delay",
})<{ delay: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--Button);
  animation: ${bounce} 1s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay};
`;
