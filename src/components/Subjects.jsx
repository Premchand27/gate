import React, { useEffect, useState } from "react";

const DEFAULT_SUBJECTS = [
  { name: "Data Structures", topics: ["Arrays", "Linked Lists", "Trees"] },
  { name: "Algorithms", topics: ["Greedy", "DP", "Graphs"] },
  { name: "Operating Systems", topics: ["Processes", "Scheduling"] },
];

export default function Subjects() {
  const [subjects, setSubjects] = useState(() => JSON.parse(localStorage.getItem("subjects")) || DEFAULT_SUBJECTS);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  function addSubject() {
    if (!newSubject.trim()) return;
    setSubjects([{ name: newSubject.trim(), topics: [] }, ...subjects]);
    setNewSubject("");
  }

  function addTopic(idx) {
    const topic = prompt("Add topic name:");
    if (!topic) return;
    const s = subjects.slice();
    s[idx].topics.push(topic);
    setSubjects(s);
  }

  function toggleTopicDone(si, ti) {
    const s = subjects.slice();
    const t = s[si].topics[ti];
    s[si].topics[ti] = t.endsWith("|done") ? t.replace("|done", "") : t + "|done";
    setSubjects(s);
  }

  function progressPercentage(sub) {
    const total = sub.topics.length || 0;
    if (!total) return 0;
    const done = sub.topics.filter(t => t.endsWith("|done")).length;
    return Math.round((done / total) * 100);
  }

  return (
    <div className="container glass">
      <h2>Subjects</h2>

      <div className="input-row">
        <input value={newSubject} placeholder="New subject name" onChange={(e) => setNewSubject(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSubject()} />
        <button className="btn" onClick={addSubject}>Add Subject</button>
      </div>

      <div className="grid">
        {subjects.map((s, si) => (
          <div key={s.name} className="subject-glass">
            <div className="subject-head">
              <div>
                <div className="subject-title">{s.name}</div>
                <div className="small">{s.topics.length} topics • {progressPercentage(s)}%</div>
              </div>
              <div className="subject-actions">
                <button className="btn ghost" onClick={() => addTopic(si)}>+ Topic</button>
              </div>
            </div>

            <div className="progress-bar">
              <div style={{ width: `${progressPercentage(s)}%` }} />
            </div>

            <div className="topic-list">
              {s.topics.length === 0 && <div className="small">No topics yet</div>}
              {s.topics.map((t, ti) => (
                <div key={ti} className="topic-row">
                  <div style={{ opacity: t.endsWith("|done") ? 0.6 : 1 }}>{t.replace("|done", "")}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn ghost" onClick={() => toggleTopicDone(si, ti)}>{t.endsWith("|done") ? "Undo" : "Done"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
