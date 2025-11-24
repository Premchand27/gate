import React, { useState } from "react";

export default function SubjectTracker() {
  const subjects = [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "DBMS",
    "Computer Networks",
    "Compiler Design",
    "Theory of Computation",
    "Digital Logic"
  ];

  const [progress, setProgress] = useState({});

  function update(subject, val) {
    setProgress({ ...progress, [subject]: val });
  }

  return (
    <div className="card">
      <h2>Subject Tracker</h2>

      {subjects.map((s) => (
        <div className="subject-row" key={s}>
          <label>{s}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress[s] || 0}
            onChange={(e) => update(s, e.target.value)}
          />
          <span>{progress[s] || 0}%</span>
        </div>
      ))}
    </div>
  );
}
