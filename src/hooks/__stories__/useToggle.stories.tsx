import { RenderingHookControls } from "@/libs/storybook";
import type { Meta, Story } from "@storybook/react";
import useToggle from "../useToggle";

interface DemoProps {
  initialValue: boolean;
}

const Demo = ({ initialValue = false }: DemoProps) => {
  const [value, toggleValue] = useToggle(initialValue);

  return (
    <div>
      <div>value: {value.toString()}</div>
      <button onClick={() => toggleValue()}>toggle</button>
    </div>
  );
};

const DemoWithControls = (props: DemoProps) => {
  return (
    <RenderingHookControls>
      <Demo {...props} />
    </RenderingHookControls>
  );
};

const meta: Meta<typeof useToggle> = {
  title: "Common/Hooks/useToggle",
  component: DemoWithControls,
  tags: ["autodocs"],
  args: {
    initialValue: false,
  },
};

export default meta;

export const Playground: Story<DemoProps> = (args) => {
  return <DemoWithControls {...args} />;
};
