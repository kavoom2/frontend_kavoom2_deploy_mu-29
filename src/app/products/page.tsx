import { getCartListQuery } from "@/features/carts";
import { getProductListQuery } from "@/features/products";
import { HydrateOnClient, getQueryClient } from "@/libs/reactQuery";
import { dehydrate } from "@tanstack/query-core";
import ProductList from "./product-list";

export default async function ProductsPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      getProductListQuery.queryKey(),
      getProductListQuery.queryFn(),
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
}
