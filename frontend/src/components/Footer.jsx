import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-section">
          <h3>EVENT HUB</h3>
          <p>
            Event Registration System for workshops,
            competitions and campus events.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 eventhub@gmail.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Kerala, India</p>
        </div>

        <div className="footer-section">
          <h3>Project Details</h3>

          <p><strong>Frontend:</strong> React.js, HTML, CSS, JavaScript</p>

          <p><strong>Backend:</strong> Node.js, Express.js</p>

          <p><strong>Database:</strong> MongoDB</p>

          <p><strong>Tools:</strong> VS Code, GitHub, Postman</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Event Hub. All Rights Reserved.</p>

        <p className="developer-text">
          Developed by Sanjana Sabu
        </p>
      </div>

    </footer>
  );
}

export default Footer;