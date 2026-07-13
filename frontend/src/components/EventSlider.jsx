import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/EventSlider.css";

function EventSlider({ events }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [events]);

  if (!events.length) return null;

  const event = events[current];

  const eventImages = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  ];

  return (
    <div className="slider-container">
      <div className="event-slider-card">

        <div className="slider-image">
          <img
            src={eventImages[current % eventImages.length]}
            alt={event.eventName}
          />
        </div>

        <div className="slider-details">

          <span className="event-tag">
            UPCOMING EVENT
          </span>

          <h1>{event.eventName}</h1>

          <div className="event-info">
            <span>📍 {event.room}</span>
            <span>📌 {event.status}</span>
          </div>

          <p>
            Participate in this exciting event and
            showcase your skills.
          </p>

          <button
            className="view-btn"
            onClick={() => navigate("/admin/events")}
          >
            View Details →
          </button>

        </div>
      </div>
    </div>
  );
}

export default EventSlider;