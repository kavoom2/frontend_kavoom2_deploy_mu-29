import { Children, cloneElement, isValidElement, useState } from "react";

const RenderingHookControls = ({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) => {
  const [renderKey, setRenderKey] = useState(1);
  const [renderCount, setRenderCount] = useState(1);

  return (
    <div key={renderKey}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(child as React.ReactElement, {
          key: renderKey,
        });
      })}
      <hr />

      <div>
        <button onClick={() => setRenderCount((prev) => prev + 1)}>
          Rerender Hook - count: {renderCount}
        </button>

        <button
          onClick={() => setRenderKey((prev) => prev + 1)}
          style={{ marginLeft: "4px" }}
        >
          Remount Hooks - count: {renderKey}
        </button>
      </div>
    </div>
  );
};

export default RenderingHookControls;
