import { AddCartItemQueryFnData } from "../../queries/addCartItemQuery";
import { GetCartListQueryFnData } from "../../queries/getCartListQuery";

export function getOptimisticCartListWhenAdded(
  prevCartListData: GetCartListQueryFnData,
  addedCartItemData: AddCartItemQueryFnData,
) {
  const existingCartItem = prevCartListData.cartItems.find(
    (cartItem) => cartItem.item_no === addedCartItemData.item_no,
  );

  if (existingCartItem) {
    return {
      ...prevCartListData,
      cartItems: [
        ...prevCartListData.cartItems.filter(
          (cartItem) => cartItem.item_no !== addedCartItemData.item_no,
        ),
        {
          ...existingCartItem,
          order_count:
            existingCartItem.order_count + addedCartItemData.order_count,
        },
      ],
    };
  }

  return {
    ...prevCartListData,
    cartItems: [...prevCartListData.cartItems, addedCartItemData],
  };
}
