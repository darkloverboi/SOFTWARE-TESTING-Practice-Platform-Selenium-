import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Forms from "./pages/Forms";
import Links from "./pages/Links";
import Tables from "./pages/Tables";
import UploadDownload from "./pages/UploadDownload";
import Alerts from "./pages/Alerts";
import Dynamic from "./pages/Dynamic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/links" element={<Links />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/upload-download" element={<UploadDownload />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/dynamic" element={<Dynamic />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
