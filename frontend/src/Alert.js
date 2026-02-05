import React, { useEffect, useState } from "react";
import "./Alert.css"; 
import {Link} from "react-router-dom";
function Alert() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sensors/latest");
        const data = await response.json();
        const alertList = [];
        if (data.oxygenLevel > 98.0 || data.oxygenLevel < 90.0) {
          alertList.push({ title: "Oxygen Alert", message: `Oxygen level is abnormal at ${data.oxygenLevel}%` });
        }
        if (data.temperature > 37.5) {
          alertList.push({ title: "High Temperature", message: `Critical heat detected: ${data.temperature}°C` });
        }
        if (data.ph < 7.2 || data.ph > 7.6) {
          alertList.push({ title: "pH Level Abnormal", message: `System pH is unstable at ${data.ph}` });
        }
        setAlerts(alertList);
        setLoading(false);
      } catch (err) {
        console.log("Waiting for sensor data...");
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <nav className="navbar">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/graph">Graph</Link>
            <Link to="/alert">Alert</Link> 
            <Link to="/history">History</Link>
          </nav>
      <div className="container">
        <h2>Active System Alerts</h2>
        <div className="alert-container">
          {loading && <div className="no-alerts">Initializing sensor monitoring...</div>}

          {!loading && alerts.length === 0 && (
            <div className="no-alerts">✅ All systems normal. No active alerts.</div>
          )}
          {!loading && alerts.length > 0 &&
            alerts.map((alert, index) => (
              <div className="alert-card" key={index}>
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-msg">{alert.message}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
export default Alert;