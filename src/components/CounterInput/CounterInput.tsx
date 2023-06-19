import { CounterDownIcon, CounterUpIcon } from "@/icons";
import classNames from "classnames";
import { ForwardedRef, forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import {
  NumberFormatBase,
  NumberFormatValues,
  NumericFormatProps,
  useNumericFormat,
} from "react-number-format";
import Button from "../Button";
import styles from "./CounterInput.module.scss";

export type CounterInputProps = Pick<
  NumericFormatProps,
  Exclude<
    keyof NumericFormatProps,
    | "getInputRef"
    | "isAllowed"
    | "allowNegative"
    | "displayType"
    | "type"
    | "onValueChange"
    | "prefix"
    | "suffix"
    | "inputMode"
    | "allowedDecimalSeparators"
    | "allowLeadingZeros"
    | "customInput"
  >
> & {
  "data-testid"?: string;
  min?: number;
  max?: number;
  onValueChange?: (value: number, values?: NumberFormatValues) => void;
};

const CounterInput = forwardRef(
  (
    {
      min = -Infinity,
      max = Infinity,
      onValueChange,
      "data-testid": dataTestid,
      ...restProps
    }: CounterInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const isAllowed = (values: NumberFormatValues) => {
      const { floatValue } = values;

      if (floatValue === undefined) return true;
      return floatValue >= min && floatValue <= max;
    };

    const numbericFormatProps = useNumericFormat({
      ...restProps,
      displayType: "input",
      type: "text",
      inputMode: "numeric",
      isAllowed,
      allowNegative: min < 0,
      onValueChange: (values) => {
        if (values.floatValue === undefined) {
          return;
        }

        onValueChange?.(values.floatValue, values);
      },
    });

    return (
      <NumberFormatBase
        {...numbericFormatProps}
        min={min}
        max={max}
        getInputRef={ref}
        customInput={CounterInputImpl}
        data-testid={dataTestid}
      />
    );
  },
);

const CounterInputImpl = forwardRef(
  (
    props: Exclude<
      React.InputHTMLAttributes<HTMLInputElement>,
      "min" | "max"
    > & { min: number; max: number; "data-testid"?: string },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const getSafeValueProcessed = (
      value: string,
      valueProcessor: (prevValue: number) => number = (value) => value,
    ) => {
      const safeMin = props.min ?? -Infinity;
      const safeMax = props.max ?? Infinity;

      let currentNumeric = parseInt(value, 10);
      if (Number.isNaN(currentNumeric)) {
        currentNumeric = 0;
      }

      const nextNumeric = valueProcessor(currentNumeric);
      return String(Math.min(Math.max(nextNumeric, safeMin), safeMax));
    };

    // Event Handlers
    const onCountUp = () => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.value = getSafeValueProcessed(
        inputRef.current.value,
        (value) => value + 1,
      );

      // 유효한 값인지 여부는 NumericFormat 컴포넌트에 위임합니다.
      let prevented = false;
      let stopped = false;

      const event = new Event("change");
      Object.defineProperty(event, "target", {
        value: inputRef.current,
        enumerable: true,
      });

      props.onChange &&
        props?.onChange({
          ...event,
          persist: () => {},
          nativeEvent: event,
          target: inputRef.current,
          currentTarget: inputRef.current,
          isDefaultPrevented: () => prevented,
          isPropagationStopped: () => stopped,
          preventDefault: () => {
            prevented = true;
          },
          stopPropagation: () => {
            stopped = true;
          },
        });
    };

    const onCountDown = () => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.value = getSafeValueProcessed(
        inputRef.current.value,
        (value) => value - 1,
      );

      // 유효한 값인지 여부는 NumericFormat 컴포넌트에 위임합니다.
      let prevented = false;
      let stopped = false;

      const event = new Event("change");
      Object.defineProperty(event, "target", {
        value: inputRef.current,
        enumerable: true,
      });

      props.onChange &&
        props?.onChange({
          ...event,
          persist: () => {},
          nativeEvent: event,
          target: inputRef.current,
          currentTarget: inputRef.current,
          isDefaultPrevented: () => prevented,
          isPropagationStopped: () => stopped,
          preventDefault: () => {
            prevented = true;
          },
          stopPropagation: () => {
            stopped = true;
          },
        });
    };

    const composedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = getSafeValueProcessed(event.target.value);
      props.onChange && props.onChange(event);
    };

    // Derived States
    const mergedDisabled = props.disabled || props.readOnly;

    let countDownDisabled = mergedDisabled;
    if (props.min !== undefined && Number(props.min) >= Number(props.value)) {
      countDownDisabled = true;
    }

    let coundUpDisabled = mergedDisabled;
    if (props.max !== undefined && Number(props.max) <= Number(props.value)) {
      coundUpDisabled = true;
    }

    const { className, "data-testid": dataTestid } = props;

    return (
      <div
        className={classNames(styles.main, className)}
        data-testid={dataTestid}
      >
        <Button
          iconBefore={<CounterDownIcon />}
          size="small"
          variant="outlined"
          onClick={onCountDown}
          disabled={countDownDisabled}
          className={styles["count-down"]}
        />

        <input
          {...props}
          onChange={composedOnChange}
          className={styles.input}
          ref={mergeRefs([inputRef, ref])}
        />

        <Button
          iconBefore={<CounterUpIcon />}
          size="small"
          variant="outlined"
          onClick={onCountUp}
          disabled={coundUpDisabled}
          className={styles["count-up"]}
        />
      </div>
    );
  },
);

export default CounterInput;
