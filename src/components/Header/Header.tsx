import { TravelTrucks } from "@assets";
import { ROUTES } from "@constants/routes";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Link to={ROUTES.home.link}>
          <TravelTrucks className="logo" />
        </Link>
        <nav>
          <StyledNavLink to={ROUTES.home.link}>
            {ROUTES.home.label}
          </StyledNavLink>
          <StyledNavLink to={ROUTES.catalog.link}>
            {ROUTES.catalog.label}
          </StyledNavLink>
        </nav>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--Badges);
  background: var(--Inputs);
  position: absolute;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 64px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;

  @media (max-width: 420px) {
    padding: 16px;
  }
  @media (max-width: 768px) {
    padding: 16px 34px;
  }

  nav {
    display: flex;
    position: static;
    transform: none;
    gap: 16px;
    @media (width>= 420px) {
      position: absolute;
      gap: 32px;
      left: 75%;
      transform: translateX(-50%);
    }
    @media (width>= 500px) {
      left: 50%;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--Main);
  font-size: 16px;
  font-weight: 500;
  &.active {
    color: var(--Button-Hover);
  }
`;
