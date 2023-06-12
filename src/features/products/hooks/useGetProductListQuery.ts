import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import getProductListQuery, {
  GetProductListQueryData,
  GetProductListQueryFnData,
} from "../queries/getProductListQuery";

function useGetProductListQuery({ limit = 5 }: { limit?: number }) {
  const getQuery = useInfiniteQuery(
    getProductListQuery.queryKey(),
    getProductListQuery.queryFn({ limit }),
    {
      staleTime: 1000 * 10,
      cacheTime: 1000 * 10,
      getPreviousPageParam: () => undefined,
      getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
      select: useCallback((data: InfiniteData<GetProductListQueryFnData>) => {
        return {
          ...data,
          productItems: data?.pages?.flatMap((page) => page.productItems),
          totalProductItems: data?.pages?.[0]?.totalProductItems || 0,
        };
      }, []),
    },
  );

  return getQuery as typeof getQuery & {
    data: GetProductListQueryData;
  };
}

export default useGetProductListQuery;
