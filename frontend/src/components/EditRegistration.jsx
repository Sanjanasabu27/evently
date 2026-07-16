import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [availableSeats, setAvailableSeats] = useState(0);
  const [userName, setUserName] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [contact, setContact] = useState("");
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [events, setEvents] = useState([]);
  const [seatData, setSeatData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    fetch(`https://evently-backend-yjtq.onrender.com/registrations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userName || "");
        setTicketCount(data.ticketCount || "");
        setContact(data.contact || "");
        setNameOfEvent(data.nameOfEvent || "");

        if (data.eventDate) {
          setEventDate(
            new Date(data.eventDate)
              .toISOString()
              .split("T")[0]
          );
        }

        setPaymentStatus(data.paymentStatus || "Paid");
      })
      .catch((err) => console.log(err));
  }, [id]);

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
  `http://localhost:3000/registrations/${id}`,
  {
    method: "PUT",
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

alert("Registration Updated Successfully!");
      navigate("/registration");
    } catch (error) {
      console.log(error);
      alert("Failed to update registration");
    }
  };
  useEffect(() => {
  fetch("http://localhost:3000/events")
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((err) => console.log(err));
}, []);
const handleEventChange = (e) => {
  setNameOfEvent(e.target.value);
  setEventDate("");
};
const selectedEvent=events.find(
  (event) => event.eventName ===
  nameOfEvent
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
console.log(selectedEvent?.eventDates);

  return (
    <div className="card">
      <h2>Edit Registration</h2>

      <form onSubmit={handleSubmit}>
        <br />

        <label>USER NAME:</label>
        <input
          type="text"
          placeholder="Enter The Name"
          value={userName}
          onChange={(e) =>
            setUserName(e.target.value)
          }
        />

        <label>TICKET COUNT:</label>
        <input
          type="number"
          placeholder="Number of Tickets"
          value={ticketCount}
          onChange={(e) =>
            setTicketCount(e.target.value)
          }
        />

        <label>CONTACT:</label>
        <input
          type="text"
          placeholder="Email / Phone"
          value={contact}
          onChange={(e) =>
            setContact(e.target.value)
          }
        />

        <label>EVENT NAME:</label>

<select
  value={nameOfEvent}
  onChange={handleEventChange}
>
  <option value="">
    Select Event
  </option>

  {events.map((event) => (
    <option
      key={event._id}
      value={event.eventName}
    >
      {event.eventName}
    </option>
  ))}
</select>


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
  selectedEvent?.eventDates?.map(
    (eventDate) => {
      const parts = eventDate.date.split("-");

      return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
      );
    }
  ) || []
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

        <br />
        <br />

        <button type="submit">
          Update Registration
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
  );
}

export default EditRegistration;