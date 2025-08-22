import { Heart } from "@assets";
import { ROUTES } from "@constants/routes";
import { selectFavorites } from "@store/favorite/favoriteSelectors";
import { toggleThis } from "@store/favorite/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface Props {
  type: "Search" | "Load more" | "Send" | "View Now" | "Show more" | "Favorite";
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isEndOfList?: boolean;
}

export const CustomButton = ({ type, id, onClick, isEndOfList }: Props) => {
  const isFavorited = useSelector(selectFavorites).includes(Number(id));
  const dispatch = useDispatch();
  const toggleFavorite = (): void => {
    dispatch(toggleThis(Number(id)));
  };

  switch (type) {
    case "Favorite":
      return (
        <FavoriteBtn onClick={toggleFavorite} type="button">
          <Heart
            width="100%"
            height="100%"
            stroke={isFavorited ? "#E44848" : "#101828"}
          />
        </FavoriteBtn>
      );
    case "Search":
    case "Send":
      return (
        <SearchBtn onClick={onClick} type="submit">
          {type}
        </SearchBtn>
      );
    case "Load more":
      return (
        <LoadMoreBtn onClick={onClick} type="button">
          {isEndOfList ? "Show less" : type}
        </LoadMoreBtn>
      );
    case "View Now":
    case "Show more":
      return (
        <LinkBtn
          to={
            type === "View Now"
              ? ROUTES.catalog.link
              : `${ROUTES.details.link}${id ?? ""}`
          }
        >
          {type}
        </LinkBtn>
      );
  }
};

const buttonBaseStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  border-radius: 200px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
`;

const SearchBtn = styled.button`
  ${buttonBaseStyles};
  padding: 8px 16px;
  background: var(--Button);
  color: var(--White);
  border: none;
  width: 100%;
  @media (width>=500px) {
    padding: 12px 32px;
  }
  @media (width>=1440px) {
    padding: 16px 60px;
  }
`;

const LoadMoreBtn = styled.button`
  ${buttonBaseStyles};
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--Gray-Light);
  color: var(--Main);
  @media (width>=500px) {
    padding: 12px 24px;
  }
  @media (width>=1440px) {
    padding: 16px 32px;
  }
`;

const LinkBtn = styled(Link)`
  ${buttonBaseStyles};
  padding: 8px 24px;
  gap: 10px;
  border-radius: 200px;
  background: var(--Button);
  color: var(--White);
  @media (width>=500px) {
    padding: 12px 32px;
  }
  @media (width>=1440px) {
    padding: 16px 60px;
  }
`;
const FavoriteBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  width: 25px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
