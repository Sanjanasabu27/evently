import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import ListRegistrations from "./components/ListRegistrations";
import AddRegistrations from "./components/AddRegistrations";
import EditRegistration from "./components/EditRegistration";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">

  <div className="sidebar">
    <a href="/registration">📋</a>
    <a href="/add">➕</a>
    <a href="/">🏠</a>
  </div>

  <div className="main-content">

    <Navbar />

    <main className="page-shell">
      <Routes>
        <Route path="/" element={<Navigate to="/registration" replace />} />
        <Route path="/registration" element={<ListRegistrations />} />
        <Route path="/add" element={<AddRegistrations />} />
        <Route path="/edit/:id" element={<EditRegistration />} />
      </Routes>
    </main>

  </div>

    <div className="shape circle1"></div>
    <div className="shape circle2"></div>
    <div className="shape diamond"></div>
    <div className="orbit"></div>
  </div>
    </BrowserRouter>
  );
}

export default App;