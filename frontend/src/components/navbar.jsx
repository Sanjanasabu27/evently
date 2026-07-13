import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <h2>  Event Registration Management</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/register">Register</Link>

        <Link to="/login">Login</Link>
      </div>


    </nav>
  );
}

export default Navbar;