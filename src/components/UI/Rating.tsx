import { StarRating } from "@assets";
import styled from "styled-components";

interface Props {
  type: "Single" | "Rating";
  reviews?: object[];
  rating: number;
}

export const Rating = ({ type, reviews, rating }: Props) => {
  const maxRating = 5;
  const clipPercent = ((maxRating - rating) / maxRating) * 100;

  switch (type) {
    case "Single":
      return (
        <Box>
          <StarRating color="var(--Rating)" stroke="var(--Rating)" />
          <Span>
            {rating} ({reviews?.length} Reviews)
          </Span>
        </Box>
      );

    case "Rating": {
      return (
        <StarsWrapper>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarRating key={i} color="var(--Badges)" stroke="var(--Badges)" />
          ))}
          <YellowBox clipPercent={clipPercent}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarRating
                key={i}
                color="var(--Rating)"
                stroke="var(--Rating)"
              />
            ))}
          </YellowBox>
        </StarsWrapper>
      );
    }
  }
};
const flexCenter = `
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  ${flexCenter};
  gap: 4px;
  position: relative;
`;

const Span = styled.span`
  color: var(--Main);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-decoration-line: underline;
`;

const StarsWrapper = styled.div`
  position: relative;
  ${flexCenter};
`;

const YellowBox = styled.div<{ clipPercent: number }>`
  position: absolute;
  top: 0;
  left: 0;
  ${flexCenter};
  clip-path: inset(0 ${({ clipPercent }) => clipPercent}% 0 0);
`;
