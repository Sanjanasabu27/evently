import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaTicketAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt
} from "react-icons/fa";

import "./UserSidebar.css";


function UserSidebar() {
  const navigate = useNavigate();
  return (
    <div className="user-sidebar">

      <div className="user-logo">
        📅
      </div>
      <div className="user-menu-item" onClick={() => navigate("/dashboard")}>
  ⏳
  <span>Home</span>
</div>

      <div className="user-menu">

        <div className="user-menu-item" onClick={() => navigate("/profile")}>
  <FaUser />
  <span>Profile</span>
</div>

<div className="user-menu-item" onClick={() => navigate("/myevents")}>
  <FaTicketAlt />
  <span>My Events</span>
</div>

<div className="user-menu-item" onClick={() => navigate("/upcoming")}>
  <FaCalendarAlt />
  <span>Upcoming</span>
</div>

<div className="user-menu-item" onClick={() => navigate("/settings")}>
  <FaCog />
  <span>Settings</span>
</div>

<Link to="/help" className="user-menu-item">
    <FaQuestionCircle />
    <span>Help</span>
</Link>

<div
  className="user-menu-item"
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }}
>
  <FaSignOutAlt />
  <span>Logout</span>
</div>

      </div>

    </div>
    
  );
}

export default UserSidebar;