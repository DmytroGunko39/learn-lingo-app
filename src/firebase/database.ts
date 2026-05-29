import {
  getDatabase,
  ref,
  get,
  set,
  remove,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from "firebase/database";
import { app } from "./firebaseConfig";

export const db = getDatabase(app);

export type Teacher = {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
};

export type TeachersPage = {
  teachers: Teacher[];
  lastKey: string | null;
};

export const getTeachers = async (
  lastKey: string | null = null,
  limit: number = 4
): Promise<TeachersPage> => {
  const teachersRef = ref(db, "teachers");

  const q =
    lastKey === null
      ? query(teachersRef, orderByKey(), limitToFirst(limit))
      : query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(limit));

  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return { teachers: [], lastKey: null };
  }

  const data = snapshot.val() as Record<string, Omit<Teacher, "id">>;
  const teachers: Teacher[] = Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));

  const nextLastKey = teachers.length === limit ? teachers[teachers.length - 1].id : null;

  return { teachers, lastKey: nextLastKey };
};

export const getUserFavorites = async (uid: string) => {
  const snapshot = await get(ref(db, `favorites/${uid}`));
  return snapshot.exists() ? snapshot.val() : {};
};

export const addFavorite = (uid: string, teacherId: string) =>
  set(ref(db, `favorites/${uid}/${teacherId}`), true);

export const removeFavorite = (uid: string, teacherId: string) =>
  remove(ref(db, `favorites/${uid}/${teacherId}`));
