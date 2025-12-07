# Shipping Box – MVC React

## Live demo 👇

https://lucky-swan-3718fa.netlify.app/#form

A tiny single‑page app to capture shipping boxes and compute INR shipping cost by destination. Built with **React (CRA)** following an **MVC-style** separation:

- **Model**: data logic (rates, box creation, cost, normalization)
- **Controller**: validation, orchestration, API calls, request flow
- **View**: components/views with modular CSS

## Features

- View A: **Add Box** form (receiver, weight, color picker → stored as `rgb(r,g,b)`, country)
- View B: **Boxes Table** (color swatch, INR currency formatting)
- **Navbar** tabs: Add Box ⇄ Boxes
- **Validation**: required fields; negative weight shows error and resets to `0` (spec compliant)
- **Responsive** UI with **CSS Modules** + design tokens
- **Local storage mock API** (two endpoints): `listBoxes()`, `saveBox()`
- **.env configuration** (CRA `REACT_APP_` variables with safe fallbacks)
- **Hash-based routing** without external deps (router isolated in `src/routes/routes.js`)

## Architecture (MVC)

```
src/
  App.jsx
  components/
    Navbar/
      Navbar.jsx
      Navbar.module.css
    boxes/
      BoxForm/
        BoxForm.jsx
        BoxForm.module.css
      BoxesTable/
        BoxesTable.jsx
        BoxesTable.module.css
      ColorSwatch/
        ColorSwatch.jsx
        ColorSwatch.module.css

  controllers/
    boxesController.js       # validate, create, list (business + flow)

  models/
    box.js                   # normalizeWeight, computeCost, makeBox
    rates.js                 # COUNTRY_RATES from env + fallbacks

  routes/
    routes.js                # tiny hash router (subscribe/navigate)

  services/
    api/
      boxApi.js              # localStorage mock endpoints

  state/
    boxReducer.js            # boxes, loading, error (no route state)

  styles/
    tokens.css               # design tokens
    global.css               # base styles
    layout.module.css        # layout helpers/cards/banner
    form.module.css          # shared form styles

  utils/
    formatting.js            # INR formatter
    hexToRgbString.js        # color conversion
```

## Tech Stack

- **React 19** (Create React App)
- **CSS Modules** (scoped styles)
- No external runtime dependencies

2. **Create `.env`** (project root)

   ```env
   REACT_APP_RATE_SWEDEN=7.35
   REACT_APP_RATE_CHINA=11.53
   REACT_APP_RATE_BRAZIL=15.63
   REACT_APP_RATE_AUSTRALIA=50.09
   ```

3. **Run**

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000)

> CRA loads env vars at startup. If you change `.env`, stop and re‑run `npm start`.

## ⚙️ Scripts

```bash
npm start   # dev server (CRA)
npm run build  # production build (minified in build/)
```

## 🔐 Environment Config

Env vars must start with `REACT_APP_` in CRA. Used keys:

- `REACT_APP_RATE_SWEDEN`
- `REACT_APP_RATE_CHINA`
- `REACT_APP_RATE_BRAZIL`
- `REACT_APP_RATE_AUSTRALIA`
