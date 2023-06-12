import { getCartListQuery } from "@/features/carts";
import { HydrateOnClient, getQueryClient } from "@/libs/reactQuery";
import { dehydrate } from "@tanstack/query-core";

export default async function Carts() {
  const queryClient = getQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        getCartListQuery.queryKey(),
        getCartListQuery.queryFn(),
      ),
    ]);

    const dehydratedState = dehydrate(queryClient);

    return <HydrateOnClient state={dehydratedState}>장바구니!</HydrateOnClient>;
  } catch (error) {
    return <div>ERROR!</div>;
  }
}
