import axios from "axios";

export interface DeleteCartItemQueryFnData {
  success: boolean;
}

const deleteCartItemQuery = {
  queryKey: () => {
    return ["deleteCartItem"];
  },
  queryFn: () => {
    return async function (variables: {
      itemNo: number;
    }): Promise<DeleteCartItemQueryFnData | never> {
      const { data } = await axios.delete(
        `http://localhost:3000/api/carts/${variables.itemNo}`,
      );

      return data;
    };
  },
};

export default deleteCartItemQuery;
