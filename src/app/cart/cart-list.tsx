"use client";

import {
  CartedItemList,
  TotalPriceDescriptions,
  useDeleteCartItemQuery,
  useGetCartListQuery,
} from "@/features/carts";
import useUpdateCartItemQuery from "@/features/carts/hooks/useUpdateCartItemQuery";
import { CouponSelectModal, useGetCouponListQuery } from "@/features/coupons";
import useToastEmitter from "@/hooks/useToastEmitter";
import useToggle from "@/hooks/useToggle";
import { Coupon } from "@/mockers/types";
import { useCallback, useState } from "react";
import styles from "./styles.module.scss";

export default function CartList() {
  // Hooks: Toast Emitter
  const toastEmitter = useToastEmitter();

  // Query: 장바구니 목록 조회
  const getCartListQuery = useGetCartListQuery();

  const cartedProductItemList = getCartListQuery.data.cartItems ?? [];

  const [selectedItems, updateSelectedItems] = useState<number[]>(
    getCartListQuery.data.cartItems.map((cartItem) => cartItem.item_no) ?? [],
  );

  // Query: 쿠폰 목록 조회
  const getCouponListQuery = useGetCouponListQuery();
  const coupons = getCouponListQuery.data?.coupons ?? [];

  // Query 장바구니 아이템 업데이트
  const updateCartItemQuery = useUpdateCartItemQuery();

  const onChangeOrderCount = useCallback(
    async (itemNo: number, orderCount: number) => {
      try {
        await updateCartItemQuery.mutateAsync({
          itemNo,
          orderCount,
        });
      } catch (error) {
        toastEmitter.error("장바구니 아이템을 업데이트하는데 실패했습니다.");
      }
    },
    [updateCartItemQuery.mutateAsync, toastEmitter],
  );

  // Query: 장바구니 아이템 삭제
  const deleteCartItemQuery = useDeleteCartItemQuery();

  const onChangeDeleteItem = useCallback(
    async (itemNo: number) => {
      try {
        await deleteCartItemQuery.mutateAsync({ itemNo });
      } catch (error) {
        toastEmitter.error("장바구니 아이템을 삭제하는데 실패했습니다.");
      }
    },
    [deleteCartItemQuery.mutateAsync, toastEmitter],
  );

  // Hooks: 쿠폰 모달 및 쿠폰 선택
  const [isOpenCouponModal, toggleCouponModal] = useToggle(false);

  // 정해진 명세에는 쿠폰 ID가 정해져있지 않으므로, 임시로 Index를 String으로 변환한 값을 사용합니다.
  const [selectedCouponId, updateSelectedCouponId] = useState<
    string | undefined
  >(undefined);

  let selectedCoupon = null as Coupon | null;

  if (coupons.length > 0 && selectedCouponId !== undefined) {
    selectedCoupon = coupons[Number(selectedCouponId)];
  }

  return (
    <>
      {/* 섹션: 장바구니 목록 */}
      <section>
        <CartedItemList
          cartedProductItemList={cartedProductItemList}
          selectedItems={selectedItems}
          onChangeSelectedItems={updateSelectedItems}
          onChangeOrderCount={onChangeOrderCount}
          onClickDeleteItem={onChangeDeleteItem}
        />
      </section>

      {/* 섹션: 주문 금액 */}
      <section className={styles["total-price-descriptions"]}>
        <TotalPriceDescriptions
          cartedProductItemList={cartedProductItemList}
          selectedItems={selectedItems}
          selectedCoupon={selectedCoupon}
          onClickCouponApplyButton={toggleCouponModal}
        />
      </section>

      {/* 모달: 쿠폰 선택 */}
      <CouponSelectModal
        isOpen={isOpenCouponModal}
        toggleModal={toggleCouponModal}
        coupons={coupons}
        defaultSelectdCouponId={selectedCouponId}
        onConfirmCoupon={updateSelectedCouponId}
      />
    </>
  );
}
