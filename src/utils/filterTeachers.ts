import type { Teacher } from "../types/teacher";
import type { FilterValues } from "../types/filters";

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
