import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoRow}>
          <img src="/tclogo.png" alt="Treasured Circle logo" className={styles.logoImage} />
          <a className={`${styles.logoText} logoText`} href="/">Treasured Circle</a>
        </div>

        <nav className={styles.navWrapper}>
          <div className={styles.desktopMenu}>
            <div className={styles.navItems}>
              <a className={styles.navLink} href="/">Home</a>
              <a className={styles.navLink} href="/About">About</a>
              <div
                className={styles.dropdownWrapper}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <div className={styles.navLink}>
                  Services
                  <svg className={`${styles.chevron} ${isServicesOpen ? styles.rotate : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isServicesOpen && (
                  <div className={styles.dropdown}>
                    <a href="/services/residential" className={styles.dropdownItem}>Residential Services</a>
                    <a href="/services/respite" className={styles.dropdownItem}>Respite</a>
                    <a href="/services/personal-care" className={styles.dropdownItem}>Personal Care</a>
                    <a href="/services/homemaker" className={styles.dropdownItem}>Homemaker</a>
                    <a href="/services/mentorship" className={styles.dropdownItem}>Mentorship</a>
                    <a href="/community" className={styles.dropdownItem}>Community</a>
                  </div>
                )}
              </div>
              <a className={styles.navLink} href="/Contact">Contact</a>
              <a className={styles.navLink} href="/Application">Apply</a>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.phoneDisplay}>+1 (720) 998-7165</div>
              <div className={styles.themeToggle} onClick={toggleDarkMode}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
              </div>
            </div>
          </div>

          <div className={styles.mobileToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <a className={styles.mobileItem} href="/">Home</a>
          <a className={styles.mobileItem} href="/About">About</a>
          <div className={styles.mobileItem} onClick={() => setIsServicesOpen(!isServicesOpen)}>
            Services
            <svg className={`${styles.chevron} ${isServicesOpen ? styles.rotate : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {isServicesOpen && (
            <div className={styles.mobileDropdown}>
              <a href="/services/residential" className={styles.dropdownItem}>Residential Services</a>
              <a href="/services/respite" className={styles.dropdownItem}>Respite</a>
              <a href="/services/personal-care" className={styles.dropdownItem}>Personal Care</a>
              <a href="/services/homemaker" className={styles.dropdownItem}>Homemaker</a>
              <a href="/services/mentorship" className={styles.dropdownItem}>Mentorship</a>
              <a href="/community" className={styles.dropdownItem}>Community</a>
            </div>
          )}
          <a className={styles.mobileItem} href="/Contact">Contact</a>
          <div className={styles.mobilePhone}>+1 (720) 998-7165</div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
