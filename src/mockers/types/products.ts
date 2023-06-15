export interface ProductItem {
  /** 제품 고유 ID */
  item_no: number;
  /** 제품 이름 */
  item_name: string;
  /** 제품 상세 이미지 URL */
  detail_image_url: string;
  /** 제품 가격 */
  price: number;
  /** 제품 평점 */
  score: number;
  /** 쿠폰 사용 가능 여부 */
  availableCoupon?: boolean;
}

export interface ProductItemsWithUserSelect extends ProductItem {
  /** 장바구니에 담겨있는지 여부 */
  added_to_cart: boolean;
  /** 주문 가능한 최소 수량 */
  min_order_count: number;
  /** 주문 가능한 최대 수량 */
  max_order_count: number;
}
