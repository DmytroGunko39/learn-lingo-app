import { useEffect, useState } from "react";
import { getTeacherById, type Teacher } from "../../firebase/database";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all(favorites.map(getTeacherById)).then((results) => {
      setTeachers(results.filter((t): t is Teacher => t !== null));
      setIsLoading(false);
    });
  }, [favorites]);

  if (isLoading) return <Spinner />;

  return (
    <main className={styles.page}>
      {teachers.length === 0 ? (
        <p className={styles.empty}>You have no favorite teachers yet.</p>
      ) : (
        teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))
      )}
    </main>
  );
};

export default FavoritesPage;
