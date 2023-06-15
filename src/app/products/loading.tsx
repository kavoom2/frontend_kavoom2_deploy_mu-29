"use client";

import { ProductCard, ProductCardListLayout } from "@/features/products";
import styles from "./styles.module.scss";

export default function ProductListLoading() {
  return (
    <ProductCardListLayout className={styles["product-list"]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={`productcard-placeholder-${index}`}>
          <ProductCard.Placeholder />
        </li>
      ))}
    </ProductCardListLayout>
  );
}
