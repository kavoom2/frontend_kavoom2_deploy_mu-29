import { useQuery } from "@tanstack/react-query";
import getCouponListQuery from "../queries/getCouponListQuery";

function useGetCouponListQuery() {
  const getQuery = useQuery(
    getCouponListQuery.queryKey(),
    getCouponListQuery.queryFn(),
    {
      staleTime: 1000 * 60 * 1,
      cacheTime: 1000 * 60 * 1,
    },
  );

  return getQuery;
}

export default useGetCouponListQuery;
