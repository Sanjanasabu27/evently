import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeEventSlider.css";

function HomeEventSlider({ events }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [events]);

  if (!events.length) return null;

  const event = events[current];

  return (
    <section className="home-slider">

      <h2 className="slider-title">
        Upcoming Events
      </h2>

      <div className="slider-card">

        <div className="slider-image">

          <img
            src={event.image}
            alt={event.eventName}
          />

        </div>

        <div className="slider-content">

          <span className="event-tag">
            UPCOMING EVENT
          </span>

          <h1>{event.eventName}</h1>

          <div className="event-info">

            <span>📍 {event.room}</span>

            <span>
              📅 {event.eventDates?.[0]?.date}
            </span>

          </div>

          <p>
            {event.description}
          </p>

          <button
            className="register-btn"
            onClick={() => {

              const user = localStorage.getItem("user");

              if (user) {
                navigate("/register", {
  state: event
});
              } else {
                navigate("/login");
              }

            }}
          >
            Register Now →
          </button>

        </div>

      </div>

      <div className="dots">

        {events.map((_, index) => (

          <span
            key={index}
            className={
              current === index
                ? "dot active"
                : "dot"
            }
          />

        ))}

      </div>

    </section>
  );
}

export default HomeEventSlider;