import { useEffect, useState } from "react";
import { getTeachers, getAllTeachers } from "../../firebase/database";
import type { Teacher } from "../../types/teacher";
import type { FilterValues } from "../../types/filters";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Spinner from "../../components/Spinner/Spinner";
import Filters from "../../components/Filters/Filters";
import { filterTeachers } from "../../utils/filterTeachers";
import { extractLanguages, extractLevels } from "../../utils/extractUniqueValues";
import styles from "./TeachersPage.module.css";

const emptyFilters: FilterValues = { language: "", level: "", price: "" };

const isFilterActive = (f: FilterValues) =>
  f.language !== "" || f.level !== "" || f.price !== "";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[] | null>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FilterValues>(emptyFilters);

  useEffect(() => {
    getTeachers(null, 4).then((page) => {
      setTeachers(page.teachers);
      setLastKey(page.lastKey);
      setHasMore(page.teachers.length === 4);
      setIsLoading(false);
    });
  }, []);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    if (isFilterActive(newFilters) && allTeachers === null) {
      setIsLoading(true);
      getAllTeachers().then((all) => {
        setAllTeachers(all);
        setIsLoading(false);
      });
    }
  };

  const active = isFilterActive(filters);
  const displayTeachers = active ? (allTeachers ?? []) : teachers;

  const languages = extractLanguages(displayTeachers);
  const levels = extractLevels(displayTeachers);
  const filteredTeachers = filterTeachers(displayTeachers, filters);

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
        onChange={handleFilterChange}
      />

      {filteredTeachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}

      {isLoading && <Spinner />}

      {!isLoading && !active && hasMore && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </main>
  );
};

export default TeachersPage;
