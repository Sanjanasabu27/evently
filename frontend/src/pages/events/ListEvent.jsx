import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListEvent.css";
import { useNavigate } from "react-router-dom";

function ListEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetch("https://evently-backend-yjtq.onrender.com/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);
  const openDeleteModal = (id) => {
  setSelectedId(id);
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
  setSelectedId(null);
};

const handleDelete = async () => {

  try {

    await fetch(
      `https://evently-backend-yjtq.onrender.com/events/${selectedId}`,
      {
        method: "DELETE"
      }
    );

    setEvents(
      events.filter(
        event =>
          event._id !== selectedId
      )
    );

    closeModal();

  } catch (error) {

    console.log(error);

  }

};
const filteredEvents = events.filter((event) =>
  event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div>
      <div className="events-header">

        <h1>Manage Events</h1>

        <div className="header-actions">

            <input
                type="text"
                placeholder="Search Event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <button
                className="add-event-btn"
                onClick={() => navigate("/admin/events/add")}
            >
                + Add
            </button>

        </div>

      </div>

              
              <div className="events-grid">

        {filteredEvents.map((event) => (

          <div
            className="event-card"
            key={event._id}
          >

            <img
        src={
          event.image ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000"
        }
        alt={event.eventName}
      />

            <div className="event-content">

              <h2>{event.eventName}</h2>

              <p className="event-description">
                {event.description}
              </p>

              <div className="event-info">

        <div className="info-box">
          <span>🏷️</span>
          <p>{event.category}</p>
        </div>

        <div className="info-box">
          <span>📍</span>
          <p>{event.room}</p>
        </div>

        <div className="info-box">
          <span>📅</span>
          <p>{event.eventDates?.[0]?.date}</p>
        </div>

        <div className="info-box">
          <span>👥</span>
          <p>{event.eventDates?.[0]?.capacity} Seats</p>
        </div>

      </div>

              <span
                className={
                  event.status === "Open"
                    ? "status-open"
                    : "status-closed"
                }
              >
                {event.status}
              </span>

              <div className="card-actions">

                <Link
                  to={`/admin/events/edit/${event._id}`}
                >
                  <button className="edit-btn">
                    Edit
                  </button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    openDeleteModal(event._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Delete Event</h2>
              <p>Are you sure you want to delete this event?</p>
              <div className="modal-buttons">
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ListEvent;