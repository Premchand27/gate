import React, { useEffect, useState } from "react";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function Weekly(){
  const [plan, setPlan] = useState(() => JSON.parse(localStorage.getItem("weekPlan") || "{}"));

  useEffect(() => {
    localStorage.setItem("weekPlan", JSON.stringify(plan));
  }, [plan]);

  const addTask = (d) => {
    const text = prompt(`Add task for ${d}:`);
    if (!text) return;
    const next = { ...plan, [d]: [...(plan[d] || []), { id: Date.now(), text }] };
    setPlan(next);
  };

  const removeTask = (d, id) => {
    const next = { ...plan, [d]: (plan[d] || []).filter(t => t.id !== id) };
    setPlan(next);
  };

  return (
    <div className="container glass">
      <h2>Weekly Planner</h2>
      <div className="week-grid">
        {DAYS.map(d => (
          <div key={d} className="day-glass">
            <div className="day-head">
              <div className="day-title">{d}</div>
              <button className="btn ghost" onClick={() => addTask(d)}>Add</button>
            </div>
            <div className="day-tasks">
              {(plan[d] || []).length === 0 && <div className="small">No tasks</div>}
              {(plan[d] || []).map(t => (
                <div key={t.id} className="day-task">
                  <div>{t.text}</div>
                  <button className="btn danger" onClick={() => removeTask(d, t.id)}>Del</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
