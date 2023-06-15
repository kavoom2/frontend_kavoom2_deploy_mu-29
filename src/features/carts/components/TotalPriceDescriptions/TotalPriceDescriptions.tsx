import Button from "@/components/Button";
import { CartedProductItem, Coupon } from "@/mockers/types";
import classNames from "classnames";
import styles from "./TotalPriceDescriptions.module.scss";
import {
  calculateSelectedItemDiscountPrice,
  calculateSelectedProductsPrice,
  calculateTotalPrice,
} from "./_utils/calculatePrices";

export interface TotalPriceDescriptionsProps {
  cartedProductItemList: CartedProductItem[];
  selectedItems: number[];
  selectedCoupon?: Coupon | null;
  onClickCouponApplyButton?: () => void;
  className?: string;
}

const TotalPriceDescriptions: React.FC<TotalPriceDescriptionsProps> = ({
  selectedItems = [],
  cartedProductItemList = [],
  selectedCoupon = null,
  onClickCouponApplyButton,
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  const totalSelectedItemPrice = calculateSelectedProductsPrice(
    cartedProductItemList,
    selectedItems,
  );

  const totalDiscountPrice = calculateSelectedItemDiscountPrice(
    cartedProductItemList,
    selectedItems,
    selectedCoupon,
  );

  const totalPaymentPrice = calculateTotalPrice(
    totalSelectedItemPrice,
    totalDiscountPrice,
  );

  return (
    <dl className={mainClassNames}>
      <dt className={styles["description-label"]}>총 주문 금액</dt>
      <dd className={styles["description-value"]}>
        <strong>{totalSelectedItemPrice.toLocaleString()}</strong>원
      </dd>

      <dt className={styles["description-label"]}>총 할인 금액</dt>
      <dd className={styles["description-value"]}>
        <Button
          variant="solid"
          label="쿠폰 적용하기"
          size="small"
          onClick={onClickCouponApplyButton}
          className={styles["description-value-action"]}
        />
        <strong>{totalDiscountPrice.toLocaleString()}</strong>원
      </dd>

      <dt className={styles["description-label"]}>총 결제 금액</dt>
      <dd
        className={classNames(
          styles["description-value"],
          styles["value-highlighted"],
        )}
      >
        <strong>{totalPaymentPrice.toLocaleString()}</strong>원
      </dd>
    </dl>
  );
};

export default TotalPriceDescriptions;
