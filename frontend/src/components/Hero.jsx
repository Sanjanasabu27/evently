import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  const handleRegister = () => {
    const user = localStorage.getItem("user");

    if (user) {
      document.getElementById("upcoming-events")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Event Registration</h1>

        <p>
          . . . Register for exciting events, workshops and competitions. . .
        </p>

        <button onClick={handleRegister}>
          Register Now
        </button>
      </div>
    </section>
  );
}

export default Hero;