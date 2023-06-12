import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import getCartListQuery, {
  GetCartListQueryData,
  GetCartListQueryFnData,
} from "../queries/getCartListQuery";

function useGetCartListQuery() {
  const getQuery = useQuery(
    getCartListQuery.queryKey(),
    getCartListQuery.queryFn(),
    {
      staleTime: 1000 * 60 * 1,
      cacheTime: 1000 * 60 * 1,
      select: useCallback(
        (data: GetCartListQueryFnData) => ({
          ...data,
          cartItemsMap:
            data?.cartItems?.reduce((acc, cartItem) => {
              acc[cartItem.item_no] = cartItem.order_count;
              return acc;
            }, {} as GetCartListQueryData["cartItemsMap"]) || {},
        }),
        [],
      ),
    },
  );

  return getQuery as typeof getQuery & {
    data: GetCartListQueryData;
  };
}

export default useGetCartListQuery;
