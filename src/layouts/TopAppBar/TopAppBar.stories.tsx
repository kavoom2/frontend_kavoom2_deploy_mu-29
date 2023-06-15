import Button from "@/components/Button";
import { CartCheckedIcon, CartUncheckedIcon, ShoppingBagIcon } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react";
import TopAppBar from "./TopAppBar";

const meta: Meta<typeof TopAppBar> = {
  title: "Common/Layouts/TopAppBar",
  component: TopAppBar,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
  },
  args: {
    headline:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const Playground = (args: Story["args"]) => {
  return (
    <TopAppBar
      {...args}
      leadingNavItems={
        <>
          <Button label="29CM" size="medium" variant="ghost" />
          <Button label="MAIN SERVICES" size="medium" variant="ghost" />
        </>
      }
      trailingNavItems={
        <>
          <Button
            size="medium"
            variant="ghost"
            iconBefore={<ShoppingBagIcon />}
          />

          <Button
            size="medium"
            variant="ghost"
            iconBefore={<CartCheckedIcon />}
          />

          <Button
            size="medium"
            variant="ghost"
            iconBefore={<CartUncheckedIcon />}
          />
        </>
      }
    />
  );
};
