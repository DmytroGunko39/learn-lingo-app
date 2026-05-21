import { getDatabase, ref, get, set, remove } from "firebase/database";
import { app } from "./firebaseConfig";

export const db = getDatabase(app);

export const getTeachers = async () => {
  const snapshot = await get(ref(db, "teachers"));
  return snapshot.exists() ? snapshot.val() : [];
};

export const getUserFavorites = async (uid: string) => {
  const snapshot = await get(ref(db, `favorites/${uid}`));
  return snapshot.exists() ? snapshot.val() : {};
};

export const addFavorite = (uid: string, teacherId: string) =>
  set(ref(db, `favorites/${uid}/${teacherId}`), true);

export const removeFavorite = (uid: string, teacherId: string) =>
  remove(ref(db, `favorites/${uid}/${teacherId}`));
