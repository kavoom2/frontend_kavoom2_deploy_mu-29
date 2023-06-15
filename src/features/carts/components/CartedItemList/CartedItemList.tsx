"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CounterInput from "@/components/CounterInput";
import Text from "@/components/Text";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { DeleteIcon } from "@/icons";
import { CartedProductItem } from "@/mockers/types";
import classNames from "classnames";
import Image from "next/image";
import styles from "./CartedItemList.module.scss";

export interface CartedItemListProps {
  selectedItems: number[];
  onChangeSelectedItems?: (values: number[]) => void;
  onClickDeleteItem?: (itemNo: number) => void;
  onChangeOrderCount?: (itemNo: number, orderCount: number) => void;
  cartedProductItemList: CartedProductItem[];
  className?: string;
}

const CartedItemList: React.FC<CartedItemListProps> = ({
  selectedItems = [],
  onChangeSelectedItems,
  onClickDeleteItem,
  onChangeOrderCount,
  cartedProductItemList = [],
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  const allItemsSelected = selectedItems.length === cartedProductItemList.length;

  const composedOnChangeSelectAll = () => {
    if (allItemsSelected) {
      onChangeSelectedItems?.([]);
      return;
    }

    onChangeSelectedItems?.(cartedProductItemList.map((item) => item.item_no));
  };

  const composedOnChangeItem = (itemNo: number) => () => {
    if (selectedItems.includes(itemNo)) {
      onChangeSelectedItems?.(
        selectedItems.filter((value) => value !== itemNo),
      );
      return;
    }

    onChangeSelectedItems?.([...selectedItems, itemNo]);
  };

  useIsomorphicLayoutEffect(() => {
    onChangeSelectedItems?.(
      selectedItems?.filter((itemNo) => {
        return cartedProductItemList?.find((item) => item.item_no === itemNo);
      }) ?? [],
    );
  }, [cartedProductItemList.length]);

  const composeOnClickDelete = (itemNo: number) => () => {
    onClickDeleteItem?.(itemNo);
  };

  const composeOnOrderCountChange = (itemNo: number) => (value: number) => {
    onChangeOrderCount?.(itemNo, value);
  };

  const hasCartedItems = cartedProductItemList.length > 0;

  return (
    <div className={mainClassNames}>
      {/* Description No Contents */}
      {!hasCartedItems && (
        <div className={styles["description-no-content"]}>
          <Text as="p">장바구니에 담은 상품이 없습니다.</Text>
        </div>
      )}

      {hasCartedItems && (
        <>
          {/* Description 테이블 헤더 */}
          <div className={styles["description-header"]}>
            <div
              className={classNames(
                styles["header-table-cell"],
                styles["header-table-cell-selection"],
              )}
            >
              <Checkbox
                checked={allItemsSelected}
                onClick={composedOnChangeSelectAll}
              />
            </div>

            <div className={classNames(styles["header-table-cell"])}>
              <Text as="span">상품 정보</Text>
            </div>

            <div
              className={classNames(
                styles["header-table-cell"],
                styles["header-table-cell-common"],
              )}
            >
              <Text as="span">수량</Text>
            </div>

            <div
              className={classNames(
                styles["header-table-cell"],
                styles["header-table-cell-common"],
              )}
            >
              <Text as="span">주문 금액</Text>
            </div>
          </div>

          {/* Description 콘텐츠 */}
          {cartedProductItemList.map((item) => (
            <div key={item.item_no} className={styles["description-card"]}>
              <div
                className={classNames(
                  styles["card-table-cell"],
                  styles["card-selection-area"],
                )}
              >
                <Checkbox
                  checked={selectedItems.includes(item.item_no)}
                  onClick={composedOnChangeItem(item.item_no)}
                />
              </div>

              <div
                className={classNames(
                  styles["card-table-cell"],
                  styles["card-item-info-area"],
                )}
              >
                <div className={styles["card-item-info-area-body"]}>
                  <div className={styles["item-info-detail-image"]}>
                    <Image
                      src={item.detail_image_url}
                      alt={item.item_name}
                      sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px"
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>

                  <div className={styles["item-info-descsriptions"]}>
                    <Text
                      className={styles["item-info-descriptions-title"]}
                      as="span"
                    >
                      {item.item_name}
                    </Text>

                    <Text
                      className={styles["item-info-descriptions-price"]}
                      as="span"
                    >
                      {item.price.toLocaleString()}원
                    </Text>
                  </div>

                  <div className={styles["item-info-actions"]}>
                    <Button
                      variant="outlined"
                      iconBefore={<DeleteIcon />}
                      size="small"
                      onClick={composeOnClickDelete(item.item_no)}
                    />
                  </div>
                </div>
              </div>

              <div
                className={classNames(
                  styles["card-table-cell"],
                  styles["card-common-area"],
                  styles["card-order-count-area"],
                )}
              >
                <CounterInput
                  value={item.order_count}
                  min={item.min_order_count}
                  max={item.max_order_count}
                  onValueChange={composeOnOrderCountChange(item.item_no)}
                />
              </div>

              <div
                className={classNames(
                  styles["card-table-cell"],
                  styles["card-common-area"],
                  styles["card-order-price-area"],
                )}
              >
                <Text>
                  <strong>
                    {(item.order_count * item.price).toLocaleString()}
                  </strong>
                  원
                </Text>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CartedItemList;
