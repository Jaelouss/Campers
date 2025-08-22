import { CustomButton } from "@UI";

interface PaginationButtonProps {
  isEndOfList: boolean;
  onLoadMore: () => void;
}

export const Pagination = ({
  isEndOfList,
  onLoadMore,
}: PaginationButtonProps) => {
  return (
    <CustomButton
      isEndOfList={isEndOfList}
      type="Load more"
      onClick={onLoadMore}
    />
  );
};
