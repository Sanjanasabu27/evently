import { useEffect, useState } from "react";

function AdminSupport() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/contact")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);
  const handleResolve = async (id) => {
  await fetch(`http://localhost:3000/contact/resolve/${id}`, {
    method: "PUT",
  });

  setRequests(
    requests.map((item) =>
      item._id === id
        ? { ...item, status: "Resolved" }
        : item
    )
  );
};

  return (
    <div>
      <h2>Support Requests</h2>

      <table>
        <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Subject</th>
    <th>Message</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>
  {requests.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.subject}</td>
      <td>{item.message}</td>
      <td>{item.status}</td>

      <td>
        <button
          onClick={() => handleResolve(item._id)}
        >
          Resolve
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default AdminSupport;