import { apiInstance } from "@/libs/axios";
import { Coupon } from "@/mockers/types";

export interface GetCartListQueryFnData {
  coupons: Coupon[];
  totalCoupons: number;
}

export interface GetCartListQueryData {
  coupons: Coupon[];
  totalCoupons: number;
}

const getCouponListQuery = {
  queryKey: () => {
    const queryKey = ["couponList"];

    return queryKey;
  },
  queryFn: () => {
    return async function (): Promise<GetCartListQueryFnData | never> {
      const { data } = await apiInstance.get("coupons");

      return data;
    };
  },
};

export default getCouponListQuery;
