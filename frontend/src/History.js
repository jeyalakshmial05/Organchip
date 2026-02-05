import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./History.css";
const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
const loadHistory = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sensors/all");
      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedData = [...data].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setHistory(sortedData);
      }
       setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, []);
  useEffect(() => {
    loadHistory();
    const interval = setInterval(loadHistory, 5000);
    return () => clearInterval(interval);
  }, [loadHistory]);
  return (
    <>
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/graph">Graph</Link>
        <Link to="/alert">Alert</Link>
        <Link to="/history">History</Link>
      </nav>
      <div className="container">
        <h2>Sensor Data History</h2>
        <div className="history-card">
          <table className="history-table">
            <thead>
              <tr>
                <th>Time & Date</th>
                <th>Temperature (°C)</th>
                <th>Oxygen Level (%)</th>
                <th>pH Level</th>
              </tr>
            </thead>
          </table>
          <div className="table-body">
            <table className="history-table">
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      Error loading data...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  history.map((d, index) => {
                    const displayDateTime = new Date(
                      d.timestamp
                    ).toLocaleString();
                    return (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index === 0 ? "#e8f5e9" : "transparent",
                        }}
                      >
                        <td>{displayDateTime}</td>
                        <td>{d.temperature.toFixed(2)}</td>
                        <td>{d.oxygenLevel}</td>
                        <td>{d.ph.toFixed(2)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default History;