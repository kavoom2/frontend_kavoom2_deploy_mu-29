import { apiInstance } from "@/libs/axios";

export interface DeleteCartItemQueryFnData {
  success: boolean;
}

export interface DeleteCartItemVariables {
  itemNo: number;
}

const deleteCartItemQuery = {
  queryKey: () => {
    return ["deleteCartItem"];
  },
  queryFn: () => {
    return async function (
      variables: DeleteCartItemVariables,
    ): Promise<DeleteCartItemQueryFnData | never> {
      const { data } = await apiInstance.delete(`carts/${variables.itemNo}`);

      return data;
    };
  },
};

export default deleteCartItemQuery;
