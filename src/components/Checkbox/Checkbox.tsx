import { CheckboxCheckedIcon } from "@/icons";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckboxProps as RadixCheckboxProps } from "@radix-ui/react-checkbox";
import classNames from "classnames";
import { forwardRef, useId } from "react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends RadixCheckboxProps {
  label?: React.ReactNode;
  "data-testid"?: string;
}

const Checkbox = forwardRef(
  (
    {
      label,
      "data-testid": dataTestId,
      className,
      ...restProps
    }: CheckboxProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const checkboxId = useId();

    const hasLabelNode = label !== undefined && label !== null;
    const inenrCheckboxId = hasLabelNode ? checkboxId : undefined;

    const mainClassNames = classNames(
      {
        [styles.main]: true,
      },
      className,
    );

    return (
      <div className={mainClassNames}>
        <RadixCheckbox.Root
          {...restProps}
          id={inenrCheckboxId}
          className={styles["checkbox-root"]}
          ref={ref}
          data-testid={dataTestId}
        >
          <RadixCheckbox.Indicator className={styles["checkbox-indicator"]}>
            <CheckboxCheckedIcon />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>

        {hasLabelNode && (
          <label className={styles.label} htmlFor={inenrCheckboxId}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

export default Checkbox;
