import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";
import classNames from "classnames";
import { useId } from "react";
import styles from "./Radio.module.scss";

const RadioGroup = RadixRadioGroup.Root;
RadioGroup.displayName = "Radio.Group";

export interface RadioProps extends RadioGroupItemProps {
  label?: React.ReactNode;
}

const Radio = ({ className, label, ...restProps }: RadioProps) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  const radioId = useId();

  const hasLabelNode = label !== undefined && label !== null;
  const innerRadioId = hasLabelNode ? radioId : undefined;

  return (
    <div className={mainClassNames}>
      <RadixRadioGroup.Item
        {...restProps}
        className={styles["radio-item"]}
        id={innerRadioId}
      >
        <RadixRadioGroup.Indicator className={styles["radio-indicator"]} />
      </RadixRadioGroup.Item>

      {hasLabelNode && (
        <label className={styles.label} htmlFor={innerRadioId}>
          {label}
        </label>
      )}
    </div>
  );
};

Radio.displayName = "Radio";
Radio.Group = RadioGroup;

export default Radio;
