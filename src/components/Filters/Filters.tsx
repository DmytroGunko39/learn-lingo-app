import CustomSelect from "../CustomSelect/CustomSelect";
import type { FilterValues } from "../../types/filters";
import styles from "./Filters.module.css";

export type { FilterValues };

type Props = {
  languages: string[];
  levels: string[];
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
};

const PRICE_OPTIONS = ["20", "30", "40", "50"];
const emptyFilters: FilterValues = { language: "", level: "", price: "" };
const hasActiveFilter = (f: FilterValues) =>
  f.language !== "" || f.level !== "" || f.price !== "";

const Filters = ({ languages, levels, filters, onChange }: Props) => {
  const set = (key: keyof FilterValues) => (val: string) =>
    onChange({ ...filters, [key]: val });

  return (
    <div className={styles.filters}>
      <div className={styles.group}>
        <CustomSelect
          label="Languages"
          options={languages}
          value={filters.language}
          onChange={set("language")}
          placeholder="All"
        />
      </div>

      <div className={styles.group}>
        <CustomSelect
          label="Level of knowledge"
          options={levels}
          value={filters.level}
          onChange={set("level")}
          placeholder="All"
        />
      </div>

      <div className={styles.group}>
        <CustomSelect
          label="Price per hour"
          options={PRICE_OPTIONS}
          value={filters.price}
          onChange={set("price")}
          placeholder="All"
          suffix=" $"
        />
      </div>

      {hasActiveFilter(filters) && (
        <button
          className={styles.showAllBtn}
          onClick={() => onChange(emptyFilters)}
        >
          Show "All"
        </button>
      )}
    </div>
  );
};

export default Filters;
