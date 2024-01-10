import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link legacyBehavior href="/">
        <a className={styles.logo}>
        <img src="/logo.png" alt="Logo" className={styles.logoImage}/>
        </a>
      </Link>
      <div className={styles.navLinks}>
        <Link href="/" legacyBehavior>
          <a>Home</a>
        </Link>
        <Link href="/suppliers" legacyBehavior>
          <a>Suppliers</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;