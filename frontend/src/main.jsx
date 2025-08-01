import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import usePreferences from "./stores/UsePreference.jsx";
import { useTranslation } from "react-i18next";

const ApplyPreferences = ({ children }) => {
  const { theme, fontSize, fontFamily, language, loadPreferences } =
    usePreferences();
  const { i18n } = useTranslation();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    loadPreferences(); // Loads from localStorage
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;

    const body = document.body;

    // Theme
    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(`theme-${theme}`);

    // Font family
    body.classList.remove(
      "font-poppins",
      "font-arial",
      "font-sans",
      "font-serif",
      "font-mono",
      "font-montserrat"
    );
    body.classList.add(`font-${fontFamily}`);

    // Font size
    body.classList.remove("text-sm", "text-base", "text-lg", "text-xl");
    body.classList.add(`text-${fontSize}`);

    // Language
    i18n.changeLanguage(language);
  }, [theme, fontSize, fontFamily, language, ready]);

  // Optional loading state to avoid flicker
  if (!ready) return null;

  return <>{children}</>;
};

const Root = () => (
  <React.StrictMode>
    <ApplyPreferences>
      <App />
    </ApplyPreferences>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
