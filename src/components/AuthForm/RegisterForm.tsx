// 7.1 — RegisterForm component
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../firebase/auth";
import styles from "./RegisterForm.module.css";

// 7.4 — Yup validation schema
const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});


type RegisterFormProps = {
  onClose: () => void;
};

const RegisterForm = ({ onClose }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // 7.3 — set up useForm with yupResolver
  // 7.5 — connect Yup schema via yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 7.6 — on submit call registerUser, close modal on success
  // 7.7 — catch Firebase errors and show them in the form
  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      await registerUser(data.email, data.password);
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      const message =
        code === "auth/email-already-in-use"
          ? "This email is already in use"
          : "Something went wrong. Please try again.";
      setError("root", { message });
    }
  };

  return (
    // 7.1 — form markup
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      {/* 7.2 — name field */}
      <div className={styles.field}>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className={errors.name ? styles.inputError : styles.input}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      {/* 7.2 — email field */}
      <div className={styles.field}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className={errors.email ? styles.inputError : styles.input}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      {/* 7.2 — password field with show/hide toggle */}
      <div className={styles.field}>
        <div className={styles.passwordWrapper}>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={errors.password ? styles.inputError : styles.input}
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4_621)">
                  <path d="M14.9499 14.9499C13.5254 16.0358 11.7908 16.6373 9.99992 16.6666C4.16659 16.6666 0.833252 9.99994 0.833252 9.99994C1.86983 8.06819 3.30753 6.38045 5.04992 5.04994M8.24992 3.53327C8.82353 3.39901 9.41081 3.33189 9.99992 3.33327C15.8333 3.33327 19.1666 9.99994 19.1666 9.99994C18.6607 10.9463 18.0575 11.8372 17.3666 12.6583M11.7666 11.7666C11.5377 12.0122 11.2617 12.2092 10.955 12.3459C10.6484 12.4825 10.3173 12.556 9.98166 12.5619C9.64599 12.5678 9.31256 12.5061 9.00126 12.3803C8.68997 12.2546 8.40719 12.0675 8.16979 11.8301C7.9324 11.5927 7.74525 11.3099 7.61951 10.9986C7.49377 10.6873 7.43202 10.3539 7.43795 10.0182C7.44387 9.68252 7.51734 9.35148 7.65398 9.04481C7.79062 8.73815 7.98763 8.46215 8.23325 8.23327" stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0.833252 0.833374L19.1666 19.1667" stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_4_621">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4_621)">
                  <path d="M0.833252 9.99994C0.833252 9.99994 4.16659 3.33327 9.99992 3.33327C15.8333 3.33327 19.1666 9.99994 19.1666 9.99994C19.1666 9.99994 15.8333 16.6666 9.99992 16.6666C4.16659 16.6666 0.833252 9.99994 0.833252 9.99994Z" stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2.5" stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_4_621">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      {/* 7.7 — Firebase root error */}
      {errors.root && <span className={styles.error}>{errors.root.message}</span>}

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};

export default RegisterForm;
