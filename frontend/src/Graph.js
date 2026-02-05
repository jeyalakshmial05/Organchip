import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import "./Graph.css"; 
import { Link } from "react-router-dom";
function Graph() {
  const canvasRef = useRef(null);
  const [param, setParam] = useState("ph");
  const chartRef = useRef(null);
  const handleParamChange = (e) => {
    setParam(e.target.value);
  };
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "pH Level",
            data: [],
            borderColor: "#27ae60",
            backgroundColor: "rgba(39, 174, 96, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#fff",
            pointHoverRadius:5,
            pointBorderColor:"#5fa89c",
            pointBorderWidth:2,
            // Curvy lines settings
            tension: 0.45, 
            spanGaps:true,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { font: { size: 14, weight: "bold" } } }
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "second",
              displayFormats: { second: "HH:mm:ss" }
            },
            ticks: { autoSkip: true, maxTicksLimit: 6,maxRotation:45,minRotation:45},
            grid: { display: false }
          },
          y: {
            grid: { color: "#eef2f3" },
            beginAtZero: false,
            ticks:{stepSize:0.1}
          }
        }
      }
    });
    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);
  useEffect(() => {
    const updateGraph = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/sensors/all");
        const fullData = await res.json();
        const now = Date.now();
        const fiveMinutesAgo = now - 5 * 60 * 1000;
        const data = fullData
          .map(d => {
            const t = new Date(d.timestamp.replace(" ", "T"));
            t.setMilliseconds(0);
            return{...d,_time:t};
          })
          .filter(d => d._time >= fiveMinutesAgo)
          .sort((a, b) => a._time - b._time)
          .slice(-100);
        chartRef.current.data.datasets[0].data = data.map(d => ({
          x: d._time,
          y: Number(d[param])
        }));        
        chartRef.current.options.scales.x.min = now - 5 * 60 * 1000;
        chartRef.current.options.scales.x.max = now;
        const labelMap = { ph: "pH Level", temperature: "Temp (°C)", oxygenLevel: "Oxygen (%)" };
        chartRef.current.data.datasets[0].label = labelMap[param];
        chartRef.current.update('none'); 
      } catch (e) {
        console.error(e);
      }
    };
    updateGraph();
    const interval = setInterval(updateGraph, 5000);
    return () => clearInterval(interval);
  }, [param]);
  return (
    <>
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/graph">Graph</Link>
        <Link to="/alert">Alert</Link> 
        <Link to="/history">History</Link>
      </nav>      
      <div className="container">
        <h2>Live Sensor Data Trends</h2>
        <div className="graph-card">
          <div className="controls">
            <label>Monitoring Parameter:</label>
            <select value={param} onChange={handleParamChange}>
              <option value="ph">pH Level</option>
              <option value="temperature">Temperature</option>
              <option value="oxygenLevel">Oxygen Level</option>
            </select>
          </div>
          <div style={{ height: "450px" }}>
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
export default Graph;