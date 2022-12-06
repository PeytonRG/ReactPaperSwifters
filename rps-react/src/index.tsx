import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
