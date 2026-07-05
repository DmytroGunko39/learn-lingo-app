import { useEffect, useState } from "react";
import { getTeachers, type Teacher } from "../../firebase/database";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Spinner from "../../components/Spinner/Spinner";
import Filters, { type FilterValues } from "../../components/Filters/Filters";
import { filterTeachers } from "../../utils/filterTeachers";
import { extractLanguages, extractLevels } from "../../utils/extractUniqueValues";
import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    language: "",
    level: "",
    price: "",
  });

  useEffect(() => {
    getTeachers(null, 4).then((page) => {
      setTeachers(page.teachers);
      setLastKey(page.lastKey);
      setHasMore(page.teachers.length === 4);
      setIsLoading(false);
    });
  }, []);

  const languages = extractLanguages(teachers);
  const levels = extractLevels(teachers);
  const filteredTeachers = filterTeachers(teachers, filters);

  const handleLoadMore = () => {
    setIsLoading(true);
    getTeachers(lastKey, 4).then((page) => {
      setTeachers((prev) => [...prev, ...page.teachers]);
      setLastKey(page.lastKey);
      setHasMore(page.teachers.length === 4);
      setIsLoading(false);
    });
  };

  return (
    <main className={styles.page}>
      <Filters
        languages={languages}
        levels={levels}
        filters={filters}
        onChange={setFilters}
      />

      {filteredTeachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}

      {isLoading && <Spinner />}

      {!isLoading && hasMore && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </main>
  );
};

export default TeachersPage;
