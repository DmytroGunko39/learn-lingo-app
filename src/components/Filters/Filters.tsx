import styles from "./Filters.module.css";

export type FilterValues = {
  language: string;
  level: string;
  price: string;
};

type Props = {
  languages: string[];
  levels: string[];
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
};

const PRICE_OPTIONS = ["20", "30", "40", "50"];

const Filters = ({ languages, levels, filters, onChange }: Props) => {
  const set =
    (key: keyof FilterValues) => (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange({ ...filters, [key]: e.target.value });

  return (
    <div className={styles.filters}>
      <div className={styles.group}>
        <label className={styles.label}>Languages</label>
        <select
          className={styles.select}
          value={filters.language}
          onChange={set("language")}
        >
          <option value="">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Level of knowledge</label>
        <select
          className={styles.select}
          value={filters.level}
          onChange={set("level")}
        >
          <option value="">All</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Price per hour</label>
        <select
          className={styles.select}
          value={filters.price}
          onChange={set("price")}
        >
          <option value="">All</option>
          {PRICE_OPTIONS.map((price) => (
            <option key={price} value={price}>
              {price} $
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
