import { Badges, CampLocation, CustomButton, Rating } from "@UI";
import { FEATURES } from "@constants/badges";
import type { Camper } from "@type/camperApiTypes";
import styled, { css } from "styled-components";

export const CatalogCard = ({ car }: { car: Camper }) => {
  return (
    <List>
      <Item>
        <Picture src={car.gallery[0].original} alt={car.name} />
      </Item>
      <Item>
        <Header>
          <TitleWrapper>
            <Title>{car.name}</Title>
            <PriceWrapper>
              <Price>€{car.price.toFixed(2)}</Price>
              <CustomButton type="Favorite" id={car.id} />
            </PriceWrapper>
          </TitleWrapper>
          <RatingWrapper>
            <Rating
              id={car.id}
              type="Single"
              rating={car.rating}
              reviews={car.reviews}
            />
            <CampLocation location={car.location} />
          </RatingWrapper>
        </Header>
        <Description title={car.description}>{car.description}</Description>
        <Badges car={car} featuresToShow={FEATURES} />
        <CustomButton type="Show more" id={car.id} />
      </Item>
    </List>
  );
};

const FlexColumn = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextMainXL = styled.span`
  color: var(--Main);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  padding: 16px;
  gap: 16px;
  border-radius: 20px;
  border: 1px solid var(--Gray-Light);
  background: var(--White);
  width: 100%;

  @media (width>=1000px) {
    grid-template-columns: 292px 1fr;
    padding: 24px;
    gap: 24px;
  }
`;

const Item = styled.li`
  ${FlexColumn};
  gap: 24px;
  width: 100%;
  align-items: center;
  @media (width>=1000px) {
    align-items: flex-start;
  }
`;

const Picture = styled.img`
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Header = styled.div`
  ${FlexColumn};

  gap: 8px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: column;
  @media (width>=500px) {
    flex-direction: row;
  }
`;

const Title = styled(TextMainXL)`
  text-align: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Price = styled(TextMainXL)``;

const RatingWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  flex-direction: column;
  @media (width>=380px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
  @media (width>=768px) {
    justify-content: flex-start;
  }
`;

const Description = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--Text);
  font-size: 16px;
  line-height: 24px;
`;
