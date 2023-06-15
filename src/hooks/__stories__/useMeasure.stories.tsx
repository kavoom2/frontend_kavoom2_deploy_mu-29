import { RenderingHookControls } from "@/libs/storybook";
import type { Story } from "@storybook/react";
import useMeasure from "../useMeasure";

interface DemoProps {}

const Demo = (props: DemoProps) => {
  const [elementRef, rect] = useMeasure();

  return (
    <div>
      <div>
        <div>{JSON.stringify(rect)}</div>
      </div>

      <div>
        <textarea ref={elementRef} />
      </div>
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

const meta = {
  title: "Common/Hooks/useMeasure",
  component: DemoWithControls,
  tags: ["autodocs"],
};

export default meta;

export const Playground: Story<DemoProps> = (args) => {
  return <DemoWithControls {...args} />;
};
