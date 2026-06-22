import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddRegistrations() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [contact, setContact] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registration = {
      userName,
      ticketCount,
      contact,
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

console.log(data);

alert("Registration Added Successfully!");

setUserName("");
setTicketCount("");
setContact("");
setPaymentStatus("Paid");

navigate("/registration");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save registration");
    }
  };

  return (
  <div className="card">
    <div style={{ padding: "20px" }}>
      <h2>Create Registration</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>USER NAME:</label>
          &nbsp;&nbsp;&nbsp;
          <input
            type="text"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>TICKET COUNT:</label>
          &nbsp;&nbsp;
          <input
            type="number"
            placeholder="Number of Tickets"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>CONTACT:</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            placeholder="Email / Phone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>PAYMENT STATUS:</label>
          &nbsp;
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
        </div>

        <br />

        <button type="submit">
          Save Registration
        </button>
      </form>
    </div>
    </div>
  );
}

export default AddRegistrations;