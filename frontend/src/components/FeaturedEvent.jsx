import "./FeaturedEvent.css";

function FeaturedEvent() {
  return (
    <div className="featured-event">

      <div className="featured-content">

        <span className="tag">
          Featured Event
        </span>

        <h1>HACKATHON 2026</h1>

        <p>
          Join the biggest coding event of
          the year.
        </p>

        <button>
          Explore Events
        </button>

      </div>

      <div className="featured-image">

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt=""
        />

      </div>

    </div>
  );
}

export default FeaturedEvent;