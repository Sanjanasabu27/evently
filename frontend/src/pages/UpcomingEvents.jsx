import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import "./UpcomingEvent.css";

function UpcomingEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
  <div className="dashboard">
    <UserSidebar />

    <div className="main-content">

      <h1>Upcoming Events</h1>

      <div className="upcoming-events-grid">

        {events.map((event) => (

          <div className="upcoming-card" key={event._id}>

            <img
              src={
                event.image ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              }
              alt={event.eventName}
            />

            <div className="upcoming-details">

              <h2>{event.eventName}</h2>

              <p>{event.description}</p>

              <p>🏷️ {event.category}</p>

              <p>📍 {event.room}</p>

              <p>📅 {event.eventDates?.[0]?.date}</p>

              <p>👥 {event.eventDates?.[0]?.capacity} Seats</p>

              <button
                onClick={() =>
                  navigate("/add", {
                    state: {
                      selectedEvent: event
                    }
                  })
                }
              >
                Register Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  </div>
);
}

export default UpcomingEvents;