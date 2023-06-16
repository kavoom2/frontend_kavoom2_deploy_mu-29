"use client";

import Modal, { ModalProps } from "@/components/Modal";
import Radio from "@/components/Radio";
import { Coupon } from "@/mockers/types";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import styles from "./CouponSelectModal.module.scss";

export interface CouponSelectModalProps extends ModalProps {
  coupons: Coupon[];
  defaultSelectdCouponId?: string;
  onConfirmCoupon: (selectedCouponId: string) => void;
}

const CouponSelectModal: React.FC<CouponSelectModalProps> = (props) => {
  const { isOpen, toggleModal, ...couponSelectModalProps } = props;

  return (
    <Modal isOpen={props.isOpen} toggleModal={props.toggleModal}>
      <CouponSelectModalBody {...couponSelectModalProps} />
    </Modal>
  );
};

const CouponSelectModalBody: React.FC<
  Omit<CouponSelectModalProps, "isOpen" | "toggleModal">
> = ({ coupons = [], defaultSelectdCouponId, onConfirmCoupon }) => {
  const [selectedCouponId, updateSelectedCouponId] = useState(
    defaultSelectdCouponId ?? undefined,
  );

  const _onConfirmCoupon = () => {
    if (selectedCouponId !== undefined) {
      onConfirmCoupon?.(selectedCouponId);
    }
  };

  return (
    <Modal.Body
      actions={[
        {
          actionId: "cancel",
          label: "취소하기",
          variant: "outlined",
        },
        {
          actionId: "confirm",
          label: "확인하기",
          variant: "solid",
          onClick: _onConfirmCoupon,
        },
      ]}
    >
      <Radio.Group
        value={selectedCouponId}
        onValueChange={updateSelectedCouponId}
        className={styles["radio-group"]}
      >
        {coupons.map((coupon, tempCouponId) => (
          <Radio
            key={`coupon-item-${tempCouponId}`}
            value={String(tempCouponId)}
            label={coupon.title}
          />
        ))}
      </Radio.Group>
    </Modal.Body>
  );
};

export default CouponSelectModal;
