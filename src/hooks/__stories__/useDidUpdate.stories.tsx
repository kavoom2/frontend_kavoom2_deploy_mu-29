import { RenderingHookControls } from "@/libs/storybook";
import type { Story } from "@storybook/react";
import { useState } from "react";
import useDidUpdate from "../useDidUpdate";

interface DemoProps {}

const Demo = (props: DemoProps) => {
  const [counter, setCounter] = useState(0);
  const [didUpdateEffectTimestamp, setDidUpdateEffectTimestamp] = useState<
    number | null
  >(null);

  useDidUpdate(() => {
    setDidUpdateEffectTimestamp(Date.now());
  }, [counter]);

  return (
    <div>
      <div>Run useDidUpdate effect by counter: {didUpdateEffectTimestamp}</div>
      <div>Last render timestamp: {Date.now()}</div>

      <div>
        <button onClick={() => setCounter((prev) => prev + 1)}>
          increment counter
        </button>
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
  title: "Common/Hooks/useDidUpdate",
  component: DemoWithControls,
  tags: ["autodocs"],
};

export default meta;

export const Playground: Story<DemoProps> = (args) => {
  return <DemoWithControls {...args} />;
};
