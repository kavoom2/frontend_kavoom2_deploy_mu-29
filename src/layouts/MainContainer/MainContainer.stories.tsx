import type { Meta, StoryObj } from "@storybook/react";
import MainContainer from "./MainContainer";

const meta: Meta<typeof MainContainer> = {
  title: "Common/Layouts/MainContainer",
  component: MainContainer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainContainer>;

export const Playground = (args: Story["args"]) => {
  return (
    <MainContainer {...args}>
      <div
        style={{
          width: "100%",
          height: "500vh",
          backgroundColor: "grey",
          padding: "12px 20px",
        }}
      >
        <h1 style={{ color: "white", fontSize: "16px" }}>
          최대 너비가 정해진 Container 요소입니다.
        </h1>
      </div>
    </MainContainer>
  );
};
