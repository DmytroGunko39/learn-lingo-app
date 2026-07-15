import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../../assets/icons/CloseIcon";
import styles from "./Modal.module.css";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (window.innerWidth < 1280) {
      setIsClosing(true);
      setTimeout(() => onClose(), 300);
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={`${styles.modal}${isClosing ? ` ${styles.closing}` : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
          <CloseIcon />
        </button>
        <div className={styles.dragHandle} aria-hidden="true" />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
