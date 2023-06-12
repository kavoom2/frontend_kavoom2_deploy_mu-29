import classNames from "classnames";
import { forwardRef } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "solid" | "ghost";
type ButtonSize = "medium" | "small";

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  ariaLabel?: string;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  shouldFitContainer?: boolean;
  className?: string;
  "data-testid"?: string;
}

export interface NativeButtonProps extends BaseButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AnchorButtonProps extends BaseButtonProps {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button = forwardRef(
  (
    {
      variant = "solid",
      size = "medium",
      label,
      ariaLabel,
      iconAfter,
      iconBefore,
      onClick,
      disabled = false,
      loading = false,
      shouldFitContainer = false,
      className,
      type = "button",
      "data-testid": dataTestId,
      ...restProps
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const mergedDisabled = disabled || loading;

    const composedOnClick = (
      event: React.MouseEvent<
        HTMLButtonElement | HTMLAnchorElement,
        MouseEvent
      >,
    ) => {
      if (mergedDisabled) {
        event.preventDefault();
        return;
      }

      (
        onClick as React.MouseEventHandler<
          HTMLButtonElement | HTMLAnchorElement
        >
      )?.(event);
    };

    const mainClassNames = classNames(
      {
        [styles.main]: true,
        [styles[`variant-${variant}`]]: variant,
        [styles[`size-${size}`]]: size,
        [styles.loading]: loading,
        [styles.disabled]: disabled,
        [styles["fit-to-container"]]: shouldFitContainer,
      },
      className,
    );

    const contentNode = (
      <div className={styles.content}>
        {iconBefore && (
          <span className={classNames(styles.icon, "icon-before")}>
            {iconBefore}
          </span>
        )}

        {label && <span className={classNames(styles.label)}>{label}</span>}

        {iconAfter && (
          <span className={classNames(styles.icon, "icon-after")}>
            {iconAfter}
          </span>
        )}
      </div>
    );

    if (restProps.href) {
      return (
        <a
          {...restProps}
          onClick={composedOnClick}
          className={mainClassNames}
          aria-label={ariaLabel}
          aria-busy={loading}
          aria-disabled={disabled}
          tabIndex={mergedDisabled ? -1 : undefined}
          data-testid={dataTestId}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {contentNode}
        </a>
      );
    }

    return (
      <button
        {...restProps}
        onClick={composedOnClick}
        className={mainClassNames}
        aria-label={ariaLabel}
        aria-busy={loading}
        disabled={disabled}
        tabIndex={mergedDisabled ? -1 : undefined}
        type={type}
        data-testid={dataTestId}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {contentNode}
      </button>
    );
  },
);

export default Button;
