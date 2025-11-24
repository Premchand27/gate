import { useState } from 'react'

export default function Logs() {
  const [logs, setLogs] = useState(JSON.parse(localStorage.getItem('logs')||'[]'))
  const add = ()=>{
    const hours = prompt('Hours studied?')
    const topic = prompt('Topic?')
    const entry = {date:new Date().toLocaleDateString(), hours, topic}
    const updated=[...logs,entry]
    setLogs(updated)
    localStorage.setItem('logs',JSON.stringify(updated))
  }
  return (
    <div className="fade">
      <h1>Study Log</h1>
      <button onClick={add}>Add Log</button>
      {logs.map((l,i)=>(
        <div key={i} className="card">
          {l.date} — {l.hours} hrs — {l.topic}
        </div>
      ))}
    </div>
  )
}