import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
// import Ministries from "./pages/Ministries";
import Give from "./pages/Give";
// import Contact from "./pages/Contact";
// import Celebrate from "./pages/Celebrate";
// import NotFound from "./pages/NotFound";

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
          {/* <Route path="/ministries" element={<Ministries />} /> */}
          <Route path="/give" element={<Give />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/celebrate" element={<Celebrate />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
