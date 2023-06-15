import useToggle from "@/hooks/useToggle";
import type { Meta, Story } from "@storybook/react";
import CouponSelectModal, { CouponSelectModalProps } from "./CouponSelectModal";

const meta: Meta<typeof CouponSelectModal> = {
  title: "Coupons/Components/CouponSelectModal",
  component: CouponSelectModal,
  tags: ["autodocs"],
  args: {
    defaultSelectdCouponId: "0",
    coupons: [
      {
        type: "rate",
        title: "10% 할인 쿠폰",
        discountRate: 10,
      },
      {
        type: "amount",
        title: "10,000원 할인 쿠폰",
        discountAmount: 10000,
      },
    ],
  },
};

export default meta;

export const Playground: Story<CouponSelectModalProps> = (args) => {
  const [isOpen, toggleModal] = useToggle(false);

  return (
    <div>
      <button onClick={toggleModal}>Toggle Modal</button>

      <CouponSelectModal
        {...args}
        isOpen={isOpen}
        toggleModal={toggleModal}
        onConfirmCoupon={(coupon) => {
          console.log(coupon);
        }}
      />
    </div>
  );
};

export const EmptyCollection: Story<CouponSelectModalProps> = (args) => {
  const [isOpen, toggleModal] = useToggle(false);

  return (
    <div>
      <button onClick={toggleModal}>Toggle Modal</button>

      <CouponSelectModal
        {...args}
        isOpen={isOpen}
        toggleModal={toggleModal}
        coupons={[]}
      />
    </div>
  );
};
