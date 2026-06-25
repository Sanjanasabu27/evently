import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddRegistrations() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [contact, setContact] = useState("");
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [events, setEvents] = useState([]);
  const [seatData, setSeatData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
        "http://localhost:3000/registrations",
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

      setUserName("");
      setTicketCount("");
      setContact("");
      setNameOfEvent("");
      setEventDate(null);
      setPaymentStatus("Paid");

      navigate("/registration");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save registration");
    }
  };
  useEffect(() => {
  fetch("http://localhost:3000/events")
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
        `http://localhost:3000/seat-availability/${selectedEvent.eventName}/${d.date}`
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
  return (
    <div className="card">
      <div style={{ padding: "20px" }}>
        <h2>Create Registration</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>USER NAME:</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={userName}
              onChange={(e) =>
                setUserName(e.target.value)
              }
              required
            />
          </div>

          <br />

          <div>
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

          <br />

          <div>
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

          <br />

          <div>
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

          <br />

          <div>
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
          </div>
          <br />

          <div>
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
  );
}

export default AddRegistrations;