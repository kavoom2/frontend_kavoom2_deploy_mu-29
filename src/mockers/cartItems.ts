import { cartConfig } from "./config";
import { CartItem, CartItemMap } from "./types";

const MAX_CART_ITEMS = cartConfig.MAX_CART_ITEMS;
const MIN_ORDER_COUNT = cartConfig.MIN_ORDER_COUNT;
const MAX_ORDER_COUNT = cartConfig.MAX_ORDER_COUNT;

const cartItems: CartItem[] = [];

export function getUserCartItemMap() {
  return cartItems.reduce((map, item) => {
    map[item.item_no] = item.order_count;
    return map;
  }, {} as CartItemMap);
}

function getUserCartItems() {
  return {
    totalCartItems: cartItems.length,
    cartItems: [...cartItems],
    maxCartItems: MAX_CART_ITEMS,
  };
}

function addUserCartItem(item_no: number, order_count: number) {
  const item = cartItems.find((item) => item.item_no === item_no);

  if (item) {
    if (item.order_count + order_count > item.max_order_count) {
      throw new Error("최대 주문 가능 개수를 초과하였습니다.");
    }

    item.order_count += order_count;

    return {
      item_no,
      order_count: item.order_count,
      min_order_count: item.min_order_count,
      max_order_count: item.max_order_count,
    };
  }

  if (cartItems.length >= MAX_CART_ITEMS) {
    throw new Error("장바구니에 담을 수 있는 최대 개수를 초과하였습니다.");
  }

  if (order_count < MIN_ORDER_COUNT) {
    throw new Error("최소 주문 가능 개수 이상 입력해야 합니다.");
  }

  if (order_count > MAX_ORDER_COUNT) {
    throw new Error("최대 주문 가능 개수를 초과하였습니다.");
  }

  cartItems.push({
    item_no,
    order_count,
    min_order_count: MIN_ORDER_COUNT,
    max_order_count: MAX_ORDER_COUNT,
  });

  return {
    item_no,
    order_count,
    min_order_count: MIN_ORDER_COUNT,
    max_order_count: MAX_ORDER_COUNT,
  };
}

function removeUserCartItem(item_no: number) {
  const index = cartItems.findIndex((item) => item.item_no === item_no);

  if (index !== -1) {
    cartItems.splice(index, 1);
    return;
  }

  throw new Error("장바구니에 해당 상품이 존재하지 않습니다.");
}

function updateUserCartItem(item_no: number, order_count: number) {
  const item = cartItems.find((item) => item.item_no === item_no);

  if (item) {
    if (order_count < item.min_order_count) {
      throw new Error("최소 주문 가능 개수 이상 입력해야 합니다.");
    }

    if (order_count > item.max_order_count) {
      throw new Error("최대 주문 가능 개수를 초과하였습니다.");
    }

    item.order_count = order_count;

    return {
      item_no,
      order_count,
      min_order_count: item.min_order_count,
      max_order_count: item.max_order_count,
    };
  }

  throw new Error("장바구니에 해당 상품이 존재하지 않습니다.");
}

const cartItemsApi = {
  getUserCartItems,
  addUserCartItem,
  removeUserCartItem,
  updateUserCartItem,
};

export default cartItemsApi;
