import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventForm.css";

function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Open");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {

    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {

        setEventName(data.eventName || "");
        setDescription(data.description || "");
        setCategory(data.category || "");
        setRoom(data.room || "");
        setImage(data.image || "");
        setStatus(data.status || "Open");

        if (data.eventDates?.length > 0) {
          setDate(data.eventDates[0].date);
          setCapacity(data.eventDates[0].capacity);
        }

      });

  }, [id]);

  const handleUpdate = async (e) => {

    e.preventDefault();

    const updatedEvent = {
      eventName,
      description,
      category,
      room,
      image,
      status,
      eventDates: [
        {
          date,
          capacity: Number(capacity)
        }
      ]
    };

    const response = await fetch(
      `http://localhost:3000/events/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEvent)
      }
    );

    if (response.ok) {
      alert("Event Updated Successfully");
      navigate("/admin/events");
    }
  };

  return (
    <div className="event-page">

      <div className="event-form-card">

        <h1>Edit Event</h1>

        <form onSubmit={handleUpdate}>

          <input
            value={eventName}
            onChange={(e)=>setEventName(e.target.value)}
            placeholder="Event Name"
          />

          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            placeholder="Category"
          />

          <input
            value={room}
            onChange={(e)=>setRoom(e.target.value)}
            placeholder="Room"
          />

          <input
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            placeholder="Image URL"
          />

          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />

          <input
            type="number"
            value={capacity}
            onChange={(e)=>setCapacity(e.target.value)}
          />

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            type="submit"
            className="create-btn"
          >
            Update Event
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditEvent;