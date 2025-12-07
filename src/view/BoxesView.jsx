import React, { useEffect } from "react";
import layout from "../styles/layout.module.css";

import { loadAllBoxes } from "../controllers/boxController";
import BoxesTable from "../components/boxes/BoxTable/BoxesTable";

const BoxesPage = ({ state, dispatch }) => {
  useEffect(() => {
    loadAllBoxes(dispatch);
  }, [dispatch]);
  return (
    <main className={layout.main}>
      {state.loading ? (
        <div className={layout.card + " " + layout.center}>
          <div className={layout.skeleton}></div>
          <div className={layout.skeleton}></div>
          <div className={layout.skeleton}></div>
          <div className={layout.skeleton}></div>
        </div>
      ) : (
        <section className={layout.card}>
          <header className={layout.cardHeader}>
            <h2>Boxes</h2>
          </header>
          <div className={layout.cardBody}>
            <BoxesTable boxes={state.boxes} />
          </div>
        </section>
      )}
    </main>
  );
};

export default BoxesPage;
