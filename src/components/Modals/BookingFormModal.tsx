import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const BookingFormModal = ({
  isOpen,
  onClose,
  title,
  message,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>{title || "Hello Dear!"}</ModalTitle>
        <ModalMessage>
          {message ||
            "Thank you for booking the campervan! We will contact you soon. Have a great day!"}
        </ModalMessage>
        <OkButton onClick={onClose}>OK</OkButton>
      </ModalWrapper>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  position: relative;
  background: var(--White);
  border-radius: 12px;
  padding: 24px 20px 32px;
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 32px 28px 40px;
  }

  @media (min-width: 1440px) {
    padding: 40px 32px 48px;
    max-width: 500px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--Gray);
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--Main);
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: var(--Text);
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const OkButton = styled.button`
  background: var(--Button);
  color: var(--White);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: var(--Button-Hover);
  }

  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: 18px;
  }
`;
