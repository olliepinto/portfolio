import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

const DARK_CLASS = "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  const setStoredTheme = (value: Theme) => {
    try {
      localStorage.setItem("theme", value);
    } catch (error) {
      // Storage may be unavailable.
    }
  };

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains(DARK_CLASS) ? "dark" : "light"
    );
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    document.documentElement.classList.toggle(DARK_CLASS, nextTheme === "dark");
    setStoredTheme(nextTheme);
    setTheme(nextTheme);
  };

  const toggleTheme = () => applyTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full bg-surface border border-border-color text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
      aria-pressed={theme === "dark"}
      aria-label={
        theme === "dark" ? "Activate light theme" : "Activate dark theme"
      }
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </button>
  );
}
