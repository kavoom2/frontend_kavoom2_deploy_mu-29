import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Common/Component/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    "data-testid": {
      table: {
        disable: true,
      },
    },
    maxLines: {
      control: {
        type: "number",
        min: 0,
      },
    },
  },
  args: {
    as: "h1",
    children: "Text",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Playground = (args: Story["args"]) => {
  return <Text {...args} />;
};

export const Polymorphic = (args: Story["args"]) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Text {...args} as="h1">
        h1
      </Text>
      <Text {...args} as="h2">
        h2
      </Text>
      <Text {...args} as="h3">
        h3
      </Text>
      <Text {...args} as="h4">
        h4
      </Text>
      <Text {...args} as="h5">
        h5
      </Text>
      <Text {...args} as="h6">
        h6
      </Text>
      <Text {...args} as="span">
        span
      </Text>
      <Text {...args} as="p">
        p
      </Text>
    </div>
  );
};

export const TextEllipsis = (args: Story["args"]) => {
  return (
    <div style={{ maxWidth: "400px" }}>
      <Text {...args} maxLines={args?.maxLines ?? 2}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </div>
  );
};
