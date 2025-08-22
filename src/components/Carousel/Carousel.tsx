import { ImageModal } from "@components/Modals/ImageModal";
import { htmlScrollLock } from "@utils/htmlScrollLock";
import { useState, useEffect } from "react";
import styled from "styled-components";

export interface GalleryItem {
  thumb: string;
  original: string;
}

interface CarouselProps {
  gallery: GalleryItem[];
}

export const Carousel = ({ gallery }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getVisibleCount() {
    if (window.innerWidth >= 1440) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 670) return 2;
    return 1;
  }

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getIndex = (i: number) =>
    ((i % gallery.length) + gallery.length) % gallery.length;

  const getVisibleItems = () => {
    const items = [];
    const half = Math.floor(visibleCount / 2);
    for (let i = 0; i < visibleCount; i++) {
      const index = activeIndex - half + i;
      items.push(gallery[getIndex(index)]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();
  const activePosition = Math.floor(visibleCount / 2);

  const handlePrev = () => setActiveIndex(getIndex(activeIndex - 1));
  const handleNext = () => setActiveIndex(getIndex(activeIndex + 1));

  const handleOpenModal = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
    htmlScrollLock(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    htmlScrollLock(false);
  };

  return (
    <>
      <Wrapper>
        <NavButton onClick={handlePrev}>&lt;</NavButton>

        <Track visibleCount={visibleCount}>
          {visibleItems.map((item, idx) => (
            <ImageWrapper
              key={`${item.original}-${idx}`}
              active={idx === activePosition}
              visibleCount={visibleCount}
              onClick={() =>
                handleOpenModal(activeIndex - activePosition + idx)
              }
            >
              <Image src={item.thumb} alt="" />
            </ImageWrapper>
          ))}
        </Track>

        <NavButton onClick={handleNext}>&gt;</NavButton>
      </Wrapper>

      <ImageModal
        gallery={gallery}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
`;

const Track = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visibleCount",
})<{ visibleCount: number }>`
  display: flex;
  overflow: hidden;
  width: 100%;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 12px;
  }
  @media (min-width: 1024px) {
    gap: 16px;
  }
`;

const ImageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active" && prop !== "visibleCount",
})<{ active: boolean; visibleCount: number }>`
  flex: 0 0 calc(100% / ${({ visibleCount }) => visibleCount} - 8px);
  transform: scale(${({ active }) => (active ? 1 : 0.95)});
  transition: transform 0.3s ease;
  cursor: pointer;

  @media (min-width: 768px) {
    flex: 0 0 calc(100% / ${({ visibleCount }) => visibleCount} - 12px);
  }
  @media (min-width: 1024px) {
    flex: 0 0 calc(100% / ${({ visibleCount }) => visibleCount} - 16px);
  }
  @media (min-width: 1440px) {
    flex: 0 0 calc(100% / ${({ visibleCount }) => visibleCount} - 16px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
`;
