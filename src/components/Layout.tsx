import { Button } from "@/components/ui/button";
import { InspectButton } from "./InspectButton";
import { MiniFooter } from "./MiniFooter";
import { useActionRecorder } from "@/hooks/useActionRecorder";
import { Play, Square, Menu } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isRecording, startRecording, stopRecording } = useActionRecorder();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-header-bg text-header-fg border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-foreground hover:text-primary transition-colors">
                  <Menu className="h-6 w-6" />
                </SidebarTrigger>
                <div>
                  <h1 className="text-xl font-bold tracking-tight" id="site-title">
                    DLB Software Testing Web
                  </h1>
                  <p className="text-xs text-muted-foreground mt-0.5" id="site-subtitle">
                    Selenium Automation Practice
                  </p>
                </div>
              </div>

              {/* Right Side Buttons */}
              <div className="flex items-center gap-3">
                <InspectButton />
                
                {/* Global Recording Button */}
                <div className="action-recorder-controls">
                  {!isRecording ? (
                    <Button 
                      size="sm" 
                      onClick={startRecording}
                      className="bg-success hover:bg-success/90 text-success-foreground"
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
          </header>

          {/* Main Content */}
          <main className="flex-1 px-6 py-8 overflow-auto">
            {children}
          </main>

          {/* Mini Footer */}
          <MiniFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};