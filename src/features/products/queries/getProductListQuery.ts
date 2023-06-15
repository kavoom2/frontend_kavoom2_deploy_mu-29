import { ProductItem } from "@/mockers/types";
import axios from "axios";

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
      const { data } = await axios.get("http://localhost:3000/api/products", {
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
