import { getCartListQuery } from "@/features/carts";
import { getCouponListQuery } from "@/features/coupons";
import { HydrateOnClient, getQueryClient } from "@/libs/reactQuery";
import { dehydrate } from "@tanstack/query-core";
import CartList from "./cart-list";

export default async function CartPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getCartListQuery.queryKey(),
      getCartListQuery.queryFn(),
    ),
    queryClient.prefetchQuery(
      getCouponListQuery.queryKey(),
      getCouponListQuery.queryFn(),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <CartList />
    </HydrateOnClient>
  );
}
