"use client";

import {
  AddOrRemoveFromCartButton,
  useGetCartListQuery,
} from "@/features/carts";
import {
  ProductCard,
  ProductCardListLayout,
  useGetProductListQuery,
} from "@/features/products";
import { useEffect } from "react";
import styles from "./styles.module.scss";

export default function ProductList() {
  const getProductListQuery = useGetProductListQuery({ limit: 5 });
  const getCartListQuery = useGetCartListQuery();

  useEffect(() => {
    if (getProductListQuery.hasNextPage) {
      setTimeout(() => {
        getProductListQuery.fetchNextPage();
      }, 1000);
    }
  }, [getProductListQuery.dataUpdatedAt]);

  return (
    <ProductCardListLayout className={styles["product-list"]}>
      {/* 제품 목록 - View */}
      {getProductListQuery.data?.productItems &&
        getProductListQuery.data.productItems.map((product) => (
          <li key={product.item_no}>
            <ProductCard
              itemName={product.item_name}
              detailImageUrl={product.detail_image_url}
              price={product.price}
              actions={[
                <AddOrRemoveFromCartButton
                  key="add-or-remove-from-cart-button"
                  itemNo={product.item_no}
                  isAddedToCart={
                    getCartListQuery.data?.cartItemsMap?.[product.item_no] > 0
                      ? true
                      : false
                  }
                  className={styles["product-action-cart-button"]}
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
  );
}
