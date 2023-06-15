import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("label, iconAfter, iconBefore를 렌더링해야 합니다.", () => {
    const label = "Button";
    const iconAfter = "iconAfter";
    const iconBefore = "iconBefore";

    const { getByText } = render(
      <Button label={label} iconAfter={iconAfter} iconBefore={iconBefore} />,
    );

    const labelNode = getByText(label);
    const iconAfterNode = getByText(iconAfter);
    const iconBeforeNode = getByText(iconBefore);

    expect(labelNode).toBeInTheDocument();
    expect(iconAfterNode).toBeInTheDocument();
    expect(iconBeforeNode).toBeInTheDocument();

    const labelNodeRect = labelNode.getBoundingClientRect();
    const iconAfterNodeRect = iconAfterNode.getBoundingClientRect();
    const iconBeforeNodeRect = iconBeforeNode.getBoundingClientRect();

    expect(labelNodeRect.right <= iconAfterNodeRect.left).toBe(true);
    expect(iconBeforeNodeRect.right <= labelNodeRect.left).toBe(true);
  });

  it("disabled 또는 loading 상태일 때 onClick 함수를 호출하지 않아야 합니다.", () => {
    const handleClick = jest.fn();

    const { getByRole, rerender } = render(
      <Button label="MyButton" disabled onClick={handleClick} />,
    );

    const buttonNode = getByRole("button");
    fireEvent.click(buttonNode);
    expect(handleClick).toHaveBeenCalledTimes(0);

    rerender(<Button label="MyButton" loading onClick={handleClick} />);
    fireEvent.click(buttonNode);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("href가 주어지면 a 태그로 렌더링해야 합니다.", () => {
    const { getByRole, rerender } = render(
      <Button label="MyButton" href="https://www.google.com" />,
    );

    const linkNode = getByRole("link");
    expect(linkNode).toBeInTheDocument();
    expect(linkNode).toHaveAttribute("href", "https://www.google.com");

    rerender(<Button label="MyButton" />);
    const nativeButtonNode = getByRole("button");
    expect(nativeButtonNode).toBeInTheDocument();
  });
});
