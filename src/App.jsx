import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
// import Ministry from "./pages/Ministry";
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
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/ministry" element={<Ministry />} /> */}
          <Route path="/give" element={<Give />} />
          <Route path="/celebration-form" element={<CelebrationForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/celebrate" element={<Celebrate />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
