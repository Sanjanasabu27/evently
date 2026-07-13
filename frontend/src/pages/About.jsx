import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Banner */}
      <section className="about-banner">
        <h1>About EventHub</h1>
        <p>
          Connecting participants with opportunities through a seamless
          event registration experience.
        </p>
      </section>

      {/* Journey */}
      <section className="journey-section">
        <div className="journey-text">
          <h2>Our Journey</h2>
          <p>
            EventHub was created to simplify event registrations and make
            participation easier than ever. From workshops and seminars to
            competitions and cultural events, our platform helps users
            discover, register, and manage events in one place.
          </p>
        </div>

        <div className="journey-image">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865"
            alt="Event"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="timeline-section">
        <h2>How It Works</h2>

        <div className="timeline">
          <div className="step">
            <span>1</span>
            <h3>Discover</h3>
            <p>Explore upcoming events.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Create Account</h3>
            <p>Sign up and manage your profile.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Register</h3>
            <p>Register for events instantly.</p>
          </div>

          <div className="step">
            <span>4</span>
            <h3>Participate</h3>
            <p>Attend and enjoy the experience.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <h2>50+</h2>
          <p>Events Hosted</p>
        </div>

        <div className="stat-card">
          <h2>1000+</h2>
          <p>Registrations</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>Success Rate</p>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Platform Highlights</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>⚡ Fast Registration</h3>
            <p>Register for events in seconds.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Access</h3>
            <p>Protected accounts and user data.</p>
          </div>

          <div className="feature-card">
            <h3>📱 Mobile Friendly</h3>
            <p>Works perfectly on all devices.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Real-Time Tracking</h3>
            <p>Monitor registrations instantly.</p>
          </div>

          <div className="feature-card">
            <h3>🎯 Personalized Dashboard</h3>
            <p>Manage all your registrations easily.</p>
          </div>

          <div className="feature-card">
            <h3>🔔 Event Updates</h3>
            <p>Stay informed about upcoming events.</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="vision-section">
        <h2>Our Vision</h2>

        <p>
          We aim to build a modern digital ecosystem that connects organizers
          and participants through innovative event management solutions.
          Our goal is to make discovering and attending events simple,
          engaging, and accessible to everyone.
        </p>
      </section>

    </div>
  );
}

export default About;