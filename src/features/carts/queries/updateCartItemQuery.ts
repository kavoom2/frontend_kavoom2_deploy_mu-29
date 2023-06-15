import axios from "axios";

export interface UpdateCartItemQueryFnData {
  item_no: number;
  order_count: number;
  min_order_count: number;
  max_order_count: number;
}

export interface UpdateCartItemVariables {
  itemNo: number;
  orderCount: number;
}

const updateCartItemQuery = {
  queryKey: () => {
    return ["updateCartItem"];
  },
  queryFn: () => {
    return async function (
      variables: UpdateCartItemVariables,
    ): Promise<UpdateCartItemQueryFnData | never> {
      const { data } = await axios.put(
        `http://localhost:3000/api/carts/${variables.itemNo}`,
        {
          data: {
            order_count: variables.orderCount,
          },
        },
      );

      return data;
    };
  },
};

export default updateCartItemQuery;
