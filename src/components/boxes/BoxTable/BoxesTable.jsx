import React from "react";
import styles from "./BoxesTable.module.css";

import ColorSwatch from "../colorSwatch/ColorSwatch.jsx";
import { formatINR } from "../../../utils/formatting.js";

const BoxesTable = ({ boxes }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Receiver</th>
          <th className={styles.th}>Weight (kg)</th>
          <th className={styles.th}>Box colour</th>
          <th className={styles.th}>Destination</th>
          <th className={styles.th}>Shipping cost (INR)</th>
        </tr>
      </thead>
      <tbody>
        {boxes.map((b) => (
          <tr>
            <td className={styles.td}>{b.receiver}</td>
            <td className={styles.td}>{Number(b.weight).toFixed(2)}</td>
            <td className={styles.td}>
              <ColorSwatch rgb={b.colorRgb} code={b.colorRgb} />
            </td>
            <td className={styles.td}>{b.country}</td>
            <td className={styles.td}>{formatINR(b.costInInr)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BoxesTable;
