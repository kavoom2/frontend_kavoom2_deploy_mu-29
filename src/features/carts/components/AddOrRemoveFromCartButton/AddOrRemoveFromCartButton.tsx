import Button from "@/components/Button";
import { CartCheckedIcon, CartUncheckedIcon } from "@/icons";
import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./AddOrRemoveFromCartButton.module.scss";

export interface AddOrRemoveFromCartButtonProps {
  /**
   * 카트에 해당 제품이 추가되었는지 여부
   */
  isAddedToCart: boolean;
  /**
   * 제품 번호
   */
  itemNo: number;
  /**
   * 카트에 제품을 추가하거나 제거할 때 호출되는 함수
   */
  toggleCart?: (nextIsAddedToCart: boolean, itemNo: number) => void;
  /**
   * 버튼 클릭 시 호출되는 함수
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  "data-testid"?: string;
}

const AddOrRemoveFromCartButton: React.FC<AddOrRemoveFromCartButtonProps> = ({
  isAddedToCart,
  itemNo,
  toggleCart,
  onClick,
  className,
  "data-testid": dataTestid,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["is-added-to-cart"]]: isAddedToCart,
    },
    className,
  );

  const composedOnClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();

    onClick?.(event);
    toggleCart?.(!isAddedToCart, itemNo);
  };

  const iconNode = isAddedToCart ? <CartCheckedIcon /> : <CartUncheckedIcon />;
  const ariaLabel = isAddedToCart ? "장바구니에서 제거하기" : "장바구니에 담기";

  return (
    <Button
      variant="ghost"
      size="small"
      iconBefore={iconNode}
      onClick={composedOnClick}
      aria-label={ariaLabel}
      className={mainClassNames}
      data-testid={dataTestid}
    />
  );
};

export default AddOrRemoveFromCartButton;
