import classNames from "classnames";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductCardListLayout.module.scss";

export interface ProductCardProps {
  children?: React.ReactNode;
  className?: string;
}

const ProductCardListLayout: React.FC<ProductCardProps> = ({
  children,
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return <ul className={mainClassNames}>{children}</ul>;
};

export default ProductCardListLayout;
