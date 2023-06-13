import AspectRatio from "@/components/AspectRatio";
import Text from "@/components/Text";
import classNames from "classnames";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductCard.module.scss";

export interface ProductCardProps {
  /**
   * 제품의 이름
   */
  itemName: string;
  /**
   * 제품의 상세 이미지 URL
   *  - 외부 이미지를 사용하는 경우 Next Config에 domains를 추가해야 합니다.
   */
  detailImageUrl: string;
  /**
   * 제품의 가격
   */
  price: number;
  /**
   * 제품 카드의 액션 버튼
   *  - 예) 장바구니 담기, 좋아요, 구매하기 등
   */
  actions?: React.ReactNode[];
  className?: string;
  "data-testid"?: string;
}

const _ProductCard: React.FC<ProductCardProps> = ({
  itemName,
  detailImageUrl,
  price,
  className,
  actions,
  "data-testid": dataTestId,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <div className={mainClassNames} data-testid={dataTestId}>
      {/* 최상단 Product Media */}
      {/* - 제품 상세 페이지는 구현하지 않으므로, '카드의 주요 Action 선택 영역'은 고려하지 않았습니다. */}
      <AspectRatio ratio={1} shouldFitToContainer>
        <Image
          src={detailImageUrl}
          alt={itemName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </AspectRatio>

      {/* Product 정보 제공 영역 */}
      <div className={styles["card-informations"]}>
        <Text as="div" maxLines={2} className={styles["product-name"]}>
          {itemName}
        </Text>

        <Text as="div" className={styles.price}>
          <strong>{price.toLocaleString()}</strong>원
        </Text>
      </div>

      {/* Product 액션 영역 */}
      {actions && actions.length > 0 && (
        <div className={styles["card-actions"]}>{actions}</div>
      )}
    </div>
  );
};

const Placeholder: React.FC<
  Pick<ProductCardProps, "className" | "data-testid">
> = ({ className, "data-testid": dataTestId }) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <div className={mainClassNames} data-testid={dataTestId}>
      {/* 최상단 Product Media */}
      <AspectRatio ratio={1} shouldFitToContainer>
        <Skeleton count={1} width="100%" height="100%" borderRadius={0} />
      </AspectRatio>

      {/* Product 정보 제공 영역 */}
      <div className={styles["card-informations"]}>
        <Text as="div" maxLines={2} className={styles["product-name"]}>
          <Skeleton count={2} />
        </Text>

        <Text as="div" className={styles.price}>
          <strong>
            <Skeleton count={1} />
          </strong>
        </Text>
      </div>
    </div>
  );
};

const ProductCard = Object.assign(_ProductCard, {
  Placeholder,
});

export default ProductCard;
