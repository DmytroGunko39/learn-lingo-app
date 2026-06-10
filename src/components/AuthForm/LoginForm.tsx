// 7.8 — LoginForm component
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../firebase/auth";
import EyeIcon from "../../assets/icons/EyeIcon";
import EyeOffIcon from "../../assets/icons/EyeOffIcon";
import styles from "./LoginForm.module.css";

// 7.10 — Yup validation schema for email and password
const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: LoginFormProps) => {
  // 7.13 — track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // 7.8 — set up useForm with yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 7.11 — on submit call loginUser, close modal on success
  // 7.12 — catch Firebase errors and show them in the form
  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      await loginUser(data.email, data.password);
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      const message =
        code === "auth/invalid-credential" || code === "auth/wrong-password"
          ? "Wrong email or password"
          : "Something went wrong. Please try again.";
      setError("root", { message });
    }
  };

  return (
    // 7.8 — form markup
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.subtitle}>
        Welcome back! Please enter your credentials to access your account and
        continue your learning journey.
      </p>

      {/* 7.9 — email field */}
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

      {/* 7.9 — password field with show/hide toggle */}
      <div className={styles.field}>
        <div className={styles.passwordWrapper}>
          <input
            {...register("password")}
            // 7.13 — switch between text and password type to show/hide
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={errors.password ? styles.inputError : styles.input}
          />
          {/* 7.13 — eye icon button toggles showPassword */}
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      {/* 7.12 — Firebase root error (wrong credentials) */}
      {errors.root && (
        <span className={styles.error}>{errors.root.message}</span>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
