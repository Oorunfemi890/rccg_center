import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public Components
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Give from "./pages/Give";
import Contact from "./pages/Contact";
import Celebrate from "./pages/Celebrate";
import CelebrationForm from "./pages/CelebrationForm";

// Auth Components
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Components
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MembersManagement from "./pages/admin/MembersManagement";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import CelebrationsManagement from "./pages/admin/CelebrationsManagement";
import AdminProfile from "./pages/admin/AdminProfile";

// Additional Admin Components (you'll need to create these)
import NewMember from "./pages/admin/NewMember";
import EditMember from "./pages/admin/EditMember";
import NewAttendance from "./pages/admin/NewAttendance";
import EditAttendance from "./pages/admin/EditAttendance";
import NewEvent from "./pages/admin/NewEvent";
import EditEvent from "./pages/admin/EditEvent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/give" element={<Layout><Give /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/celebrate" element={<Layout><Celebrate /></Layout>} />
            <Route path="/celebration-form" element={<Layout><CelebrationForm /></Layout>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              {/* Dashboard */}
              <Route path="dashboard" element={<AdminDashboard />} />
              
              {/* Members Management */}
              <Route path="members" element={
                <ProtectedRoute requiredPermission="members">
                  <MembersManagement />
                </ProtectedRoute>
              } />
              <Route path="members/new" element={
                <ProtectedRoute requiredPermission="members">
                  <NewMember />
                </ProtectedRoute>
              } />
              <Route path="members/:id/edit" element={
                <ProtectedRoute requiredPermission="members">
                  <EditMember />
                </ProtectedRoute>
              } />
              
              {/* Attendance Management */}
              <Route path="attendance" element={
                <ProtectedRoute requiredPermission="attendance">
                  <AttendanceManagement />
                </ProtectedRoute>
              } />
              <Route path="attendance/new" element={
                <ProtectedRoute requiredPermission="attendance">
                  <NewAttendance />
                </ProtectedRoute>
              } />
              <Route path="attendance/:id/edit" element={
                <ProtectedRoute requiredPermission="attendance">
                  <EditAttendance />
                </ProtectedRoute>
              } />
              
              {/* Events Management */}
              <Route path="events" element={
                <ProtectedRoute requiredPermission="events">
                  <EventsManagement />
                </ProtectedRoute>
              } />
              <Route path="events/new" element={
                <ProtectedRoute requiredPermission="events">
                  <NewEvent />
                </ProtectedRoute>
              } />
              <Route path="events/:id/edit" element={
                <ProtectedRoute requiredPermission="events">
                  <EditEvent />
                </ProtectedRoute>
              } />
              
              {/* Celebrations Management */}
              <Route path="celebrations" element={
                <ProtectedRoute requiredPermission="celebrations">
                  <CelebrationsManagement />
                </ProtectedRoute>
              } />
              
              {/* Profile */}
              <Route path="profile" element={<AdminProfile />} />
              
              {/* Default redirect */}
              <Route index element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;