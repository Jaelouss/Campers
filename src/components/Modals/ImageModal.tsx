import { useImageModalNavigation } from "@hooks/useImageModalNavigation";
import type { GalleryItem } from "@type/camperApiTypes";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  gallery: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal = ({
  gallery,
  initialIndex,
  isOpen,
  onClose,
}: Props) => {
  const [localIndex, setLocalIndex] = useState(initialIndex);

  useEffect(() => {
    setLocalIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const getIndex = (i: number) =>
    ((i % gallery.length) + gallery.length) % gallery.length;

  const handlePrev = () => setLocalIndex(getIndex(localIndex - 1));
  const handleNext = () => setLocalIndex(getIndex(localIndex + 1));

  useImageModalNavigation({
    onClose,
    handleNext,
    handlePrev,
  });

  if (!isOpen || gallery.length === 0) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalImage src={gallery[getIndex(localIndex)].thumb} />
        <ModalButtonLeft onClick={handlePrev}>&lt;</ModalButtonLeft>
        <ModalButtonRight onClick={handleNext}>&gt;</ModalButtonRight>
      </ModalWrapper>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalWrapper = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
`;

const ModalButtonBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 24px;
  padding: 8px;

  @media (min-width: 480px) {
    font-size: 28px;
    padding: 10px;
  }
  @media (min-width: 768px) {
    font-size: 32px;
    padding: 12px;
  }
  @media (min-width: 1024px) {
    font-size: 36px;
    padding: 14px;
  }
  @media (min-width: 1440px) {
    font-size: 40px;
    padding: 16px;
  }
`;

const ModalButtonLeft = styled(ModalButtonBase)`
  left: 10px;
`;

const ModalButtonRight = styled(ModalButtonBase)`
  right: 10px;
`;
