export interface CouponRateType {
  /** 쿠폰 유형: 비율 할인 */
  type: "rate";
  /** 쿠폰 이름 */
  title: string;
  /** 할인율 [0, 100] */
  discountRate: number;
}

export interface CouponAmountType {
  /** 쿠폰 유형: 금액 할인 */
  type: "amount";
  /** 쿠폰 이름 */
  title: string;
  /** 할인 금액 */
  discountAmount: number;
}

export type Coupon = CouponRateType | CouponAmountType;
