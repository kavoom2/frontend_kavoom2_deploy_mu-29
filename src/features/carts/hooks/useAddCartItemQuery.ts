import { useMutation, useQueryClient } from "@tanstack/react-query";
import addCartItemQuery from "../queries/addCartItemQuery";
import getCartListQuery, {
  GetCartListQueryFnData,
} from "../queries/getCartListQuery";
import { getOptimisticCartListWhenAdded } from "./_utils/addCartItem";

function useAddCartItemQuery() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    addCartItemQuery.queryKey(),
    addCartItemQuery.queryFn(),
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
            getOptimisticCartListWhenAdded(previousCartListData, {
              item_no: variables.itemNo,
              order_count: variables.orderCount,
              min_order_count: 1,
              max_order_count: 10,
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
            getOptimisticCartListWhenAdded(context, data),
          );
        }
      },
      onError: (_error, _variables, context) => {
        // 서버에 장바구니 추가를 실패한 경우, 이전 장바구니 목록으로 롤백합니다.
        if (context) {
          queryClient.setQueryData(getCartListQuery.queryKey(), context);
        }
      },
      onSettled: (_data, _variables, context) => {
        if (context) {
          queryClient.invalidateQueries(getCartListQuery.queryKey());
        }
      },
    },
  );

  return mutation;
}

export default useAddCartItemQuery;
