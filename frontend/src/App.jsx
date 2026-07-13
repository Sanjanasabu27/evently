import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListRegistrations from "./components/ListRegistrations";
import AddRegistrations from "./components/AddRegistrations";
import EditRegistration from "./components/EditRegistration";

import ListEvent from "./pages/events/ListEvent";
import AddEvent from "./pages/events/AddEvent";
import EditEvent from "./pages/events/EditEvent";

import Home from "./pages/Home";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";
import UpcomingEvents from "./pages/UpcomingEvents";
import Settings from "./pages/Settings";

import AdminProfile from "./pages/AdminProfile";
import AdminSupport from "./pages/AdminSupport";

import Help from "./pages/Help";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
        </Route>

        {/* USER PAGES - NO NAVBAR */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MyEvents"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upcoming"
          element={
            <ProtectedRoute>
              <UpcomingEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/help" element={<Help />} />

        {/* REGISTRATIONS */}
        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <ListRegistrations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddRegistrations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditRegistration />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PANEL */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/events"
            element={<ListEvent />}
          />

          <Route
            path="/admin/events/add"
            element={<AddEvent />}
          />

          <Route
            path="/admin/events/edit/:id"
            element={<EditEvent />}
          />

          <Route
            path="/admin/profile"
            element={<AdminProfile />}
          />
        </Route>
        <Route
  path="/admin/support"
  element={<AdminSupport />}
/>

      </Routes>

      <div className="shape circle1"></div>
      <div className="shape circle2"></div>
      <div className="shape diamond"></div>
      <div className="orbit"></div>

    </BrowserRouter>
  );
}

export default App;