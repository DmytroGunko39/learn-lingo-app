// 7.1 — RegisterForm component
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../firebase/auth";
import EyeIcon from "../../assets/icons/EyeIcon";
import EyeOffIcon from "../../assets/icons/EyeOffIcon";
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
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
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
