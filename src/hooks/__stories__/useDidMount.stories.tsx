import { RenderingHookControls } from "@/libs/storybook";
import type { Story } from "@storybook/react";
import { useState } from "react";
import useDidMount from "../useDidMount";

interface DemoProps {}

const Demo = (props: DemoProps) => {
  const [didMountEffectTimestamp, setDidMountEffectTimestamp] = useState<
    number | null
  >(null);

  useDidMount(() => {
    setDidMountEffectTimestamp(Date.now());
  });

  return (
    <div>
      <div>Run useDidMount effect timestamp: {didMountEffectTimestamp}</div>
      <div>Last render timestamp: {Date.now()}</div>
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
  title: "Common/Hooks/useDidMount",
  component: DemoWithControls,
  tags: ["autodocs"],
};

export default meta;

export const Playground: Story<DemoProps> = (args) => {
  return <DemoWithControls {...args} />;
};
