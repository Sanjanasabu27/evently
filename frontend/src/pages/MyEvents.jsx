import { useEffect, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import "./MyEvents.css";

function MyEvents() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("No user found in localStorage");
      return;
    }

    console.log("Stored User:", user);
    console.log("User ID:", user.id);
    console.log("Full Name:", user.fullName);

   fetch(
  `http://localhost:3000/registrations/user/${encodeURIComponent(
    user.fullName
  )}`
)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch registrations");
        }
        return res.json();
      })
      .then((data) => {
        console.log("My registrations:", data);
        setRegistrations(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div className="dashboard">
      <UserSidebar />

      <div className="main-content">
        <h1>My Registered Events</h1>

        <div className="event-grid">
          {registrations.length === 0 ? (
            <p>No registrations found.</p>
          ) : (
            registrations.map((event) => (
              <div className="event-card" key={event._id}>
                <h2>{event.nameOfEvent}</h2>

                <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>

                <p>📍 {event.room}</p>

                <p>🎟 Tickets: {event.ticketCount}</p>

                <p>📞 {event.contact}</p>

                <p>📧 {event.email}</p>

                <span className={`status ${event.paymentStatus}`}>
                  {event.paymentStatus}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;