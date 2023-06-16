import useToggle from "@/hooks/useToggle";
import type { Meta, Story } from "@storybook/react";
import Modal, { ModalProps } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Common/Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

export const Playground: Story<ModalProps> = (args) => {
  const [isOpen, toggleModal] = useToggle(false);

  return (
    <div>
      <button onClick={toggleModal}>Toggle Modal</button>

      <Modal {...args} isOpen={isOpen} toggleModal={toggleModal}>
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
              onClick: () => console.log("확인하였습니다."),
            },
          ]}
        >
          <h1>모달 콘텐츠</h1>
        </Modal.Body>
      </Modal>
    </div>
  );
};
