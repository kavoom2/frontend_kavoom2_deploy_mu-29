import { useMutation, useQueryClient } from "@tanstack/react-query";
import getCartListQuery, {
  GetCartListQueryFnData,
} from "../queries/getCartListQuery";
import updateCartItemQuery from "../queries/updateCartItemQuery";
import { getOptimisticCartListWhenUpdated } from "./_utils/updateCartItem";

function useUpdateCartItemQuery() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    updateCartItemQuery.queryKey(),
    updateCartItemQuery.queryFn(),
    {
      onMutate: async (variables) => {
        queryClient.cancelQueries(getCartListQuery.queryKey());

        // 이전 장바구니 목록 스냅샷을 가져옵니다.
        const previousCartListData =
          queryClient.getQueryData<GetCartListQueryFnData>(
            getCartListQuery.queryKey(),
          );

        // 스냅샷이 존재하는 경우 Optimistic 업데이트합니다.
        if (previousCartListData) {
          queryClient.setQueryData(
            getCartListQuery.queryKey(),
            getOptimisticCartListWhenUpdated(previousCartListData, {
              item_no: variables.itemNo,
              order_count: variables.orderCount,
            }),
          );
        }

        return previousCartListData;
      },
      onSuccess: (data, _variables, context) => {
        // Optimistic 업데이트된 장바구니 목록을 서버 데이터와 동기화합니다.
        if (context) {
          queryClient.setQueryData(
            getCartListQuery.queryKey(),
            getOptimisticCartListWhenUpdated(context, data),
          );
        }
      },
      onError: (_error, _variables, context) => {
        // 서버에 장바구니 추가를 실패한 경우, 이전 장바구니 목록으로 롤백합니다.
        if (context) {
          queryClient.setQueryData(getCartListQuery.queryKey(), context);
          queryClient.invalidateQueries(getCartListQuery.queryKey());
        }
      },
    },
  );

  return mutation;
}

export default useUpdateCartItemQuery;
