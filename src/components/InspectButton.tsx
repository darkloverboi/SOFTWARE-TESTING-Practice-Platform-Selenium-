import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const InspectButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleInspectClick = () => {
    // Try to open DevTools programmatically
    try {
      // This will only work in development or certain contexts
      const chromeDevTools = (window as any).chrome?.devtools;
      if (chromeDevTools) {
        chromeDevTools.inspectedWindow.eval("inspect(document.body)");
        toast.success("DevTools opened!");
      } else {
        // Show fallback dialog
        setShowDialog(true);
      }
    } catch (error) {
      // Show fallback dialog
      setShowDialog(true);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="destructive"
        onClick={handleInspectClick}
        className="bg-destructive hover:bg-destructive-hover"
        id="inspect-button"
      >
        <Eye className="h-4 w-4 mr-1" />
        Inspect
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent id="inspect-dialog">
          <DialogHeader>
            <DialogTitle>Developer Tools Access</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>To inspect elements and view HTML source:</p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold">Option 1:</p>
              <p>Press <kbd className="bg-background px-2 py-1 rounded text-sm">F12</kbd> to open Developer Tools</p>
              
              <p className="font-semibold mt-3">Option 2:</p>
              <p>Right-click on any element → Select "Inspect" or "Inspect Element"</p>
              
              <p className="font-semibold mt-3">Option 3:</p>
              <p>Press <kbd className="bg-background px-2 py-1 rounded text-sm">Ctrl+Shift+I</kbd> (Windows/Linux) or <kbd className="bg-background px-2 py-1 rounded text-sm">Cmd+Option+I</kbd> (Mac)</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Once DevTools is open, you can view all element IDs, classes, and HTML structure for your Selenium testing.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};