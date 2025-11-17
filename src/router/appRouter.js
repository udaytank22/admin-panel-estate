import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "./protectedRouter";
import SidebarLayout from "./sidebar/sidebar";
import Society from "../pages/society/society";
import Announcemnt from "../pages/announcement/announcemnt";
import Complaint from "../pages/complaints/complaints";
import Event from "../pages/events/events";
import MarketPlace from "../pages/marketPlace/marketPlace";
import Notification from "../pages/notification/notification";
import Reports from "../pages/reports/reports";
import Users from "../pages/user/user";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes that use the Sidebar Layout */}
        <Route element={<SidebarLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Society"
            element={
              <ProtectedRoute>
                <Society />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Announcemnt"
            element={
              <ProtectedRoute>
                <Announcemnt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Complaint"
            element={
              <ProtectedRoute>
                <Complaint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Event"
            element={
              <ProtectedRoute>
                <Event />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MarketPlace"
            element={
              <ProtectedRoute>
                <MarketPlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
