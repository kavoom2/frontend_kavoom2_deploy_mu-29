import { CartItem } from "@/mockers/types";
import axios from "axios";

export interface GetCartListQueryFnData {
  cartItems: CartItem[];
  totalCartItems: number;
  maxCartItems: number;
}

export interface GetCartListQueryData {
  cartItems: CartItem[];
  cartItemsMap: Record<CartItem["item_no"], number>;
  totalCartItems: number;
  maxCartItems: number;
}

const getCartListQuery = {
  queryKey: () => {
    const queryKey = ["cartList"];

    return queryKey;
  },
  queryFn: () => {
    return async function (): Promise<GetCartListQueryFnData | never> {
      const { data } = await axios.get("http://localhost:3000/api/carts");

      return data;
    };
  },
};

export default getCartListQuery;
