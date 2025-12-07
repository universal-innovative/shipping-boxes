import React from "react";
import styles from "./ColorSwatch.module.css";

const ColorSwatch = ({ rgb, code }) => {
  return (
    <div className={styles.wrap}>
      <span className={styles.box} style={{ background: rgb }}></span>
      <span className={styles.code}>
        <code>{code}</code>
      </span>
    </div>
  );
};

export default ColorSwatch;
