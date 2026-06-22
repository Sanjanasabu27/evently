import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [contact, setContact] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  
  useEffect(() => {
    fetch(`http://localhost:3000/registrations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userName);
        setTicketCount(data.ticketCount);
        setContact(data.contact);
        setPaymentStatus(data.paymentStatus);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registration = {
      userName,
      ticketCount,
      contact,
      paymentStatus,
    };

    try {
      await fetch(
        `http://localhost:3000/registrations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registration),
        }
      );

      alert("Registration Updated Successfully!");
      navigate("/registration");
    } catch (error) {
      console.log(error);
      alert("Failed to update registration");
    }
  };

  return (
    <div className="card">
    <>
      <h2>Edit Registration</h2>

      <form onSubmit={handleSubmit}>
        <br />
        <label>USER NAME: </label>
        <input
          type="text"
          placeholder="Enter The Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>TICKET COUNT:</label>
        <input
          type="number"
          placeholder="Number of Tickets"
          value={ticketCount}
          onChange={(e) => setTicketCount(e.target.value)}
        />
        

        <label>CONTACT :</label>
        <input
          type="text"
          placeholder="Email / Phone"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        

        <label>PAYMENT STATUS:</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option>Paid</option>
          <option>Not Paid</option>
        </select>
        

        <button type="submit">
          Update Registration
        </button>
      </form>
    </>
    </div>
  );
}

export default EditRegistration;