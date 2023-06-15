import { apiInstance } from "@/libs/axios";
import { ProductItem } from "@/mockers/types";

export interface GetProductListQueryFnData {
  nextPage: number | null;
  productItems: ProductItem[];
  totalProductItems: number;
}

export interface GetProductListQueryData {
  productItems: ProductItem[];
  totalProductItems: number;
}

const getProductListQuery = {
  queryKey: () => {
    const queryKey = ["productList"];

    return queryKey;
  },
  queryFn: () => {
    return async function ({
      pageParam = 1,
    }: {
      pageParam?: number | null;
    }): Promise<GetProductListQueryFnData | never> {
      const { data } = await apiInstance.get("products", {
        params: {
          page: pageParam,
          limit: 5,
        },
      });

      return data;
    };
  },
};

export default getProductListQuery;
