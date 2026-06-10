import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { logoutUser } from "../../firebase/auth";
import Logo from "../Logo/Logo";
import Modal from "../Modal/Modal";
import LoginForm from "../AuthForm/LoginForm";
import RegisterForm from "../AuthForm/RegisterForm";
import LoginArrowIcon from "../../assets/icons/LoginArrowIcon";
import styles from "./Header.module.css";

type ModalType = "login" | "register" | null;

const Header = () => {
  const { currentUser } = useAuth();
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo />

          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              Teachers
            </NavLink>
          </nav>

          <div className={styles.auth}>
            {currentUser ? (
              <>
                <span className={styles.email}>{currentUser.email}</span>
                <button className={styles.logoutBtn} onClick={logoutUser}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.loginBtn}
                  onClick={() => setModalType("login")}
                >
                  <LoginArrowIcon />
                  Log in
                </button>
                <button
                  className={styles.registerBtn}
                  onClick={() => setModalType("register")}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "login" ? (
            <LoginForm onClose={closeModal} />
          ) : (
            <RegisterForm onClose={closeModal} />
          )}
        </Modal>
      )}
    </>
  );
};

export default Header;
