import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../firebase/auth";
import Logo from "../Logo/Logo";
import Modal from "../Modal/Modal";
import LoginForm from "../AuthForm/LoginForm";
import RegisterForm from "../AuthForm/RegisterForm";
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H12.5" stroke="#F4C550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.33333 14.1666L12.5 9.99992L8.33333 5.83325M12.5 9.99992L2.5 9.99992" stroke="#F4C550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
