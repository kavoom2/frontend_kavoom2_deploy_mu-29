import { AddCartItemQueryFnData } from "../../queries/addCartItemQuery";
import { GetCartListQueryFnData } from "../../queries/getCartListQuery";

export function getOptimisticCartListWhenAdded(
  prevCartListData: GetCartListQueryFnData,
  addedCartItemData: AddCartItemQueryFnData,
) {
  return {
    ...prevCartListData,
    cartItems: [...prevCartListData.cartItems, addedCartItemData],
  };
}
