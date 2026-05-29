// 8.1 — HomePage component
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

// 8.4 — Statistics data
const stats = [
  { value: "32,000 +", label: "Experienced tutors" },
  { value: "300,000 +", label: "5-star tutor reviews" },
  { value: "120 +", label: "Subjects taught" },
  { value: "200 +", label: "Tutor nationalities" },
];

const HomePage = () => {
  // 8.3 — useNavigate to redirect to /teachers on button click
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* 8.2 — Hero section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {/* Headline with highlighted italic "language" */}
            <h1 className={styles.title}>
              Unlock your potential with the best{" "}
              <span className={styles.highlight}>language</span> tutors
            </h1>

            <p className={styles.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            {/* 8.3 — Get started button navigates to /teachers */}
            <button
              className={styles.getStartedBtn}
              onClick={() => navigate("/teachers")}
            >
              Get started
            </button>
          </div>

          {/* Decorative image on the right */}
          <div className={styles.heroImageWrapper}>
            <img
              src="/hero.png"
              alt="Language tutor illustration"
              className={styles.heroImage}
            />
          </div>
        </section>

        {/* 8.4 — Statistics section — SVG rect used for custom dash length/gap control */}
        <section className={styles.stats}>
          <svg className={styles.statsBorder} aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="29"
              ry="29"
              fill="none"
              stroke="#F4C550"
              strokeWidth="1.5"
              strokeDasharray="15 18"
            />
          </svg>
          {stats.map(({ value, label }) => (
            <div key={label} className={styles.statItem}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default HomePage;
