import type { Meta, StoryObj } from "@storybook/react";
import AspectRatio from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "Common/Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  args: {
    ratio: 1,
    shouldFitToContainer: false,
    width: 150,
    style: {
      backgroundColor: "grey",
      border: "2px solid black",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Playground = (args: Story["args"]) => {
  return <AspectRatio {...args} />;
};
