import React from "react";
import layout from "../styles/layout.module.css";
import { createBox } from "../controllers/boxController";
import BoxForm from "../components/boxes/boxForm/BoxForm";

const AddBoxView = ({ dispatch }) => {
  async function onSubmit(form) {
    const result = await createBox(form, dispatch);
    return result;
  }

  return (
    <main className={layout.main}>
      <section className={layout.card}>
        <header className={layout.cardHeader}>
          <h2>Add box</h2>
        </header>
        <div className={layout.cardBody}>
          <BoxForm onSubmit={onSubmit} />
        </div>
      </section>
    </main>
  );
};

export default AddBoxView;
