import { useState } from "react";
import "./EventForm.css";

function AddEvent() {

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Open");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const event = {
    eventName,
    description,
    category,
    image,
    room,
    status,
    eventDates: [
      {
        date,
        capacity: Number(capacity)
      }
    ]
  };

  console.log(event);

  try {
    const response = await fetch(
      "http://localhost:3000/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {
      alert("Event Added Successfully");
    } else {
      alert("Failed");
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
  <div className="event-page">

    <div className="event-form-card">

      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Room</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          className="create-btn"
        >
          Create Event
        </button>

      </form>

    </div>

  </div>
);
}

export default AddEvent;