import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./EventSection.css";

function EventsSection() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <section className="events-section">

      <h2>Upcoming Events</h2>

      <div className="events-container">

        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}

      </div>

    </section>
  );
}

export default EventsSection;