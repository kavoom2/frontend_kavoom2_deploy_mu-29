import { CartedProductItem, Coupon } from "@/mockers/types";

export const calculateSelectedProductsPrice = (
  cartedProductItemList: CartedProductItem[],
  selectedItems: number[],
) => {
  if (!cartedProductItemList || !selectedItems || !selectedItems.length) {
    return 0;
  }

  const selectedItemMap = selectedItems.reduce((acc, itemNo) => {
    acc[itemNo] = true;
    return acc;
  }, {} as Record<number, boolean>);

  const totalSelectedItemPrice =
    cartedProductItemList.reduce((acc, item) => {
      if (selectedItemMap[item.item_no] !== true) {
        return acc;
      }

      return acc + item.price * item.order_count;
    }, 0) ?? 0;

  return totalSelectedItemPrice;
};

export const calculateSelectedItemDiscountPrice = (
  cartedProductItemList: CartedProductItem[],
  selectedItems: number[],
  coupon: Coupon | null,
) => {
  if (!coupon) {
    return 0;
  }

  if (!cartedProductItemList || !selectedItems || !selectedItems.length) {
    return 0;
  }

  // 할인 가능한 총 가격을 계산합니다.
  const productMap = cartedProductItemList.reduce((acc, item) => {
    acc[item.item_no] = item;
    return acc;
  }, {} as Record<number, CartedProductItem>);

  const totalDiscountablePrice = selectedItems.reduce((acc, itemNo) => {
    const item = productMap[itemNo];

    // availableCoupon은 쿠폰을 사용할 수 없는 제품만 false로 명시되어 있습니다.
    if (!item || item.availableCoupon === false) {
      return acc;
    }

    return acc + item.price * item.order_count;
  }, 0);

  // TYPE: 비율 할인
  // - 할인 가능한 총 가격에서 {discountRate}%만큼 할인해야 합니다.
  if (coupon.type === "rate") {
    return Math.floor(totalDiscountablePrice * (coupon.discountRate / 100));
  }

  // TYPE: 가격 할인
  // - 할인 가능한 총 가격에서 {discountAmount}만큼 할인해야 합니다.
  // - 할인 가능한 총 가격보다 {discountAmount}가 더 크다면, 할인 가능한 총 가격만큼 할인합니다.
  return Math.min(totalDiscountablePrice, coupon.discountAmount);
};

export const calculateTotalPrice = (
  totalSelectedItemPrice: number,
  totalSelectedItemDiscountPrice: number,
) => {
  return totalSelectedItemPrice - totalSelectedItemDiscountPrice;
};
