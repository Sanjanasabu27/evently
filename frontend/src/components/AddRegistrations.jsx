import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "./AddRegistration.css";

function AddRegistrations() {
  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user") || "null");

const [userName] = useState(user?.fullName || "");

console.log("User from localStorage:", user);
  const [ticketCount, setTicketCount] = useState("");
  const [contact, setContact] = useState("");
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [events, setEvents] = useState([]);
  const [seatData, setSeatData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation();
   
  const eventData = location.state;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const registration = {
  userName,
  ticketCount,
  contact,
  nameOfEvent,
  eventDate,
  paymentStatus,
};

    try {
      const response = await fetch(
        "https://evently-backend-yjtq.onrender.com/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registration),
        }
      );

      const data = await response.json();

if (!response.ok) {
  setModalMessage(
    `${data.message} - Available Seats: ${data.availableSeats || 0}`
  );
  setShowModal(true);
  return;
}

alert("Registration Added Successfully!");

      setTicketCount("");
      setContact("");
      setNameOfEvent("");
      setEventDate(null);
      setPaymentStatus("Paid");

      navigate("/MyEvents");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save registration");
    }
  };
  useEffect(() => {
  fetch("https://evently-backend-yjtq.onrender.com/events")
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((err) => console.log(err));
}, []);
const selectedEvent = events.find(
  (event) => event.eventName === nameOfEvent
);
useEffect(() => {
  if (!selectedEvent) return;

  const loadSeats = async () => {
    const seats = {};

    for (const d of selectedEvent.eventDates) {
      const response = await fetch(
        `https://evently-backend-yjtq.onrender.com/seat-availability/${selectedEvent.eventName}/${d.date}`
      );

      const data = await response.json();

      seats[d.date] = data.availableSeats;
    }

    setSeatData(seats);
  };

  loadSeats();
}, [selectedEvent]);
console.log("Selected Event:", selectedEvent);
console.log("Event Dates:", selectedEvent?.eventDates);
if (!user) {
  return (
    <div className="login-required">
      <div className="login-card">

        <div className="login-icon">
          🎟️
        </div>

        <h1>Welcome to Evently</h1>

        <h3>Login Required</h3>

        <p>
          To register for an event, you need to log in to your account.
        </p>

        <p>
          New to Evently? Create an account in just a few seconds and start
          exploring exciting events.
        </p>

        <div className="login-buttons">
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="signup-btn">
              Create Account
            </button>
          </Link>
        </div>

        <div className="back-home">
          <Link to="/">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
return (
     <div className="registration-container">
    <div className="card">
      <div style={{ padding: "20px" }}>
        <h2>Create Registration</h2>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
            <label>USER NAME:</label>
            <input
  type="text"
  value={userName}
  readOnly
/>
          </div>
          </div>
          <br />

          <div>
            <div className="form-group">
            <label>TICKET COUNT:</label>
            <input
              type="number"
              placeholder="Number of Tickets"
              value={ticketCount}
              onChange={(e) =>
                setTicketCount(e.target.value)
              }
              required
            />
          </div>
          </div>
          <br />

          <div>
            <div className="form-group">
            <label>CONTACT:</label>
            <input
              type="text"
              placeholder="Email / Phone"
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
              required
            />
          </div>
          </div>

          <br />

          <div>
            <div className="form-group">
              <label>EVENT NAME:</label>
              <select
                value={nameOfEvent}
                onChange={(e) => {
                  setNameOfEvent(e.target.value);
                  setEventDate(null);
                }}
                required
                style={{ color: "black" }}
>
    <option value="" style={{ color: "black" }}>
      Select Event
    </option>

    {events.map((event) => (
      <option
        key={event._id}
        value={event.eventName}
        style={{ color: "black" }}
      >
        {event.eventName}
      </option>
    ))}
  </select>
</div>
          </div>

          <br />

          <div>
            <div className="form-group">
            <label>EVENT DATE:</label>

            <DatePicker
              selected={eventDate ? new Date(eventDate) : null}
              onChange={(date) => {
  if (date) {
    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    setEventDate(
      `${year}-${month}-${day}`
    );
  }
}}
              includeDates={
                selectedEvent?.eventDates?.map((event) => {
                  const parts = event.date.split("-");

                  return new Date(
                    Number(parts[0]),
                    Number(parts[1]) - 1,
                    Number(parts[2])
                  );
                }) || []
              }
              dayClassName={(date) => {
  const formatted =
    `${date.getFullYear()}-${
      String(date.getMonth() + 1).padStart(2, "0")
    }-${
      String(date.getDate()).padStart(2, "0")
    }`;

  const selectedDate =
    selectedEvent?.eventDates?.find(
      (d) => d.date === formatted
    );

  if (!selectedDate) return "";

  if (seatData[formatted] === 0) {
    return "full-date";
  }

  return "available-date";
}}
              dateFormat="yyyy-MM-dd"
            />
            {eventDate && seatData[eventDate] !== undefined && (

<div className="seat-card">

<h3>Available Seats</h3>

<p>{seatData[eventDate]} Seats Left</p>

</div>

)}
          </div>
          </div>
          <br />

          <div>
            <div className="form-group">
            <label>PAYMENT STATUS:</label>
            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(e.target.value)
              }
            >
              <option value="Paid">Paid</option>
              <option value="Not Paid">
                Not Paid
              </option>
            </select>
          </div>
          </div>

          <br />

          <button type="submit">
            Save Registration
          </button>
          {showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Registration Failed</h3>

      <p>{modalMessage}</p>

      <button
  className="ok-btn"
  onClick={() => setShowModal(false)}
>
  OK
</button>
    </div>
  </div>
)}
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddRegistrations;