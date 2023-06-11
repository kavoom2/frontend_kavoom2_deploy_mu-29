import Text from "@/components/Text";
import useMeasure from "@/hooks/useMeasure";
import classNames from "classnames";
import styles from "./TopAppBar.module.scss";

export interface TopAppBarProps {
  leadingNavItems?: React.ReactNode;
  trailingNavItems?: React.ReactNode;
  headline?: string;
  className?: string;
  style?: React.CSSProperties;
  "data-testid"?: string;
}

type TopAppBarStyle = React.CSSProperties & {
  "--aside-max-width"?: string;
};

const TopAppBar: React.FC<TopAppBarProps> = ({
  leadingNavItems,
  trailingNavItems,
  headline,
  className,
  style,
  "data-testid": dataTestId,
}) => {
  const [leadingMenuRef, { width: leadingMenuWidth }] = useMeasure();
  const [trailingMenuRef, { width: trailingMenuWidth }] = useMeasure();

  const maxWidthExist = Math.max(leadingMenuWidth, trailingMenuWidth) > 0;

  const mainStyle: TopAppBarStyle = {
    ...style,
    "--aside-max-width": maxWidthExist
      ? `${Math.max(leadingMenuWidth, trailingMenuWidth)}px`
      : undefined,
  };

  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  const headlineClassNames = classNames({
    [styles.headline]: true,
    [styles["headline-with-side-menus"]]: maxWidthExist,
  });

  return (
    <header
      id="layout-primary-header"
      style={mainStyle}
      className={mainClassNames}
      data-testid={dataTestId}
    >
      <div className={styles["main-width-provider"]}>
        <div ref={leadingMenuRef} className={styles["leading-menu-items"]}>
          {leadingNavItems}
        </div>

        {headline && (
          <div className={headlineClassNames}>
            <Text tagAs="h1" className={styles["headline-text"]} maxLines={1}>
              {headline}
            </Text>
          </div>
        )}

        <div ref={trailingMenuRef} className={styles["trailing-menu-items"]}>
          {trailingNavItems}
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
