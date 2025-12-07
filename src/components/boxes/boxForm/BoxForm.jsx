import React, { useEffect, useRef, useState } from "react";
import styles from "./BoxForm.module.css";
import formStyles from "../../../styles/form.module.css";
import { COUNTRIES, COUNTRY_RATES } from "../../../models/rates.js";

import { formatINR } from "../../../utils/formatting.js";
import { hexToRgbString } from "../../../utils/hexToRgbString.js";

const BoxFrom = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    receiver: "",
    weight: null,
    hexColor: "#93c5fd",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "weight") {
      setFormState((prev) => ({ ...prev, [name]: Number(value) }));

      return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeWeight = () => {
    if (Number(formState.weight) < 0) {
      setFormState((prev) => {
        return {
          ...prev,
          weight: 0,
        };
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const result = await onSubmit(formState);

    if (!result.ok) {
      setErrors(result.errors || {});
      normalizeWeight();

      setStatus({
        type: "error",
        message: "Failed to save box. Please correct the highlighted fields.",
      });
    } else if (result && result.ok) {
      setFormState({
        receiver: "",
        weight: "",
        hexColor: "#93c5fd",
        country: "",
      });
      setErrors({});
      setStatus({
        type: "success",
        message: "Box saved successfully ✅",
      });

      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 3000);
    }
  };
  console.log(status);

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={formStyles.field}>
        <label htmlFor="revevier" className={formStyles.label}>
          Reciever name
        </label>

        <input
          id="receiver"
          name="receiver"
          ref={nameRef}
          type="text"
          className={formStyles.input}
          value={formState.receiver}
          onChange={handleChange}
          aria-invalid={!!errors.receiver}
          aria-describedby={errors.receiver ? "receiver-error" : undefined}
          placeholder="Kumar Abhimanyu"
        />
        {errors.receiver ? (
          <p id="receivver-error" className={formStyles.error}>
            {errors.receiver}
          </p>
        ) : null}
      </div>
      <div className={formStyles.field}>
        <label htmlFor="weight" className={formStyles.label}>
          Weight (kg)
        </label>
        <input
          id="weight"
          name="weight"
          type="number"
          inputMode="decimal"
          step="0.01"
          className={formStyles.input}
          value={formState.weight}
          onChange={handleChange}
          aria-invalid={!!errors.weight}
          aria-describedby={errors.weight ? "weight-error" : undefined}
          placeholder="e.g., 2.5"
        />
        {errors.weight ? (
          <p id="weight-error" className={formStyles.error}>
            {errors.weight}
          </p>
        ) : null}
      </div>
      <div className={formStyles.fieldRow}>
        <div className={formStyles.field}>
          <label htmlFor="hexColor" className={formStyles.label}>
            Box colour
          </label>
          <input
            id="hexColor"
            name="hexColor"
            type="color"
            className={formStyles.color}
            value={formState.hexColor}
            onChange={handleChange}
            aria-label="Pick box colour"
          />
        </div>
        <div className={styles.rgbReadout}>
          Stored as <code>{hexToRgbString(formState.hexColor)}</code>
        </div>
      </div>
      <div className={formStyles.field}>
        <label htmlFor="country" className={formStyles.label}>
          Destination country
        </label>
        <select
          id="country"
          name="country"
          className={formStyles.select}
          value={formState.country}
          onChange={handleChange}
          aria-invalid={!!errors.country}
          aria-describedby={errors.country ? "country-error" : undefined}
        >
          <option value="" disabled>
            Choose a country...
          </option>
          {COUNTRIES.map((c) => {
            return (
              <option key={c} value={c}>
                {c} ({formatINR(COUNTRY_RATES[c])})
              </option>
            );
          })}
        </select>
        {errors.country ? (
          <p id="country-error" className={formStyles.error}>
            {errors.country}
          </p>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={formStyles.primaryBtn}>
          Save box
        </button>

        {status.message && (
          <p
            className={
              status.type === "success" ? styles.successMsg : styles.errorMsg
            }
            role="alert"
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default BoxFrom;
