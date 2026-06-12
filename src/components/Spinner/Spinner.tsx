import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.overlay}>
    <span className={styles.spinner} aria-label="Loading" />
  </div>
);

export default Spinner;
