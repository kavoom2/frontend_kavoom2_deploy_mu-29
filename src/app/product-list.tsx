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
import { memo, useCallback, useRef } from "react";
import isDeepEqual from "react-fast-compare";
import styles from "./styles.module.scss";

// 무한 스크롤 기반으로 Pagination을 처리하므로
// 리스트가 많아지는 상황을 가정하여 Memoization을 적용합니다.
const MemoedProductCard = memo(ProductCard, isDeepEqual);
const MemoedAddOrRemoveFromCartButton = memo(AddOrRemoveFromCartButton);

export default function ProductList() {
  // Query: 제품 목록 조회
  const getProductListQuery = useGetProductListQuery({ limit: 5 });

  // Query: 장바구니 목록 조회
  const getCartListQuery = useGetCartListQuery();

  // Query: 장바구니 아이템 추가
  // TODO: 다음 케이스에 대하여 추가적인 처리가 필요합니다.
  // - 장바구니에 담을 수 있는 최대 물품 갯수를 초과하는 경우
  const addCartItemQuery = useAddCartItemQuery();

  // Query: 장바구니 아이템 삭제
  const deleteCartItemQuery = useDeleteCartItemQuery();

  const toggleCart = useCallback(
    (nextIsAddedToCart: boolean, itemNo: number) => {
      if (nextIsAddedToCart) {
        return addCartItemQuery.mutate({
          itemNo,
          orderCount: 1,
        });
      }

      deleteCartItemQuery.mutate({
        itemNo,
      });
    },
    [addCartItemQuery.mutate, deleteCartItemQuery.mutate],
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
                        ? true
                        : false
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
  const getProductListQuery = useGetProductListQuery({ limit: 5 });

  const fetchTriggerRef = useRef<HTMLDivElement>(null);
  const intersectionObserverEntry = useIntersection(fetchTriggerRef);

  const shouldFetchNextPage =
    intersectionObserverEntry?.isIntersecting &&
    getProductListQuery.hasNextPage &&
    !getProductListQuery.isFetchingNextPage;

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
