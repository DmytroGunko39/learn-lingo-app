import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

// 6.2 — modal receives onClose and children as props
type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  // 6.5 — close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 6.6 — disable body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 6.7 — render outside #root via createPortal
  return createPortal(
    // 6.3 — backdrop: clicking it closes the modal
    <div className={styles.backdrop} onClick={onClose}>
      {/* stopPropagation prevents clicks inside the modal from reaching the backdrop */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 6.4 — ✕ close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 8L8 24" stroke="#121417" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 8L24 24" stroke="#121417" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
