"use client";

import {
  AddOrRemoveFromCartButton,
  useAddCartItemQuery,
  useDeleteCartItemQuery,
  useGetCartListQuery,
} from "@/features/carts";
import {
  ProductCard,
  ProductCardListLayout,
  useGetProductListQuery,
} from "@/features/products";
import useDidUpdate from "@/hooks/useDidUpdate";
import useIntersection from "@/hooks/useIntersection";
import useToastEmitter from "@/hooks/useToastEmitter";
import { AxiosError } from "axios";
import { memo, useCallback, useRef } from "react";
import isDeepEqual from "react-fast-compare";
import styles from "./styles.module.scss";

// 무한 스크롤 기반으로 Pagination을 처리하므로
// 리스트가 많아지는 상황을 가정하여 Memoization을 적용합니다.
const MemoedProductCard = memo(ProductCard, isDeepEqual);
const MemoedAddOrRemoveFromCartButton = memo(AddOrRemoveFromCartButton);

export default function ProductList() {
  // Query: 제품 목록 조회
  const getProductListQuery = useGetProductListQuery();

  // Query: 장바구니 목록 조회
  const getCartListQuery = useGetCartListQuery();

  // Query: 장바구니 아이템 추가 + 삭제
  const addCartItemQuery = useAddCartItemQuery();
  const deleteCartItemQuery = useDeleteCartItemQuery();

  // Hooks: Toast Emitter
  const toastEmitter = useToastEmitter();

  const toggleCart = useCallback(
    async (nextIsAddedToCart: boolean, itemNo: number) => {
      try {
        if (nextIsAddedToCart) {
          await addCartItemQuery.mutateAsync({
            itemNo,
            orderCount: 1,
          });

          return;
        }

        await deleteCartItemQuery.mutateAsync({
          itemNo,
        });
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          toastEmitter.error(
            "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
          );
          return;
        }

        if (error?.response?.status == 400) {
          toastEmitter.error(error.response?.data?.error);
          return;
        }

        toastEmitter.error(
          "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
        );
      }
    },
    [
      addCartItemQuery.mutateAsync,
      deleteCartItemQuery.mutateAsync,
      toastEmitter,
    ],
  );

  return (
    <>
      <ProductCardListLayout className={styles["product-list"]}>
        {/* 제품 목록 - View */}
        {getProductListQuery.data?.productItems &&
          getProductListQuery.data.productItems.map((product) => (
            <li key={product.item_no}>
              <MemoedProductCard
                itemName={product.item_name}
                detailImageUrl={product.detail_image_url}
                price={product.price}
                actions={[
                  <MemoedAddOrRemoveFromCartButton
                    key="add-or-remove-from-cart-action"
                    itemNo={product.item_no}
                    isAddedToCart={
                      getCartListQuery.data?.cartItemsMap?.[product.item_no] > 0
                    }
                    className={styles["product-action-cart-button"]}
                    toggleCart={toggleCart}
                  />,
                ]}
              />
            </li>
          ))}

        {/* 제품 목록 - Placeholder */}
        {getProductListQuery.isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, index) => (
            <li key={`productcard-placeholder-${index}`}>
              <ProductCard.Placeholder />
            </li>
          ))}
      </ProductCardListLayout>

      {/* 인피니트 스크롤 Fetcher */}
      <InfiniteScrollFetchTrigger />
    </>
  );
}

const InfiniteScrollFetchTrigger = () => {
  // Query: 제품 목록 조회
  const getProductListQuery = useGetProductListQuery();

  // Hooks: Intersection Observer
  const fetchTriggerRef = useRef<HTMLDivElement>(null);
  const intersectionObserverEntry = useIntersection(fetchTriggerRef);

  const shouldFetchNextPage =
    intersectionObserverEntry?.isIntersecting &&
    getProductListQuery.hasNextPage &&
    !getProductListQuery.isFetchingNextPage;

  // Side Effect: 다음 페이지의 제품 목록을 조회합니다.
  useDidUpdate(() => {
    if (shouldFetchNextPage) {
      getProductListQuery.fetchNextPage();
    }
  }, [shouldFetchNextPage]);

  return (
    <div
      className={styles["infinite-scroll-fetch-trigger"]}
      ref={fetchTriggerRef}
    />
  );
};
