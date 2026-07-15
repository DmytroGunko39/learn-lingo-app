import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeModal = () => setModalType(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.mobileLink} ${styles.mobileLinkActive}`
      : styles.mobileLink;

  return (
    <>
      <header className={styles.header} ref={headerRef}>
        <div className={styles.container}>
          <Logo />

          <nav className={styles.nav}>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/teachers" className={navLinkClass}>
              Teachers
            </NavLink>
            {currentUser && (
              <NavLink to="/favorites" className={navLinkClass}>
                Favorites
              </NavLink>
            )}
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

          <button
            className={styles.hamburgerBtn}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`${styles.mobileMenu}${menuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
        >
          <nav className={styles.mobileNav}>
            <NavLink to="/" end className={mobileLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/teachers"
              className={mobileLinkClass}
              onClick={closeMenu}
            >
              Teachers
            </NavLink>
            {currentUser && (
              <NavLink
                to="/favorites"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={styles.mobileAuthActions}>
            {currentUser ? (
              <>
                <span className={styles.mobileEmail}>{currentUser.email}</span>
                <button
                  className={styles.logoutBtn}
                  onClick={() => {
                    logoutUser();
                    closeMenu();
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    setModalType("login");
                    closeMenu();
                  }}
                >
                  <LoginArrowIcon />
                  Log in
                </button>
                <button
                  className={styles.registerBtn}
                  onClick={() => {
                    setModalType("register");
                    closeMenu();
                  }}
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
