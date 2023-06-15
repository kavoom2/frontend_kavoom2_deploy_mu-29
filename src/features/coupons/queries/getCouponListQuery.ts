import { Coupon } from "@/mockers/types";
import axios from "axios";

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
      const { data } = await axios.get("http://localhost:3000/api/coupons");

      return data;
    };
  },
};

export default getCouponListQuery;
