# 🎉 Evently – Event Registration Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to browse events, register online, and enables administrators to manage events efficiently.

---

## 🚀 Live Demo

### 🌐 Frontend
Add your frontend URL here:

https://evently-frontend-xpwi.onrender.com

### ⚙️ Backend API
Add your backend URL here:

[https://your-backend-url.onrender.com](https://evently-backend-yjtq.onrender.com)

---

## 📸 Screenshots

<img width="1896" height="872" alt="image" src="https://github.com/user-attachments/assets/8e9b6d8f-2c02-43d9-befb-5c27e209d6da" />


### 🏠 Home Page
![Home](screenshots/home.png)

### 👤 User Dashboard
![User Dashboard](screenshots/user-dashboard.png)

### 🛠️ Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### 📅 Event Registration
![Registration](screenshots/registration.png)

---

# ✨ Features

## 👥 User Features

- User Signup & Login
- Secure Authentication
- Browse Available Events
- Register for Events
- View My Registrations
- Profile Management
- Upcoming Events
- Seat Availability Check

## 🛠️ Admin Features

- Admin Dashboard
- Add Events
- Edit Events
- Delete Events
- Manage Registrations
- Event Capacity Management
- Search Events

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- CSS3
- React Datepicker
- React Icons

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Render (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
Evently
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── routes
│   ├── models
│   ├── database
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Sanjanasabu27/evently.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file in the frontend:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

# 📦 API Endpoints

## Authentication

```
POST /signup
POST /login
```

## Events

```
GET /events
POST /events
PUT /events/:id
DELETE /events/:id
```

## Registrations

```
GET /registrations
POST /registrations
PUT /registrations/:id
DELETE /registrations/:id
```

## Profile

```
GET /profile
PUT /profile
```

---

# 🎯 Future Improvements

- Email Notifications
- QR Code Event Tickets
- Payment Gateway Integration
- Admin Analytics Dashboard
- Event Categories & Filters
- Responsive Mobile UI
- Password Reset
- Dark Mode

---

# 👩‍💻 Author

**Sanjana Sabu**

GitHub:
https://github.com/Sanjanasabu27

---

# ⭐ Support

If you like this project, don't forget to ⭐ the repository.
