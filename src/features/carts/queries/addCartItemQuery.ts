import { apiInstance } from "@/libs/axios";

export interface AddCartItemQueryFnData {
  item_no: number;
  order_count: number;
  min_order_count: number;
  max_order_count: number;
}

export interface AddCartItemVariables {
  itemNo: number;
  orderCount: number;
}

const addCartItemQuery = {
  queryKey: () => {
    return ["addCartItem"];
  },
  queryFn: () => {
    return async function (
      variables: AddCartItemVariables,
    ): Promise<AddCartItemQueryFnData | never> {
      const { data } = await apiInstance.post(`carts/${variables.itemNo}`, {
        data: {
          order_count: variables.orderCount,
        },
      });

      return data;
    };
  },
};

export default addCartItemQuery;
