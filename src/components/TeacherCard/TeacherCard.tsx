import { useState } from "react";
import toast from "react-hot-toast";
import { type Teacher } from "../../firebase/database";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";
import Modal from "../Modal/Modal";
import BookingForm from "../BookingForm/BookingForm";
import BookIcon from "../../assets/icons/BookIcon";
import StarIcon from "../../assets/icons/StarIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import OnlineDotIcon from "../../assets/icons/OnlineDotIcon";
import styles from "./TeacherCard.module.css";

type Props = {
  teacher: Teacher;
};

const TeacherCard = ({ teacher }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { currentUser } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(teacher.id);

  const handleHeartClick = () => {
    if (!currentUser) {
      toast.error("Please log in to add to favorites");
      return;
    }
    toggleFavorite(teacher.id);
  };

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

  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={styles.avatar}
        />
        <OnlineDotIcon className={styles.onlineDot} />
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

          <button
            className={styles.heartBtn}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            onClick={handleHeartClick}
          >
            <HeartIcon filled={isFavorited} />
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
          <button
            className={styles.bookBtn}
            onClick={() => setIsBookingOpen(true)}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </div>

    {isBookingOpen && (
      <Modal onClose={closeBooking}>
        <BookingForm
          onClose={closeBooking}
          teacherName={`${name} ${surname}`}
          teacherAvatar={avatar_url}
        />
      </Modal>
    )}
    </>
  );
};

export default TeacherCard;
