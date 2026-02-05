import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import{Link} from "react-router-dom" ;
function Dashboard() {
  const [temperature, setTemperature] = useState("--");
  const [ph, setPh] = useState("--");
  const [oxygen, setOxygen] = useState("--");
  const [status, setStatus] = useState("LOADING...");
  const [lastUpdated, setLastUpdated] = useState("--:--:--");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sensors/latest");
        const data = await res.json();
        if (data) {
          setTemperature(data.temperature.toFixed(2) + " °C");
          setPh(data.ph.toFixed(2));
          setOxygen(data.oxygenLevel + " %");
          setStatus(data.status || "NORMAL");
          setLastUpdated(new Date(data.timestamp).toLocaleTimeString());
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  const statusClass = status === "CRITICAL" ? "status-critical" : "status-normal";
  return (
    <>
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/graph">Graph</Link>
      <Link to="/alert">Alert</Link> 
      <Link to="/history">History</Link>
    </nav>    
    <div className="container">
      <h2>Real-time Bioreactor Monitoring</h2>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Temperature</h3>
          <span className="value" style={{ color: "#f39c12" }}>{temperature}</span>
        </div>
        <div className="card">
          <h3>pH Level</h3>
          <span className="value" style={{ color: "#27ae60" }}>{ph}</span>
        </div>
        <div className="card">
          <h3>Oxygen Level</h3>
          <span className="value" style={{ color: "#2980b9" }}>{oxygen}</span>
        </div>
        <div className="card">
          <h3>System Status</h3>
          <div style={{ marginTop: "20px" }}>
            <span id="status-val" className={statusClass}>{status}</span>
          </div>
        </div>
        <div className="card">
          <h3>Last Update</h3>
          <span className="value" style={{ fontSize: "24px", color: "#7f8c8d" }}>{lastUpdated}</span>
        </div>
      </div>
    </div>
    </>
  );  
}
export default Dashboard;