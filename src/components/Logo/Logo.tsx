import { Link } from "react-router-dom";
import LogoIcon from "../../assets/icons/LogoIcon";
import styles from "./Logo.module.css";

const Logo = () => (
  <Link to="/" className={styles.logo}>
    <LogoIcon />
    LearnLingo
  </Link>
);

export default Logo;
