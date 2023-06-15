"use client";

import Button, { ButtonProps } from "@/components/Button";
import { Modal as ReactResponsiveModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import styles from "./Modal.module.scss";


export interface ModalAction {
  actionId: string;
  variant?: ButtonProps["variant"];
  label: string;
  onClick?: () => void;
  shouldCloseModal?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  toggleModal: (nextIsOpen?: boolean) => void;
  children?: React.ReactNode;
  actions?: ModalAction[];
}

const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <ReactResponsiveModal
      open={props.isOpen}
      onClose={props.toggleModal}
      center
      classNames={{
        modal: styles["modal-instance"],
      }}
    >
      <ModalContents {...props} />
    </ReactResponsiveModal>
  );
};

const ModalContents: React.FC<Omit<ModalProps, "isOpen">> = ({
  toggleModal,
  actions,
  children,
}) => {
  const composeFooterAction =
    (onClickFooterAction: () => void, shouldCloseModal = true) =>
    () => {
      onClickFooterAction?.();

      if (shouldCloseModal) {
        toggleModal?.(false);
      }
    };

  return (
    <>
      <div className={styles["modal-section"]}>{children}</div>

      <div className={styles["modal-footer"]}>
        {actions?.map((action) => (
          <Button
            key={action.actionId}
            variant={action.variant || "outlined"}
            label={action.label}
            onClick={composeFooterAction(
              action.onClick,
              action.shouldCloseModal,
            )}
            size="medium"
          />
        ))}
      </div>
    </>
  );
};

export default Modal;
