import React from "react";
import{BrowserRouter,Routes,Route}from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Graph from "./Graph";
import Alert from "./Alert";
import History from "./History";
function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition:true,
      v7_relativeSplatPath:true
    }}>      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/graph" element={<Graph/>}/>
        <Route path="/alert" element={<Alert/>}/>
        <Route path="/history" element={<History/>}/>
</Routes>
  </BrowserRouter>
  );
}
export default App;