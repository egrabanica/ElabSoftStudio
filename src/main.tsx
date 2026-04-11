
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

const storedLanguage = localStorage.getItem("a11y-language-mode");
document.documentElement.lang = storedLanguage === "en" ? "en" : "sq";

  createRoot(document.getElementById("root")!).render(<App />);
  