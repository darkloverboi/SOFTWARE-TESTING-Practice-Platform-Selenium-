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
import Advanced from "./pages/Advanced";
import Recorder from "./pages/Recorder";
import RecordedActions from "./pages/RecordedActions";
import Dropdowns from "./pages/Dropdowns";
import Credits from "./pages/Credits";
import NotFound from "./pages/NotFound";
import AlertsSimple from "./pages/AlertsSimple";
import AlertsConfirm from "./pages/AlertsConfirm";
import AlertsPrompt from "./pages/AlertsPrompt";
import ShowHide from "./pages/ShowHide";
import ProgressBar from "./pages/ProgressBar";
import Countdown from "./pages/Countdown";
import ShadowDOM from "./pages/ShadowDOM";
import Iframes from "./pages/Iframes";
import DragDrop from "./pages/DragDrop";
import InfiniteScroll from "./pages/InfiniteScroll";
import AjaxTable from "./pages/AjaxTable";
import IframeBasic from "./pages/IframeBasic";
import IframeNested from "./pages/IframeNested";
import IframeMultiple from "./pages/IframeMultiple";
import IframeScrollable from "./pages/IframeScrollable";
import IframeLinks from "./pages/IframeLinks";
import IframeForm from "./pages/IframeForm";

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
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/recorder" element={<Recorder />} />
          <Route path="/recorded-actions" element={<RecordedActions />} />
          <Route path="/dropdowns" element={<Dropdowns />} />
          <Route path="/alerts-simple" element={<AlertsSimple />} />
          <Route path="/alerts-confirm" element={<AlertsConfirm />} />
          <Route path="/alerts-prompt" element={<AlertsPrompt />} />
          <Route path="/show-hide" element={<ShowHide />} />
          <Route path="/progress-bar" element={<ProgressBar />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/shadow-dom" element={<ShadowDOM />} />
          <Route path="/iframes" element={<Iframes />} />
          <Route path="/drag-drop" element={<DragDrop />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/ajax-table" element={<AjaxTable />} />
          <Route path="/iframe-basic" element={<IframeBasic />} />
          <Route path="/iframe-nested" element={<IframeNested />} />
          <Route path="/iframe-multiple" element={<IframeMultiple />} />
          <Route path="/iframe-scrollable" element={<IframeScrollable />} />
          <Route path="/iframe-links" element={<IframeLinks />} />
          <Route path="/iframe-form" element={<IframeForm />} />
          <Route path="/credits" element={<Credits />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
