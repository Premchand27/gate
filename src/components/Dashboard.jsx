import { useEffect, useState } from 'react'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale)

export default function Dashboard() {
  useEffect(()=>{
    const ctx = document.getElementById('graph')
    new Chart(ctx, {
      type:'line',
      data:{
        labels:['Day1','Day2','Day3','Day4'],
        datasets:[{ data:[2,3,4,5]}]
      }
    })
  },[])

  return (
    <div className="fade">
      <h1>Dashboard</h1>
      <canvas id="graph"></canvas>
    </div>
  )
}