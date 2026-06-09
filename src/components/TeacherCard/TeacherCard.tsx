import { useState } from "react";
import { type Teacher } from "../../firebase/database";
import styles from "./TeacherCard.module.css";

type Props = {
  teacher: Teacher;
};

const BookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#FFC531"
    stroke="#FFC531"
    strokeWidth="1"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 22.4375C13 22.4375 2.4375 16.25 2.4375 9.1875C2.4375 5.51 5.27 2.4375 8.71875 2.4375C10.5729 2.4375 12.2396 3.26042 13.4115 4.5625L13 4.97396L12.5885 4.5625C11.7604 3.26042 10.0938 2.4375 8.71875 2.4375"
      stroke="#121417"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 22.4375C13 22.4375 23.5625 16.25 23.5625 9.1875C23.5625 5.51 20.73 2.4375 17.2813 2.4375C15.4271 2.4375 13.7604 3.26042 12.5885 4.5625L13 4.97396L13.4115 4.5625C14.2396 3.26042 15.9063 2.4375 17.2813 2.4375"
      stroke="#121417"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TeacherCard = ({ teacher }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    name,
    surname,
    languages,
    levels,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
  } = teacher;

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={styles.avatar}
        />
        <svg
          className={styles.onlineDot}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="6" fill="white" />
          <circle cx="6" cy="6" r="4" fill="#38CD3E" />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.topBar}>
          <span className={styles.languagesLabel}>Languages</span>

          <div className={styles.statsRow}>
            <span className={styles.statItem}>
              <BookIcon /> Lessons online
            </span>
            <span className={styles.divider} />
            <span className={styles.statItem}>
              Lessons done: {lessons_done}
            </span>
            <span className={styles.divider} />
            <span className={styles.statItem}>
              <StarIcon /> Rating: {rating}
            </span>
            <span className={styles.divider} />
            <span className={styles.statItem}>
              Price / 1 hour:{" "}
              <span className={styles.price}>{price_per_hour}$</span>
            </span>
          </div>

          <button className={styles.heartBtn} aria-label="Add to favorites">
            <HeartIcon />
          </button>
        </div>

        <h2 className={styles.name}>
          {name} {surname}
        </h2>

        <div className={styles.infoBlock}>
          <p className={styles.infoRow}>
            <span className={styles.infoLabel}>Speaks: </span>
            <span className={styles.speaksList}>{languages.join(", ")}</span>
          </p>
          <p className={styles.infoRow}>
            <span className={styles.infoLabel}>Lesson Info: </span>
            <span>{lesson_info}</span>
          </p>
          <p className={styles.infoRow}>
            <span className={styles.infoLabel}>Conditions: </span>
            <span>{conditions.join(" ")}</span>
          </p>
        </div>

        {!isExpanded && (
          <button
            className={styles.readMoreBtn}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <>
            <p className={styles.experience}>{experience}</p>

            <ul className={styles.reviews}>
              {reviews.map((review, i) => (
                <li key={i} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    {review.reviewer_avatar && (
                      <img
                        src={review.reviewer_avatar}
                        alt={review.reviewer_name}
                        className={styles.reviewerAvatar}
                      />
                    )}
                    <div className={styles.reviewerInfo}>
                      <span className={styles.reviewerName}>
                        {review.reviewer_name}
                      </span>
                      <span className={styles.reviewerRating}>
                        <StarIcon /> {review.reviewer_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className={styles.levels}>
          {levels.map((level, index) => (
            <span
              key={level}
              className={`${styles.levelTag}${index === 0 ? ` ${styles.levelActive}` : ""}`}
            >
              #{level}
            </span>
          ))}
        </div>

        {isExpanded && (
          <button className={styles.bookBtn}>Book trial lesson</button>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
