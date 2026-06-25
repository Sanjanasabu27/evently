import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        ERS
      </div>

      <div className="menu">
        <Link to="/registration">📋</Link>
        <Link to="/settings">⚙</Link>
        <Link to="/">🏠</Link>
      </div>

    </div>
  );
}

export default Sidebar;