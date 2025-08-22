import { Rating } from "@UI";
import type { Review } from "@type/camperApiTypes";
import styled from "styled-components";

export const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <List id="Reviews">
      {reviews.map((review) => {
        const name = review.reviewer_name;
        const rating = review.reviewer_rating;
        const comment = review.comment;
        return (
          <Box key={comment}>
            <Header>
              <Avatar>{name[0].toUpperCase()}</Avatar>
              <NameWrapper>
                <AuthorName>{name}</AuthorName>
                <Rating rating={rating} type="Rating" />
              </NameWrapper>
            </Header>
            <Description>{comment}</Description>
          </Box>
        );
      })}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 44px;
  padding-block: 12px;

  max-height: 100%;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: var(--Badges) transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--Badges);
    border-radius: 4px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: var(--Badges);
  color: var(--Button);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
const AuthorName = styled.span`
  color: var(--Main);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
const Description = styled.span`
  color: var(--Text);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;
