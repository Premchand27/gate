import React, { useState } from "react";

export default function TodayPlanner() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  }

  return (
    <div className="card">
      <h2>Today's Tasks</h2>

      <div className="input-row">
        <input 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter today's task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
