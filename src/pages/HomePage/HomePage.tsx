import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsBorderIcon from "../../assets/icons/StatsBorderIcon";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./HomePage.module.css";

const stats = [
  { value: "32,000 +", label: "Experienced tutors" },
  { value: "300,000 +", label: "5-star tutor reviews" },
  { value: "120 +", label: "Subjects taught" },
  { value: "200 +", label: "Tutor nationalities" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [isHeroImageLoading, setIsHeroImageLoading] = useState(true);

  return (
    <main className={styles.page}>
      {isHeroImageLoading && <Spinner />}

      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Unlock your potential with the best{" "}
              <span className={styles.highlight}>language</span> tutors
            </h1>

            <p className={styles.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <button
              className={styles.getStartedBtn}
              onClick={() => navigate("/teachers")}
            >
              Get started
            </button>
          </div>

          <div className={styles.heroImageWrapper}>
            <img
              src="/hero.png"
              alt="Language tutor illustration"
              className={styles.heroImage}
              onLoad={() => setIsHeroImageLoading(false)}
            />
          </div>
        </section>

        <section className={styles.stats}>
          <StatsBorderIcon className={styles.statsBorder} />
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
