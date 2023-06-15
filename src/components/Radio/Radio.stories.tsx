import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Common/Components/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground = (_args: Story["args"] & { value: string }) => {
  const [value, updateValue] = useState<string | undefined>(undefined);

  return (
    <Radio.Group
      value={value}
      onValueChange={updateValue}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Radio value="apple" label="apple" />
      <Radio value="banana" label="banana" />
      <Radio value="pineapple" label="pineapple" />
    </Radio.Group>
  );
};
