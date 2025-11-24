import React, { useEffect, useRef, useState } from "react";

function format(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export default function Pomodoro() {
  const [seconds, setSeconds] = useState(() => Number(localStorage.getItem("pomoSeconds")) || 1500);
  const [running, setRunning] = useState(() => localStorage.getItem("pomoRunning") === "true" || false);
  const [mode, setMode] = useState(() => localStorage.getItem("pomoMode") || "focus"); // focus or break
  const intervalRef = useRef(null);

  useEffect(() => localStorage.setItem("pomoSeconds", seconds), [seconds]);
  useEffect(() => localStorage.setItem("pomoRunning", running), [running]);
  useEffect(() => localStorage.setItem("pomoMode", mode), [mode]);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          // auto-switch
          if (mode === "focus") {
            setMode("break");
            return 300;
          } else {
            setMode("focus");
            return 1500;
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setMode("focus");
    setSeconds(1500);
  };

  const setFocus = () => { setMode("focus"); setSeconds(1500); setRunning(false); };
  const setBreak = () => { setMode("break"); setSeconds(300); setRunning(false); };

  return (
    <div className="container glass">
      <h2>Pomodoro</h2>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <div className="timer">{format(seconds)}</div>
        <div className="pomodoro-btns">
          {!running ? <button className="btn" onClick={start}>Start</button> : <button className="btn ghost" onClick={pause}>Pause</button>}
          <button className="btn ghost" onClick={reset}>Reset</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <button className={mode === "focus" ? "btn warn" : "btn ghost"} onClick={setFocus}>Focus</button>
          <button className={mode === "break" ? "btn warn" : "btn ghost"} onClick={setBreak}>Break</button>
        </div>
      </div>
    </div>
  );
}
