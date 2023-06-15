import { apiInstance } from "@/libs/axios";
import { CartItem, CartedProductItem } from "@/mockers/types";

export interface GetCartListQueryFnData {
  cartItems: CartedProductItem[];
  totalCartItems: number;
  maxCartItems: number;
}

export interface GetCartListQueryData {
  cartItems: CartedProductItem[];
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
      const { data } = await apiInstance.get("carts");

      return data;
    };
  },
};

export default getCartListQuery;
