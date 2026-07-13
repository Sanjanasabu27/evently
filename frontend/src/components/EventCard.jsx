import { useNavigate } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/add", {
      state: {
        eventName: event.eventName,
        room: event.room
      }
    });
  };

  return (
    <div className="event-card">

      <h3>{event.eventName}</h3>

      <p>
        <strong>Room:</strong> {event.room}
      </p>

      <ul>
        {event.eventDates?.map((item, index) => (
          <li key={index}>
            {item.date} | Capacity: {item.capacity}
          </li>
        ))}
      </ul>

      <button onClick={handleRegister}>
        Register Now
      </button>

    </div>
  );
}

export default EventCard;