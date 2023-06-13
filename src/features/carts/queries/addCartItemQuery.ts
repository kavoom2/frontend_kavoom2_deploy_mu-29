import axios from "axios";

export interface AddCartItemQueryFnData {
  item_no: number;
  order_count: number;
  min_order_count: number;
  max_order_count: number;
}

const addCartItemQuery = {
  queryKey: () => {
    return ["addCartItem"];
  },
  queryFn: () => {
    return async function (variables: {
      itemNo: number;
      orderCount: number;
    }): Promise<AddCartItemQueryFnData | never> {
      const { data } = await axios.post(
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

export default addCartItemQuery;
