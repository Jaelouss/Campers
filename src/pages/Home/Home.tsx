import styled, { css } from "styled-components";
import heroFallback from "@assets/images/hero.jpg";
import hero from "@assets/images/hero.webp";
import hero2x from "@assets/images/hero-2x.webp";
import { CustomButton } from "@components/UI/CustomButton";

export const Home = () => {
  return (
    <Section>
      <Container $gap="100px">
        <WrapperText $gap="20px">
          <Title>Campers of your dreams</Title>
          <SubTitle>You can find everything you want in our catalog</SubTitle>
        </WrapperText>
        <CustomButton type="View Now" />
      </Container>
    </Section>
  );
};

const FlexColumn = css<{ $gap?: string; $align?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "0"};
  align-items: ${({ $align }) => $align || "flex-start"};
`;

const TypographyBaseStyles = css`
  color: var(--Inputs);
  font-weight: 600;
  line-height: 32px;
`;

const Section = styled.section`
  background-image: url(${heroFallback});
  background-image: image-set(
    url(${hero}) 1x,
    url(${hero2x}) 2x,
    url(${heroFallback}) 1x
  );
  background-size: cover;
  background-position: center;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 150px 16px 0;

  @media (min-width: 500px) {
    padding: 260px 32px 0;
  }
  @media (min-width: 768px) {
    padding: 260px 64px 0;
  }
`;

const Container = styled.div<{ $gap?: string; $align?: string }>`
  ${FlexColumn};
  max-width: 1440px;
  width: 100%;

  @media (min-width: 768px) {
    gap: 20px;
    padding: 0 16px;
  }
`;

const WrapperText = styled.div<{ $gap?: string; $align?: string }>`
  ${FlexColumn};
  align-self: stretch;

  @media (min-width: 500px) {
    gap: 16px;
  }
`;

const Title = styled.h1`
  ${TypographyBaseStyles};
  font-size: 48px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SubTitle = styled.span`
  ${TypographyBaseStyles};
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
