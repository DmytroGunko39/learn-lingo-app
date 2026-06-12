import { useEffect, useState } from "react";
import { getTeachers, type Teacher } from "../../firebase/database";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getTeachers(null, 4).then((page) => {
      setTeachers(page.teachers);
      setLastKey(page.lastKey);
      setHasMore(page.teachers.length === 4);
      setIsLoading(false);
    });
  }, []);

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
      {teachers.map((teacher) => (
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
