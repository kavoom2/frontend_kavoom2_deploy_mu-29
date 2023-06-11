export interface CartItem {
  /** 제품 고유 ID */
  item_no: number;
  /** 장바구니에 담긴 수량 */
  order_count: number;
  /** 주문 가능한 최소 수량 */
  min_order_count: number;
  /** 주문 가능한 최대 수량 */
  max_order_count: number;
}

export interface CartItemMap {
  [item_no: number]: number;
}
