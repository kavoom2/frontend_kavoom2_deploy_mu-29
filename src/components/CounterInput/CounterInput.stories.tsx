import type { Meta, StoryObj } from "@storybook/react";
import CounterInput from "./CounterInput";

const meta: Meta<typeof CounterInput> = {
  title: "Common/Components/CounterInput",
  component: CounterInput,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
  },
  args: {
    min: -Infinity,
    max: Infinity,
  },
};

export default meta;
type Story = StoryObj<typeof CounterInput>;

export const Playground = (args: Story["args"]) => {
  return <CounterInput {...args} />;
};
