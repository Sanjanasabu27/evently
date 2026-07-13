import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import UserSidebar from "../components/UserSidebar";
import "./Help.css";

function Help() {
  return (
    <div className="dashboard">
      <UserSidebar />

      <div className="main-content">
        <div className="help-container">

          <h1>Help & Support</h1>

          <p className="help-text">
            Need help? We're here to assist you.
          </p>

          <div className="help-card">
            <FaPhoneAlt className="help-icon" />
            <h3>Contact Number</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="help-card">
            <FaEnvelope className="help-icon" />
            <h3>Email</h3>
            <p>support@eventhub.com</p>
          </div>

          <div className="help-card">
            <FaQuestionCircle className="help-icon" />
            <h3>Frequently Asked Questions</h3>

            <p><b>How do I register?</b></p>
            <p>Select an event → Choose a date → Click Register.</p>

            <p><b>Room Full?</b></p>
            <p>Choose another available event date.</p>

            <p><b>Need more help?</b></p>
            <p>Email or call our support team.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Help;