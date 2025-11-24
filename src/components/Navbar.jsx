import React, { useEffect, useState } from "react";

export default function Navbar({ page, setPage }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <header className="nav-shell">
      <div className="nav-left">
        <div className="brand">
          <div className="brand-logo">G</div>
          <div className="brand-text">
            <div className="brand-title">GATE Planner</div>
            <div className="brand-sub">Plan • Track • Progress</div>
          </div>
        </div>
      </div>

      <nav className="nav-center">
        <button className={`nav-btn ${page === "today" ? "active" : ""}`} onClick={() => setPage("today")}>Today</button>
        <button className={`nav-btn ${page === "subjects" ? "active" : ""}`} onClick={() => setPage("subjects")}>Subjects</button>
        <button className={`nav-btn ${page === "pomodoro" ? "active" : ""}`} onClick={() => setPage("pomodoro")}>Pomodoro</button>
        <button className={`nav-btn ${page === "weekly" ? "active" : ""}`} onClick={() => setPage("weekly")}>Weekly</button>
      </nav>

      <div className="nav-right">
        <div className="theme-switch" onClick={toggleTheme} role="button" aria-label="Toggle theme">
          <div className={`switch ${theme === "dark" ? "on" : "off"}`}>
            <div className="knob" />
          </div>
          <div className="small-txt">{theme === "dark" ? "Dark" : "Light"}</div>
        </div>
      </div>
    </header>
  );
}
