import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InspectButton } from "./InspectButton";
import { MiniFooter } from "./MiniFooter";
import { useActionRecorder } from "@/hooks/useActionRecorder";
import { Play, Square } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isRecording, startRecording, stopRecording } = useActionRecorder();
  
  const navItems = [
    { path: "/", label: "Home", id: "nav-home" },
    { path: "/login", label: "Login", id: "nav-login" },
    { path: "/forms", label: "Forms", id: "nav-forms" },
    { path: "/links", label: "Links", id: "nav-links" },
    { path: "/tables", label: "Tables", id: "nav-tables" },
    { path: "/upload-download", label: "Upload/Download", id: "nav-upload" },
    { path: "/alerts", label: "Alerts", id: "nav-alerts" },
    { path: "/dynamic", label: "Dynamic Content", id: "nav-dynamic" },
    { path: "/advanced", label: "Advanced Testing", id: "nav-advanced" },
    { path: "/recorder", label: "Test Recorder", id: "nav-recorder" },
    { path: "/recorded-actions", label: "Recorded Actions", id: "nav-recorded-actions" },
    { path: "/dropdowns", label: "Dropdowns", id: "nav-dropdowns" },
    { path: "/credits", label: "Credits", id: "nav-credits" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <InspectButton />
      {/* Header */}
      <header className="bg-header-bg text-header-fg shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold" id="site-title">
            DLB Software Testing Web
          </h1>
          <p className="text-sm opacity-90 mt-1" id="site-subtitle">
            Selenium Automation Practice Website
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-nav-bg border-b border-nav-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  id={item.id}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Global Recording Button */}
            <div className="action-recorder-controls">
              {!isRecording ? (
                <Button 
                  size="sm" 
                  onClick={startRecording}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  id="global-start-recording"
                >
                  <Play className="mr-1 h-3 w-3" />
                  Start Recording
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  onClick={stopRecording}
                  variant="destructive"
                  className="animate-pulse"
                  id="global-stop-recording"
                >
                  <Square className="mr-1 h-3 w-3" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mini Footer */}
      <MiniFooter />
    </div>
  );
};