import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Common/Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground = (args: Story["args"]) => {
  return <Checkbox {...args} />;
};

export const WithoutLabel = (args: Story["args"]) => {
  return <Checkbox {...args} label={undefined} />;
};

export const MultilinesLabel = (args: Story["args"]) => {
  return (
    <>
      <Checkbox
        {...args}
        label={
          <>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            <br />
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </>
        }
      />
    </>
  );
};
