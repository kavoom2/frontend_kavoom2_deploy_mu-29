import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCartItemQuery from "../queries/deleteCartItemQuery";
import getCartListQuery, {
  GetCartListQueryFnData,
} from "../queries/getCartListQuery";
import { getOptimisticCartListWhenDeleted } from "./_utils/deleteCartItemsUtils";

function useDeleteCartItemQuery() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    deleteCartItemQuery.queryKey(),
    deleteCartItemQuery.queryFn(),
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
            getOptimisticCartListWhenDeleted(
              previousCartListData,
              variables.itemNo,
            ),
          );
        }

        return previousCartListData;
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

export default useDeleteCartItemQuery;
