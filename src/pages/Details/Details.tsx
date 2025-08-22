import { BookForm, Carousel, FeaturesCard, Loader, Reviews } from "@components";
import { Tabs, CampLocation, Rating, CatalogCardPlaceholder } from "@UI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@store/store";
import {
  selectCampersError,
  selectCampersLoading,
  selectSelectedCamper,
} from "@store/campers/campersSelectors";
import { fetchCamperById } from "@store/campers/campersActions";
import { useScrollToHash } from "@hooks/useScrollToHash";

export const Details = () => {
  const [activeTab, setActiveTab] = useState("Features");

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);
  const car = useSelector(selectSelectedCamper);

  useScrollToHash();

  const { id } = useParams();
  useEffect(() => {
    if (id) dispatch(fetchCamperById(id));
  }, [id, dispatch]);

  if (error) {
    return <CatalogCardPlaceholder />;
  }
  return (
    <>
      {(loading || !car) && <Loader />}
      {car && (
        <Section>
          <Box gap="28px">
            <TitleWrapper>
              <Title>{car.name}</Title>
              <RatingWrapper>
                <Rating
                  id={car.id}
                  type="Single"
                  rating={car.rating}
                  reviews={car.reviews}
                />
                <CampLocation location={car.location} />
              </RatingWrapper>
              <Price>€{car.price.toFixed(2)}</Price>
            </TitleWrapper>
            <ImageList>
              <Carousel gallery={car.gallery} />
            </ImageList>
            <Description>{car.description}</Description>
          </Box>
          <Tabs onChange={setActiveTab} />
          <List>
            {activeTab === "Features" ? (
              <Item>
                <FeaturesCard car={car} />
              </Item>
            ) : (
              <Reviews reviews={car.reviews} />
            )}
            <Item transparent>
              <BookForm />
            </Item>
          </List>
        </Section>
      )}
    </>
  );
};

const FlexColumnBase = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleBase = css`
  color: var(--Main);
  font-weight: 600;
  line-height: 32px;
  font-size: 24px;
`;

const Section = styled.section`
  ${FlexColumnBase};
  padding: 80px 0 32px;
  gap: 16px;
  @media (width>=768px) {
    gap: 32px;
    padding: 120px 0 52px;
  }
  @media (width>=1440px) {
    gap: 64px;
  }
`;

const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "gap",
})<{ gap?: string }>`
  ${FlexColumnBase};
  gap: ${({ gap }) => gap};
  width: 100%;
`;

const TitleWrapper = styled.div`
  ${FlexColumnBase};
  gap: 8px;
  width: 100%;
`;

const Title = styled.h2`
  ${TitleBase};
`;

const Price = styled.span`
  ${TitleBase};
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-direction: column;
  @media (width>=500px) {
    flex-direction: row;
  }
`;

const ImageList = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Description = styled.span`
  color: var(--Text);
  font-size: 16px;
  line-height: 24px;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: stretch;
  @media (width>=768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Item = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "transparent",
})<{ transparent?: boolean }>`
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : "var(--Inputs)"};
  ${FlexColumnBase};
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--Gray-Light);
  justify-content: flex-start;
  padding: 16px 20px;
  gap: 16px;
  @media (width>=500px) {
    padding: 24px 30px;
    gap: 26px;

    height: 629px;
  }
  @media (width>=768px) {
  }
  @media (width>=1440px) {
    padding: 44px 52px;
    gap: 50px;
  }
`;
