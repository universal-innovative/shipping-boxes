import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ active, onNavigate }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden>
            🎁
          </span>
          <span className={styles.title} aria-hidden>
            Shipping Box
          </span>
        </div>
        <nav className={styles.tab} role="tablist" aria-label="Primary">
          {[
            { key: "form", label: "Add Box" },
            { key: "list", label: "Boxes" },
          ].map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              className={active === t.key ? styles.tabActive : styles.tab}
              onClick={() => onNavigate(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
