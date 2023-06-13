import classNames from "classnames";
import styles from "./Text.module.scss";

// Text 요소의 색상 및 크기는 지정하지 않습니다.
// - 디자인 시스템 상에 계층에 따른 색상 및 크기가 명확하게 정의되어 있지 않습니다.

type As = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
>;

type TextStyles = React.CSSProperties & {
  "--text-max-lines"?: number;
};

export interface TextProps {
  /**
   * 렌더링할 태그를 지정합니다.
   */
  as?: As;
  /**
   * 최대 줄 수를 지정합니다.
   */
  maxLines?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  "data-testid"?: string;
}

const Text: React.FC<TextProps> = ({
  as = "span",
  maxLines,
  className,
  style,
  children,
  "data-testid": dataTestId,
}) => {
  const Tag = as;

  const hasMaxLines = maxLines && maxLines > 0;

  const mainClassNames = classNames(
    {
      [styles["text-ellipsis"]]: hasMaxLines,
    },
    className,
  );

  const mainStyles: TextStyles = {
    ...style,
    "--text-max-lines": hasMaxLines ? maxLines : undefined,
  };

  return (
    <Tag className={mainClassNames} style={mainStyles} data-testid={dataTestId}>
      {children}
    </Tag>
  );
};

export default Text;
