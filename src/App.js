import React, { useEffect, useReducer, useState } from "react";

import { COUNTRY_RATES, COUNTRIES } from "./models/rates.js";

import layout from "./styles/layout.module.css";
import {
  ensureInitialHash,
  getCurrentView,
  navigate,
  subscribe,
} from "./routes/routes.js";
import AddBoxView from "./view/AddBoxView.jsx";
import BoxesView from "./view/BoxesView.jsx";
import { initialState, reducer } from "./state/boxReducer.js";
import Navbar from "./components/navbar/Navbar.jsx";
import { formatINR } from "./utils/formatting.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [view, setView] = useState(() => getCurrentView());
  useEffect(() => {
    ensureInitialHash();
    const unsub = subscribe(setView);
    return () => unsub();
  }, []);

  return (
    <div className={layout.appShell}>
      <Navbar active={view} onNavigate={(view) => navigate(view, setView)} />

      {view === "form" ? (
        <AddBoxView dispatch={dispatch} />
      ) : (
        <BoxesView state={state} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
