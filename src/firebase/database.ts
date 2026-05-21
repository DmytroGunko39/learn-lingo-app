import { getDatabase, ref, get } from "firebase/database";
import { app } from "./firebaseConfig";

export const db = getDatabase(app);

export const getTeachers = async () => {
  const snapshot = await get(ref(db, "teachers"));
  return snapshot.exists() ? snapshot.val() : [];
};
