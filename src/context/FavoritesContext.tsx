import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "../firebase/database";
import { FavoritesContext } from "./favorites-context";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFavorites(user.uid).then((data) => {
          setFavorites(Object.keys(data));
        });
      } else {
        setFavorites([]);
      }
    });

    return unsubscribe;
  }, []);

  const toggleFavorite = (id: string) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const isFavorite = favorites.includes(id);

    if (isFavorite) {
      removeFavorite(uid, id);
      setFavorites((prev) => prev.filter((f) => f !== id));
    } else {
      addFavorite(uid, id);
      setFavorites((prev) => [...prev, id]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
