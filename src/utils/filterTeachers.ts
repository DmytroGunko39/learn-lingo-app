import type { Teacher } from "../firebase/database";
import type { FilterValues } from "../components/Filters/Filters";

export const filterTeachers = (
  teachers: Teacher[],
  filters: FilterValues
): Teacher[] =>
  teachers.filter((t) => {
    if (filters.language && !t.languages.includes(filters.language))
      return false;
    if (filters.level && !t.levels.includes(filters.level)) return false;
    if (filters.price && t.price_per_hour > Number(filters.price)) return false;
    return true;
  });
