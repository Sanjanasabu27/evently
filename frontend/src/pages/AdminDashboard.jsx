import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Sidebar from "../components/Sidebar";
import EventSlider from "../components/EventSlider";

function AdminDashboard() {

  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

  useEffect(() => {

    fetch("https://evently-backend-yjtq.onrender.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));

    fetch("https://evently-backend-yjtq.onrender.com/registrations", {
  headers: {
    Authorization: localStorage.getItem("token")
  }
})
  .then((res) => res.json())
  .then((data) => {
  setRegistrations(Array.isArray(data) ? data : []);
});
  }, []);

  const room1 = registrations.filter(
    (r) => r.room === "Room 1"
  ).length;

  const room2 = registrations.filter(
    (r) => r.room === "Room 2"
  ).length;

  const room3 = registrations.filter(
    (r) => r.room === "Room 3"
  ).length;

  const room4 = registrations.filter(
    (r) => r.room === "Room 4"
  ).length;
  
  const bookedTickets =
  registrations.reduce(
    (sum, reg) =>
      sum + Number(reg.ticketCount || 0),
    0
  );

  return (
  <>
    <Sidebar />

    <div className="dashboard-container">

      <div className="welcome">
        <h1>Welcome, {user?.fullName} 👋</h1>
        <p>Manage events, registrations and monitor your system.</p>
      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h2>{registrations.length}</h2>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h2>{registrations.length}</h2>
          <p>Total Registrations</p>
        </div>

        <div className="card">
          <h2>{bookedTickets}</h2>
          <p>Booked Tickets</p>
        </div>

        <div className="card">
          <h2>{events.length}</h2>
          <p>Upcoming Events</p>
        </div>

      </div>

      <div className="upcoming-box">
        <h2>Upcoming Events</h2>

        <EventSlider events={events} />
      </div>

      <div className="recent-box">

        <h2>Recent Registrations</h2>

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Event</th>
              <th>Room</th>
            </tr>
          </thead>

          <tbody>

            {registrations.slice(0, 5).map((r, index) => (

              <tr key={r._id}>

                <td>{index + 1}</td>

                <td>{r.userName}</td>

                <td>{r.nameOfEvent}</td>

                <td>{r.room}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </>
);
}

export default AdminDashboard;