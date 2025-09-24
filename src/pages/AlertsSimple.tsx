import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const AlertsSimple = () => {
  const showSimpleAlert = () => {
    alert("This is a simple alert! Click OK to continue.");
  };

  const showInfoAlert = () => {
    alert("Information: Your test action was successful!");
  };

  const showWarningAlert = () => {
    alert("⚠️ Warning: This is a warning message for testing purposes.");
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="alerts-simple-title">
            ⚠️ Simple Alerts Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling basic JavaScript alert() dialogs with different message types.
            Perfect for testing alert acceptance and text extraction.
          </p>
        </div>

        {/* Simple Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              JavaScript Alert() Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Basic Alert */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="basic-alert-label">Basic Alert</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Triggers a standard alert dialog with OK button only.
              </p>
              <Button 
                onClick={showSimpleAlert}
                id="basic-alert-btn"
                variant="default"
              >
                Show Basic Alert
              </Button>
            </div>

            {/* Info Alert */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="info-alert-label">Information Alert</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Shows an informational message to the user.
              </p>
              <Button 
                onClick={showInfoAlert}
                id="info-alert-btn"
                variant="secondary"
              >
                Show Info Alert
              </Button>
            </div>

            {/* Warning Alert */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="warning-alert-label">Warning Alert</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Displays a warning message with emoji for visual testing.
              </p>
              <Button 
                onClick={showWarningAlert}
                id="warning-alert-btn"
                variant="destructive"
              >
                Show Warning Alert
              </Button>
            </div>

            {/* Testing Instructions */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Selenium Testing Notes:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use <code>driver.switchTo().alert()</code> to handle alerts</li>
                <li>• <code>alert.getText()</code> to read alert message</li>
                <li>• <code>alert.accept()</code> to click OK</li>
                <li>• Test both alert text content and user interaction</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlertsSimple;