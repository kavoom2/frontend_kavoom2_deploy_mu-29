import { Coupon } from "./types";

const coupons: Coupon[] = [
  {
    type: "rate",
    title: "10% 할인 쿠폰",
    discountRate: 10,
  },
  {
    type: "amount",
    title: "10,000원 할인 쿠폰",
    discountAmount: 10000,
  },
];

const getUserCoupons = () => ({ coupons, totalCoupons: coupons.length });

const couponsApi = {
  getUserCoupons,
};

export default couponsApi;
