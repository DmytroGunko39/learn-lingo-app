import {
  getDatabase,
  ref,
  get,
  set,
  push,
  remove,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  serverTimestamp,
} from "firebase/database";
import { app } from "./firebaseConfig";
import { auth } from "./auth";
import type { Teacher, TeachersPage } from "../types/teacher";
import type { BookingInput } from "../types/booking";

export type { Teacher, TeachersPage };

export const db = getDatabase(app);

export const getTeachers = async (
  lastKey: string | null = null,
  limit: number = 4,
): Promise<TeachersPage> => {
  const teachersRef = ref(db, "teachers");

  const q =
    lastKey === null
      ? query(teachersRef, orderByKey(), limitToFirst(limit))
      : query(
          teachersRef,
          orderByKey(),
          startAfter(lastKey),
          limitToFirst(limit),
        );

  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return { teachers: [], lastKey: null };
  }

  const data = snapshot.val() as Record<string, Omit<Teacher, "id">>;
  const teachers: Teacher[] = Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));

  const nextLastKey =
    teachers.length === limit ? teachers[teachers.length - 1].id : null;

  return { teachers, lastKey: nextLastKey };
};

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const snapshot = await get(ref(db, "teachers"));
  if (!snapshot.exists()) return [];
  const data = snapshot.val() as Record<string, Omit<Teacher, "id">>;
  return Object.entries(data).map(([id, teacher]) => ({ id, ...teacher }));
};

export const getTeacherById = async (id: string): Promise<Teacher | null> => {
  const snapshot = await get(ref(db, `teachers/${id}`));
  if (!snapshot.exists()) return null;
  return { id, ...(snapshot.val() as Omit<Teacher, "id">) };
};

export const getUserFavorites = async (uid: string) => {
  const snapshot = await get(ref(db, `favorites/${uid}`));
  return snapshot.exists() ? snapshot.val() : {};
};

export const addFavorite = (uid: string, teacherId: string) =>
  set(ref(db, `favorites/${uid}/${teacherId}`), true);

export const removeFavorite = (uid: string, teacherId: string) =>
  remove(ref(db, `favorites/${uid}/${teacherId}`));

export const saveBooking = (data: BookingInput) =>
  push(ref(db, "bookings"), {
    ...data,
    userId: auth.currentUser?.uid ?? null,
    createdAt: serverTimestamp(),
  });
