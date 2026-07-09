import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { saveBooking } from "../../firebase/database";
import styles from "./BookingForm.module.css";

const schema = yup.object({
  reason: yup.string().required("Please select a reason"),
  fullName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s\-(]{7,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
});

type FormData = yup.InferType<typeof schema>;

const REASONS = [
  { value: "career", label: "Career and business" },
  { value: "kids", label: "Lesson for kids" },
  { value: "travel", label: "Living abroad" },
  { value: "exams", label: "Exams and coursework" },
  { value: "other", label: "Culture, travel or hobby" },
];

type Props = {
  onClose: () => void;
  teacherId: string;
  teacherName?: string;
  teacherAvatar?: string;
};

const BookingForm = ({ onClose, teacherId, teacherName, teacherAvatar }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await saveBooking({
      teacherId,
      reason: data.reason,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    });
    toast.success("Your booking has been submitted!");
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Book trial lesson</h2>

      <p className={styles.subtitle}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      {/* Teacher row */}
      {(teacherAvatar || teacherName) && (
        <div className={styles.teacherRow}>
          {teacherAvatar && (
            <img
              src={teacherAvatar}
              alt={teacherName}
              className={styles.teacherAvatar}
            />
          )}
          <div className={styles.teacherInfo}>
            <span className={styles.teacherLabel}>Your teacher</span>
            <span className={styles.teacherName}>{teacherName}</span>
          </div>
        </div>
      )}

      {/* Reason radio group */}
      <p className={styles.reasonHeading}>
        What is your main reason for learning a new language?
      </p>
      <div className={styles.radioGroup}>
        {REASONS.map(({ value, label }) => (
          <label key={value} className={styles.radioLabel}>
            <input
              {...register("reason")}
              type="radio"
              value={value}
              className={styles.radioInput}
            />
            {label}
          </label>
        ))}
      </div>
      {errors.reason && (
        <span className={styles.error}>{errors.reason.message}</span>
      )}

      {/* Text fields */}
      <div className={styles.field}>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Full Name"
          className={errors.fullName ? styles.inputError : styles.input}
        />
        {errors.fullName && (
          <span className={styles.error}>{errors.fullName.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className={errors.email ? styles.inputError : styles.input}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <input
          {...register("phone")}
          type="tel"
          placeholder="Phone number"
          className={errors.phone ? styles.inputError : styles.input}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Book"}
      </button>
    </form>
  );
};

export default BookingForm;
