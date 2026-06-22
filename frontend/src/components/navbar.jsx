import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
    <div>
    <nav className="navbar">
      <h1>Event Registration Management System</h1>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Register</Link>
      </div>
    </nav>
    </div>
    </div>
  );
}

export default Navbar;