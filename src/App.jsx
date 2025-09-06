import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Give from "./pages/Give";
import Contact from "./pages/Contact";
import Celebrate from "./pages/Celebrate";
import CelebrationForm from "./pages/CelebrationForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/give" element={<Layout><Give /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/celebrate" element={<Layout><Celebrate /></Layout>} />
          <Route path="/celebration-form" element={<Layout><CelebrationForm /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;