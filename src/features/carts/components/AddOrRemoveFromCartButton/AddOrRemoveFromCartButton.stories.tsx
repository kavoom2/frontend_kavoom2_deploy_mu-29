import useToggle from "@/hooks/useToggle";
import type { Meta, Story } from "@storybook/react";
import AddOrRemoveFromCartButton, {
  AddOrRemoveFromCartButtonProps,
} from "./AddOrRemoveFromCartButton";

const meta: Meta<typeof AddOrRemoveFromCartButton> = {
  title: "Carts/Components/AddOrRemoveFromCartButton",
  component: AddOrRemoveFromCartButton,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
  },
  args: {
    isAddedToCart: false,
    itemNo: 1,
  },
};

export default meta;

export const Playground: Story<AddOrRemoveFromCartButtonProps> = (args) => {
  return (
    <div>
      <AddOrRemoveFromCartButton {...args} />
    </div>
  );
};

export const ToggleCart: Story<AddOrRemoveFromCartButtonProps> = (args) => {
  const [isAddedToCart, toggleCart] = useToggle(false);

  return (
    <div>
      <AddOrRemoveFromCartButton
        {...args}
        isAddedToCart={isAddedToCart}
        toggleCart={toggleCart}
      />
    </div>
  );
};
