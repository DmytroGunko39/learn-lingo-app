import type { Teacher } from "../firebase/database";

export const extractLanguages = (teachers: Teacher[]): string[] =>
  [...new Set(teachers.flatMap((t) => t.languages))].sort();

export const extractLevels = (teachers: Teacher[]): string[] =>
  [...new Set(teachers.flatMap((t) => t.levels))].sort();
