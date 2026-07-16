import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://evently-backend-yjtq.onrender.com/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Signup Successful");

    navigate("/login");
  };

  return (
    <div className="signup-page">
    <div className="signup-card">
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          Signup
        </button>
      </form>
        </div>
</div>
  );
}

export default Signup;