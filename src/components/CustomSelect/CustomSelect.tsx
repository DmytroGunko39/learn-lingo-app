import { useState, useRef, useEffect } from "react";
import ChevronIcon from "../../assets/icons/ChevronIcon";
import styles from "./CustomSelect.module.css";

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  suffix?: string;
};

const CustomSelect = ({
  options,
  value,
  onChange,
  label,
  placeholder = "All",
  suffix = "",
}: Props) => {
  const display = (val: string) => (suffix ? `${val}${suffix}` : val);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.container} ref={containerRef}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{value ? display(value) : placeholder}</span>
          <ChevronIcon
            className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ""}`}
          />
        </button>

        {isOpen && (
          <ul className={styles.dropdown} role="listbox">
            <li
              role="option"
              aria-selected={value === ""}
              className={`${styles.option} ${
                value === "" ? styles.optionSelected : styles.optionUnselected
              }`}
              onClick={() => handleSelect("")}
            >
              {placeholder}
            </li>
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                className={`${styles.option} ${
                  value === opt
                    ? styles.optionSelected
                    : styles.optionUnselected
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
