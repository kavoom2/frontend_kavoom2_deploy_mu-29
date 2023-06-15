import type { Meta, Story } from "@storybook/react";
import { useState } from "react";
import CartedItemList, { CartedItemListProps } from "./CartedItemList";

const meta: Meta<typeof CartedItemList> = {
  title: "Carts/Components/CartedItemList",
  component: CartedItemList,
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
  },
};

export default meta;

export const Playground: Story<CartedItemListProps> = (args) => {
  const [selectedItems, onChangeSelectedItems] = useState(
    args.cartedProductItemList.map((item) => item.item_no),
  );

  return (
    <div>
      <CartedItemList
        {...args}
        selectedItems={selectedItems}
        onChangeSelectedItems={onChangeSelectedItems}
        onChangeOrderCount={(itemNo, orderCount) => {
          console.log(itemNo, orderCount);
        }}
        onClickDeleteItem={(itemNo) => {
          console.log(itemNo);
        }}
      />
    </div>
  );
};

export const EmptyCollection: Story<CartedItemListProps> = (args) => {
  return (
    <div>
      <CartedItemList {...args} cartedProductItemList={[]} />
    </div>
  );
};
