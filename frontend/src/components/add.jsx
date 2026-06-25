import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/registrations")
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.userName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      registration.contact
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      registration.nameOfEvent
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

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
        `http://localhost:3000/registrations/${selectedId}`,
        {
          method: "DELETE",
        }
      );

      setRegistrations(
        registrations.filter(
          (registration) =>
            registration._id !== selectedId
        )
      );

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>
          All Registrations
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <label>Search 🔎 </label>

            <input
              type="text"
              placeholder="Search by Name, Contact or Event"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <Link to="/add">
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "999px",
                padding: "10px 20px",
              }}
            >
              Add Registration
            </button>
          </Link>
        </div>
        
        <table
          border="1"
          width="100%"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>User Name</th>
              <th>Tickets</th>
              <th>Contact</th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRegistrations.map(
              (registration) => (
                <tr key={registration._id}>
                  <td>{registration.userName}</td>

                  <td>
                    {registration.ticketCount}
                  </td>

                  <td>{registration.contact}</td>

                  <td>
                    {registration.nameOfEvent}
                  </td>

                  <td>
                    {registration.eventDate
                      ? new Date(
                          registration.eventDate
                        ).toLocaleDateString()
                      : ""}
                  </td>

                  <td>
                    {registration.paymentStatus}
                  </td>

                  <td>
                    <Link to={`/edit/${registration._id}`}>
                      <div className="tooltip">
                        <button className="edit-btn">Edit</button>
                        <span className="tooltip-text">
                          Edit this registration
                        </span>
                      </div>
                    </Link>

                    <div className="tooltip">
                      <button
                        className="delete-btn"
                        onClick={() => openDeleteModal(registration._id)}
                      >
                        Delete
                      </button>
                      <span className="tooltip-text">
                        Delete this registration
                      </span>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Delete Registration</h2>

              <p>
                Are you sure you want to delete
                this registration?
              </p>

              <div className="modal-buttons">
                <button
                  className="delete-btn"
                  onClick={handleDelete}
                >
                  Delete
                </button>

                <button
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationList;