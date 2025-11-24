import React, { useEffect, useState } from "react";

export default function Today() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("todayTasks") || "[]"));
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    localStorage.setItem("todayTasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;
    const t = { id: Date.now(), text: text.trim(), done: false, priority, notes: "", subtasks: [] };
    setTasks([t, ...tasks]);
    setText("");
    setPriority("medium");
  }

  function toggleDone(id) {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function addNote(id) {
    const note = prompt("Add notes for task (leave empty to cancel):");
    if (note === null) return;
    setTasks(tasks.map(t => (t.id === id ? { ...t, notes: note } : t)));
  }

  function addSubtask(id) {
    const st = prompt("Subtask (leave empty to cancel):");
    if (!st) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, subtasks: [...t.subtasks, { id:Date.now(), text:st, done:false }] } : t));
  }

  function toggleSubtask(taskId, subId) {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, subtasks: t.subtasks.map(s => s.id === subId ? { ...s, done: !s.done } : s) } : t));
  }

  return (
    <div className="container glass">
      <h2>Today's Plan</h2>

      <div className="input-row">
        <input
          value={text}
          placeholder="Add task (eg: Solve 10 DSA problems)"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="btn" onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <div className="empty">No tasks for today — add one above ✨</div>}
        {tasks.map(t => (
          <div key={t.id} className={`task-card ${t.done ? "done" : ""}`}>
            <div className="task-left">
              <div className={`priority-dot ${t.priority}`} />
              <div className="task-body">
                <div className="task-title" onClick={() => toggleDone(t.id)}>{t.text}</div>
                <div className="small">{t.notes || (t.subtasks.length ? `${t.subtasks.length} subtasks` : "No notes")}</div>
              </div>
            </div>

            <div className="task-actions">
              <button className="btn ghost" onClick={() => addSubtask(t.id)}>+Sub</button>
              <button className="btn ghost" onClick={() => addNote(t.id)}>Note</button>
              <button className="btn danger" onClick={() => removeTask(t.id)}>Delete</button>
            </div>

            {t.subtasks && t.subtasks.length > 0 && (
              <div className="subtask-list">
                {t.subtasks.map(s => (
                  <div key={s.id} className={`subtask ${s.done ? "done" : ""}`}>
                    <label>
                      <input type="checkbox" checked={s.done} onChange={() => toggleSubtask(t.id, s.id)} /> {s.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
