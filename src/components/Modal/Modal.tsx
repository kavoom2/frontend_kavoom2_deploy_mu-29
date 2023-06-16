"use client";

import Button, { ButtonProps } from "@/components/Button";
import { createContext, useContext, useMemo } from "react";
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
}

export interface ModalBodyProps {
  children?: React.ReactNode;
  actions?: ModalAction[];
}

interface ModalCoreContextProvider {
  toggleModal: (nextIsOpen?: boolean) => void;
}

export const ModalCoreContext = createContext<ModalCoreContextProvider | null>(
  null,
);

const _Modal: React.FC<ModalProps> = (props) => {
  const modalCoreContextValue = useMemo(
    () => ({
      toggleModal: props.toggleModal,
    }),
    [props.toggleModal],
  );

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
      <ModalCoreContext.Provider value={modalCoreContextValue}>
        {props.children}
      </ModalCoreContext.Provider>
    </ReactResponsiveModal>
  );
};

_Modal.displayName = "Modal";

const ModalBody: React.FC<ModalBodyProps> = ({ actions, children }) => {
  const modalCoreContext = useContext(ModalCoreContext);

  const toggleModal = modalCoreContext?.toggleModal;

  const composeFooterAction =
    (onClickFooterAction?: () => void, shouldCloseModal = true) =>
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

ModalBody.displayName = "Modal.Body";

const Modal = Object.assign(_Modal, {
  Body: ModalBody,
});

export default Modal;
