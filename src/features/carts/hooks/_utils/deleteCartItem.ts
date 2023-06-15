import { GetCartListQueryFnData } from "../../queries/getCartListQuery";

export function getOptimisticCartListWhenDeleted(
  prevCartListData: GetCartListQueryFnData,
  deletedCartItemNo: number,
) {
  return {
    ...prevCartListData,
    cartItems: prevCartListData.cartItems.filter(
      (cartItem) => cartItem.item_no !== deletedCartItemNo,
    ),
  };
}
