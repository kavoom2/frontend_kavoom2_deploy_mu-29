import { getCartListQuery } from "@/features/carts";
import { getProductListQuery } from "@/features/products";
import { HydrateOnClient, getQueryClient } from "@/libs/reactQuery";
import { dehydrate } from "@tanstack/query-core";
import ProductList from "./product-list";

export default async function ProductsPage() {
  const queryClient = getQueryClient();

  try {
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
  } catch (error) {
    // TODO: 에러 페이지를 구현합니다.
    return <div>ERROR!</div>;
  }
}
