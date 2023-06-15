import type { Meta, Story } from "@storybook/react";
import TotalPriceDescriptions, {
  TotalPriceDescriptionsProps,
} from "./TotalPriceDescriptions";

const meta: Meta<typeof TotalPriceDescriptions> = {
  title: "Carts/Components/TotalPriceDescriptions",
  component: TotalPriceDescriptions,
  tags: ["autodocs"],
  args: {
    cartedProductItemList: [
      {
        item_no: 122997,
        item_name: "스탠리 클래식 런치박스",
        detail_image_url:
          "https://img.29cm.co.kr/contents/itemDetail/201702/cut4_320170216150109.jpg?width=500",
        price: 75000,
        order_count: 1,
        min_order_count: 1,
        max_order_count: 100,
        availableCoupon: false,
      },
      {
        item_no: 768848,
        item_name: "[STANLEY] GO CERAMIVAC 진공 텀블러/보틀 473ml",
        detail_image_url:
          "https://img.29cm.co.kr/next-product/2020/11/23/18a5303591f446e79b806945347e7473_20201123143211.jpg?width=500",
        price: 42000,
        order_count: 1,
        min_order_count: 1,
        max_order_count: 100,
      },
      {
        item_no: 552913,
        item_name: "LEXON 렉슨 MINA 미니 조명 - LH60",
        detail_image_url:
          "https://img.29cm.co.kr/next-product/2020/08/05/11ba8acd4ca645729666088309248920_20200805083231.jpg?width=500",
        price: 240000,
        order_count: 1,
        min_order_count: 1,
        max_order_count: 100,
      },
    ],
    selectedItems: [122997, 552913],
    selectedCoupon: {
      type: "rate",
      title: "10% 할인 쿠폰",
      discountRate: 10,
    },
  },
};

export default meta;

export const Playground: Story<TotalPriceDescriptionsProps> = (args) => {
  return (
    <div>
      <TotalPriceDescriptions {...args} />
    </div>
  );
};
