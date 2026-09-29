// ============================================================
// main.jsx — Application Entry Point
// ============================================================
// This is the first file that runs. It mounts the <App />
// component into the #root div in index.html.
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
