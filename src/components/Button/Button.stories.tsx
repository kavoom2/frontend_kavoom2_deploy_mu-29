import { ShoppingBagIcon } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Common/Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: "Button",
    variant: "solid",
    size: "medium",
    shouldFitContainer: false,
    type: "button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground = (args: Story["args"]) => {
  return <Button {...args} />;
};

export const Variants = (args: Story["args"]) => {
  return (
    <div>
      <Button {...args} variant="solid" />
      <Button {...args} variant="ghost" />
    </div>
  );
};

export const AsLink = (args: Story["args"]) => {
  return (
    <div>
      <Button
        {...args}
        href="https://www.google.com"
        target="_blank"
        type="reset"
      />
    </div>
  );
};

export const Sizes = (args: Story["args"]) => {
  return (
    <div>
      <Button {...args} size="medium" />
      <Button {...args} size="small" />
    </div>
  );
};

export const FitToContainer = (args: Story["args"]) => {
  return (
    <div>
      <Button {...args} shouldFitContainer />
    </div>
  );
};

export const PrefixAndSuffixIcons = (args: Story["args"]) => {
  return (
    <div style={{ display: "flex" }}>
      <Button {...args} iconBefore={<ShoppingBagIcon />} />
      <Button {...args} iconAfter={<ShoppingBagIcon />} />
      <Button
        {...args}
        iconBefore={<ShoppingBagIcon />}
        iconAfter={<ShoppingBagIcon />}
      />
    </div>
  );
};

export const InteractionStatus = (args: Story["args"]) => {
  return (
    <div>
      <Button {...args} disabled />
      <Button {...args} loading />
    </div>
  );
};
