import { GetCartListQueryFnData } from "../../queries/getCartListQuery";
import { UpdateCartItemQueryFnData } from "../../queries/updateCartItemQuery";

export function getOptimisticCartListWhenUpdated(
  prevCartListData: GetCartListQueryFnData,
  updatedCartItem: Pick<UpdateCartItemQueryFnData, "item_no" | "order_count">,
) {
  return {
    ...prevCartListData,
    cartItems: prevCartListData.cartItems.map((cartItem) => {
      if (cartItem.item_no === updatedCartItem.item_no) {
        return {
          ...cartItem,
          order_count: updatedCartItem.order_count,
        };
      }

      return cartItem;
    }),
  };
}
