import UserSidebar from "../components/UserSidebar";
import "./UserDashboard.css";
import FeaturedEvent from "../components/FeaturedEvent";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
const navigate = useNavigate();

  return (
    <div className="dashboard">

      <UserSidebar />

      <div className="main-content">

        <div className="hero-section">

          <div className="hero-left">

            <h1>
              Welcome Back,
              <br />
              {user?.fullName}
            </h1>

            <p>
              Discover workshops, coding contests,
              hackathons and exciting events.
            </p>

            <button
  className="hero-btn"
  onClick={() => navigate("/upcoming")}
>
  Explore Events
</button>

          </div>

          <div className="hero-right">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt=""
            />

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>12</h2>
            <p>Events</p>
          </div>

          <div className="stat-card">
            <h2>5</h2>
            <p>Registered</p>
          </div>

          <div className="stat-card">
            <h2>3</h2>
            <p>Upcoming</p>
          </div>

          <div className="stat-card">
            <h2>2</h2>
            <p>Certificates</p>
          </div>

        </div>

        <h2 className="section-title">
          Upcoming Events
        </h2>

        <div className="events-grid">

          <div className="event-card">
            <h3>Hackathon</h3>
            <p>24 June 2026</p>
          </div>

          <div className="event-card">
            <h3>Workshop</h3>
            <p>25 June 2026</p>
          </div>

          <div className="event-card">
            <h3>Coding Contest</h3>
            <p>26 June 2026</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;