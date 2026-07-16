import "./Contact.css";

function Contact() {
    const handleSubmit = async (e) => {
  e.preventDefault();

  await fetch("https://evently-backend-yjtq.onrender.com/contact/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message
    })
  });

  alert("Request Submitted Successfully");
};
  return (
    <div className="contact-page">

      <section className="contact-hero">
        <h1>Help Center & Support</h1>
        <p>
          Need assistance with event registration, login issues, or account
          management? Our support team is here to help.
        </p>
      </section>

      <section className="helpdesk-grid">

        <div className="help-card">
          <h3>🎟 Event Registration</h3>
          <p>
            Problems registering for an event? Get instant assistance.
          </p>
        </div>

        <div className="help-card">
          <h3>🔐 Account Support</h3>
          <p>
            Login, password, and account-related help.
          </p>
        </div>

        <div className="help-card">
          <h3>📅 Event Information</h3>
          <p>
            Need details about upcoming events and schedules?
          </p>
        </div>

        <div className="help-card">
          <h3>⚡ Technical Support</h3>
          <p>
            Report bugs or technical issues quickly.
          </p>
        </div>

      </section>

      <section className="contact-container">

        <div className="contact-form">
          <h2>Send a Message</h2>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Subject" />

          <textarea
            rows="6"
            placeholder="Describe your issue..."
          ></textarea>

          <button>Submit Request</button>
        </div>

        <div className="contact-info">
          <h2>Support Information</h2>

          <div className="info-box">
            <h4>📧 Email Support</h4>
            <p>support@eventhub.com</p>
          </div>

          <div className="info-box">
            <h4>📞 Help Desk</h4>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-box">
            <h4>🕒 Working Hours</h4>
            <p>Monday - Saturday</p>
            <p>9:00 AM - 6:00 PM</p>
          </div>

          <div className="info-box">
            <h4>📍 Office</h4>
            <p>Event Management Center</p>
          </div>
        </div>

      </section>

      <section className="support-banner">
        <h2>⚡ Average Response Time: Under 2 Hours</h2>
        <p>
          Our support team actively monitors requests to ensure quick
          resolutions.
        </p>
      </section>

      <section className="faq-section">

        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>How do I register for an event?</h4>
          <p>
            Log in to your account and select your preferred event.
          </p>
        </div>

        <div className="faq-item">
          <h4>Can I update my registration?</h4>
          <p>
            Yes, visit your dashboard and manage registrations.
          </p>
        </div>

        <div className="faq-item">
          <h4>What if an event is full?</h4>
          <p>
            The system will notify you when slots become available.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Contact;