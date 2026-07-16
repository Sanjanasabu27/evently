import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./AdminEvents.css";

function AdminEvents() {

  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    eventName: "",
    room: "",
    status: "Available"
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    fetch("https://evently-backend-yjtq.onrender.com/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://evently-backend-yjtq.onrender.com/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    loadEvents();

    setFormData({
      eventName: "",
      room: "",
      status: "Available"
    });
  };

  return (
    <>
      <Sidebar />

      <div className="dashboard-container">

        <h1>Manage Events</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={(e) =>
              setFormData({
                ...formData,
                eventName: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Room"
            value={formData.room}
            onChange={(e) =>
              setFormData({
                ...formData,
                room: e.target.value
              })
            }
          />

          <button type="submit">
            Add Event
          </button>

        </form>

        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Room</th>
            </tr>
          </thead>

          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event.eventName}</td>
                <td>{event.room}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default AdminEvents;