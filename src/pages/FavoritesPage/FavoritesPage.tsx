import { useEffect, useState } from "react";
import { getTeacherById } from "../../firebase/database";
import type { Teacher } from "../../types/teacher";
import type { FilterValues } from "../../types/filters";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Spinner from "../../components/Spinner/Spinner";
import Filters from "../../components/Filters/Filters";
import { filterTeachers } from "../../utils/filterTeachers";
import { extractLanguages, extractLevels } from "../../utils/extractUniqueValues";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    language: "",
    level: "",
    price: "",
  });

  useEffect(() => {
    Promise.all(favorites.map(getTeacherById)).then((results) => {
      setTeachers(results.filter((t): t is Teacher => t !== null));
      setIsLoading(false);
    });
  }, [favorites]);

  const languages = extractLanguages(teachers);
  const levels = extractLevels(teachers);
  const filteredTeachers = filterTeachers(teachers, filters);

  if (isLoading) return <Spinner />;

  return (
    <main className={styles.page}>
      <Filters
        languages={languages}
        levels={levels}
        filters={filters}
        onChange={setFilters}
      />
      {filteredTeachers.length === 0 ? (
        <p className={styles.empty}>You have no favorite teachers yet.</p>
      ) : (
        filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))
      )}
    </main>
  );
};

export default FavoritesPage;
