import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

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

// Additional Admin Components
import NewMember from "./pages/admin/NewMember";
import EditMember from "./pages/admin/EditMember";
import NewAttendance from "./pages/admin/NewAttendance";
import EditAttendance from "./pages/admin/EditAttendance";
import NewEvent from "./pages/admin/NewEvent";
import EditEvent from "./pages/admin/EditEvent";

// Create React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 401/403 errors (auth errors)
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    },
    mutations: {
      retry: false // Don't retry mutations by default
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WebSocketProvider>
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
              
              {/* 404 Catch All */}
              <Route path="*" element={
                <Layout>
                  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 text-center">
                      <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                          404 - Page Not Found
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                          The page you're looking for doesn't exist.
                        </p>
                      </div>
                      <div>
                        <a
                          href="/"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Go back home
                        </a>
                      </div>
                    </div>
                  </div>
                </Layout>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WebSocketProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;