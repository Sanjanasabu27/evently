import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  navigate("/login");
};
  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <h2>EVENT HUB</h2>
      </div>

      <div className="sidebar-links">
        <Link to="/admin">📊 Dashboard</Link>

        <Link to="/registration">
          📋 Registrations
        </Link>

        <li>
  <Link to="/admin/events">
    Manage Events
  </Link>
</li>

        <Link to="/admin/profile">
  👤 Profile
</Link>

        <Link to="/">
  🏠 Website
</Link>
<li>
  <Link to="/admin/support">
    Support
  </Link>
</li>

<button
  className="logout-btn"
  onClick={handleLogout}
>
  🚪 Logout
</button>
      </div>

    </div>
  );
}

export default Sidebar;