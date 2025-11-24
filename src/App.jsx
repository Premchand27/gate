import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Today from "./components/Today";
import Subjects from "./components/Subjects";
import Pomodoro from "./components/Pomodoro";
import Weekly from "./components/Weekly";

export default function App() {
  const [page, setPage] = useState(() => localStorage.getItem("page") || "today");

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <div className="app-root">
      <Navbar page={page} setPage={setPage} />
      <main className="app-main">
        {page === "today" && <Today />}
        {page === "subjects" && <Subjects />}
        {page === "pomodoro" && <Pomodoro />}
        {page === "weekly" && <Weekly />}
      </main>
      <footer className="app-footer">Made with ❤️ — GATE Planner (Local)</footer>
    </div>
  );
}
