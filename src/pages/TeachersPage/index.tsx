import { useEffect, useState } from "react";
import { getTeachers, type Teacher } from "../../firebase/database";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getTeachers(null, 4).then(({ teachers }) => setTeachers(teachers));
  }, []);

  return (
    <main style={{ padding: "40px 64px", backgroundColor: "#f8f8f8", minHeight: "100vh", display: "flex", flexDirection: "column", gap: "32px" }}>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </main>
  );
};

export default TeachersPage;
