import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import "./Settings.css";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaMoon,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight
} from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
  <div className={`dashboard ${darkMode ? "dark-theme" : ""}`}>
    <UserSidebar />

    <div className="main-content">
      <div className="settings-container">

        <h1 className="settings-title">⚙️ Settings</h1>

        <p className="settings-subtitle">
          Manage your account and preferences
        </p>

        <div className="settings-list">

          {/* Profile */}
          <div
            className="settings-item"
            onClick={() => navigate("/profile")}
          >
            <div className="left">
              <FaUser className="icon" />
              <div>
                <h3>Edit Profile</h3>
                <p>Update your personal information</p>
              </div>
            </div>

            <FaChevronRight className="arrow" />
          </div>

          {/* Password */}
          <div className="settings-item">
            <div className="left">
              <FaLock className="icon" />
              <div>
                <h3>Change Password</h3>
                <p>Coming Soon</p>
              </div>
            </div>

            <FaChevronRight className="arrow" />
          </div>

          {/* Notifications */}
          <div className="settings-item">
            <div className="left">
              <FaBell className="icon" />
              <div>
                <h3>Notifications</h3>
                <p>Coming Soon</p>
              </div>
            </div>

            <FaChevronRight className="arrow" />
          </div>

          {/* Dark Mode */}
          <div className="settings-item">
            <div className="left">
              <FaMoon className="icon" />
              <div>
                <h3>Dark Mode</h3>
                <p>Enable dark appearance</p>
              </div>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Help */}
          <div className="settings-item">
            <div className="left">
              <FaQuestionCircle className="icon" />
              <div>
                <h3>Help & Support</h3>
                <p>Coming Soon</p>
              </div>
            </div>

            <FaChevronRight className="arrow" />
          </div>

          {/* Logout */}
          <div
            className="settings-item logout"
            onClick={logout}
          >
            <div className="left">
              <FaSignOutAlt className="icon logout-icon" />
              <div>
                <h3>Logout</h3>
                <p>Sign out of your account</p>
              </div>
            </div>

            <FaChevronRight className="arrow" />
          </div>

        </div>

      </div>
    </div>
  </div>
);
}

export default Settings;