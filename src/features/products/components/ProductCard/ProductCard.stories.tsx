import type { Meta, Story } from "@storybook/react";
import ProductCardListLayout from "../ProductCardListLayout/ProductCardListLayout";
import ProductCard, { ProductCardProps } from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Products/Components/ProductCard + ProductCardListLayout",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
  },
  args: {
    itemName: "[STANLEY] 스탠리 클래식 진공 캠프머그 473미리",
    detailImageUrl:
      "https://img.29cm.co.kr/next-product/2020/11/23/82731cfe8a6a41d6a775556333432c93_20201123165022.jpg?width=500",
    price: 44000,
  },
};

export default meta;

export const Playground: Story<ProductCardProps> = (args) => {
  return (
    <ProductCardListLayout>
      <li>
        <ProductCard {...args} />
      </li>
      <li>
        <ProductCard {...args} />
      </li>
      <li>
        <ProductCard {...args} />
      </li>
      <li>
        <ProductCard {...args} />
      </li>
      <li>
        <ProductCard {...args} />
      </li>
    </ProductCardListLayout>
  );
};

export const Placeholder: Story<ProductCardProps> = (args) => {
  return (
    <ProductCardListLayout>
      <li>
        <ProductCard.Placeholder {...args} />
      </li>
      <li>
        <ProductCard.Placeholder {...args} />
      </li>
      <li>
        <ProductCard.Placeholder {...args} />
      </li>
      <li>
        <ProductCard.Placeholder {...args} />
      </li>
      <li>
        <ProductCard.Placeholder {...args} />
      </li>
      <li>
        <ProductCard.Placeholder {...args} />
      </li>
    </ProductCardListLayout>
  );
};
