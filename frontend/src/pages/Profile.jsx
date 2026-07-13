import { useState, useRef, useEffect } from "react";import "./Profile.css";

function Profile() {
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="%238b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

  const [profile, setProfile] = useState({
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  contactNumber: "",
  city: "",
  state: "",
  bio: "",
  image: defaultAvatar
});
  useEffect(() => {
  fetch("http://localhost:3000/profile")
    .then(res => res.json())
    .then(data => {
      console.log("GET PROFILE:", data);
      setProfile(data);
      setOriginalProfile(data);
    })
    .catch(err => console.log(err));
}, []);

  // Triggers the hidden system file input window
  const handleImageClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reads the selected file from your file explorer and updates the view
  // Reads the selected file directly from your computer file explorer
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size limit for standard MongoDB document limitations (Keep under ~2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size is too large. Please select a photo under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // This converts the image binary data into a standard clean Base64 data-URL string
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async (e) => {
  e.preventDefault();

  if (
    JSON.stringify(profile) === JSON.stringify(originalProfile)
  ) {
    alert("No changes made");
    return;
  }

  console.log("PROFILE:", profile);

  try {
    const res = await fetch("http://localhost:3000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    });

    console.log("STATUS:", res.status);

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    const data = await res.json();

    setProfile(data);
    setOriginalProfile(data); // important
    setEditing(false);

    alert("Profile saved successfully");
  } catch (err) {
    console.log(err);
    alert("Error saving profile");
  }
};
const handleChange = (e) => {
  setProfile({
    ...profile,
    [e.target.name]: e.target.value
  });
};
  return (
    <div className="profile-page">
      <div className="profile-card-container">
        <div className="profile-photo-section">
  <div
    className={`avatar-container ${editing ? "editable-avatar" : ""}`}
    onClick={handleImageClick}
  >
   <img
  src={profile.image || defaultAvatar}
  alt="Profile"
  className="profile-avatar-img"
/>

    {editing && (
      <div className="camera-icon">
        📷
      </div>
    )}
  </div>

  <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    accept="image/*"
    style={{ display: "none" }}
  />

  <h2 className="display-fullname">
    {`${profile.firstName} ${profile.lastName}`}
  </h2>

  <p className="display-bio-text">
    "{profile.bio}"
  </p>
</div>

        {/* Right Aspect: Interactive Information Grid Panel */}
        <div className="profile-data-section">
          <h3 className="pane-header-title">Account Settings</h3>
          
          <form onSubmit={handleSave}>
            <div className="form-input-grid">
              
              <div className="input-field-block">
                <label>First Name</label>
                <input
  type="text"
  name="firstName"
  value={profile.firstName}
  onChange={handleChange}
  disabled={!editing}
  placeholder="Enter First Name"
/>
              </div>

              <div className="input-field-block">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={profile.lastName} 
                  onChange={handleChange} 
                  disabled={!editing} 
                />
              </div>

              <div className="input-field-block full-width-row">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleChange} 
                  disabled={!editing} 
                />
              </div>

              <div className="input-field-block full-width-row">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={profile.address} 
                  onChange={handleChange} 
                  disabled={!editing} 
                />
              </div>

              <div className="input-field-block full-width-row">
                <label>Contact Number</label>
                <input 
                  type="text" 
                  name="contactNumber" 
                  value={profile.contactNumber} 
                  onChange={handleChange} 
                  disabled={!editing} 
                />
              </div>

              <div className="input-field-block">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={profile.city} 
                  onChange={handleChange} 
                  disabled={!editing} 
                />
              </div>

              <div className="input-field-block">
                <label>State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={profile.state} 
                  onChange={handleChange} 
                  disabled={!editing} 
                />
              </div>

              {editing && (
                <div className="input-field-block full-width-row">
                  <label>Update Status Bio</label>
                  <textarea 
                    name="bio" 
                    value={profile.bio} 
                    onChange={handleChange} 
                    rows="2" 
                  />
                </div>
              )}

            </div>

            {/* Action Bar */}
            <div className="profile-action-footer">
              {editing ? (
                <>
                  <button type="submit" className="action-btn-save">Save Settings</button>
                  <button type="button" className="action-btn-cancel" onClick={() => {
  setProfile(originalProfile);
  setEditing(false);
}}>Cancel</button>
                </>
              ) : (
                <button type="button" className="action-btn-edit" onClick={() => setEditing(true)}>Edit Profile</button>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Profile;