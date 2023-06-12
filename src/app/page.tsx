import { getCartListQuery } from "@/features/carts";
import { getProductListQuery } from "@/features/products";
import { HydrateOnClient, getQueryClient } from "@/libs/reactQuery";
import { dehydrate } from "@tanstack/query-core";
import ProductList from "./product-list";

export default async function ProductListPage() {
  const queryClient = getQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchInfiniteQuery(
        getProductListQuery.queryKey(),
        getProductListQuery.queryFn({ limit: 5 }),
      ),
      queryClient.prefetchQuery(
        getCartListQuery.queryKey(),
        getCartListQuery.queryFn(),
      ),
    ]);

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrateOnClient state={dehydratedState}>
        <ProductList />
      </HydrateOnClient>
    );
  } catch (error) {
    return <div>ERROR!</div>;
  }
}
