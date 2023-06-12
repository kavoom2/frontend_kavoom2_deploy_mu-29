"use client";

import AspectRatio from "@/components/AspectRatio";
import { useGetCartListQuery } from "@/features/carts";
import { useGetProductListQuery } from "@/features/products";
import Image from "next/image";
import { useEffect } from "react";

export default function ProductList() {
  const getProductListQuery = useGetProductListQuery({ limit: 5 });
  const getCartListQuery = useGetCartListQuery();

  useEffect(() => {
    if (getProductListQuery.hasNextPage) {
      getProductListQuery.fetchNextPage();
    }
  }, [getProductListQuery.dataUpdatedAt]);

  return (
    <div>
      {getProductListQuery.data?.productItems &&
        getProductListQuery.data.productItems.map((product) => (
          <div key={product.item_no}>
            <div>{product.item_no}</div>
            <div>{product.item_name}</div>
            <div>{product.price}</div>
            <div>{product.score}</div>
            <div>{product.detail_image_url}</div>
            <AspectRatio ratio={1} width={200}>
              <Image
                src={product.detail_image_url}
                alt={product.item_name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </AspectRatio>
          </div>
        ))}
    </div>
  );
}
