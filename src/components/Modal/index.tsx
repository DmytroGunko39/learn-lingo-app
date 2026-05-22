import { type ReactNode } from "react";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
