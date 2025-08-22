import styled from "styled-components";

export const CatalogCardPlaceholder = () => (
  <PlaceholderWrapper>No camper available</PlaceholderWrapper>
);

const PlaceholderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: var(--Gray-Light);
  font-size: 18px;
  padding: 50px;
  white-space: nowrap;
  border-radius: 20px;
  border: 1px solid var(--Gray-Light);
  background: var(--White);
  width: 100%;
  height: 50dvh;
`;
