import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const AlertsConfirm = () => {
  const [lastChoice, setLastChoice] = useState<string>("");

  const showConfirmDialog = () => {
    const result = confirm("Are you sure you want to continue? This action cannot be undone.");
    setLastChoice(result ? "You clicked OK (Yes)" : "You clicked Cancel (No)");
  };

  const showDeleteConfirm = () => {
    const result = confirm("⚠️ Delete Item: Are you sure you want to delete this item permanently?");
    setLastChoice(result ? "Delete confirmed!" : "Delete cancelled!");
  };

  const showSaveConfirm = () => {
    const result = confirm("💾 Save Changes: Do you want to save your changes before leaving?");
    setLastChoice(result ? "Changes saved!" : "Changes discarded!");
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="alerts-confirm-title">
            ❓ Confirmation Alerts Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling JavaScript confirm() dialogs with OK/Cancel options.
            Test both positive and negative user responses.
          </p>
        </div>

        {/* Confirmation Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              JavaScript Confirm() Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Last Choice Display */}
            {lastChoice && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium" id="last-choice-result">
                  Last Choice: <span className="text-primary">{lastChoice}</span>
                </p>
              </div>
            )}

            {/* Basic Confirm */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="basic-confirm-label">Basic Confirmation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Standard confirm dialog with OK/Cancel buttons.
              </p>
              <Button 
                onClick={showConfirmDialog}
                id="basic-confirm-btn"
                variant="default"
              >
                Show Confirmation
              </Button>
            </div>

            {/* Delete Confirmation */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="delete-confirm-label">Delete Confirmation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Simulates a delete action confirmation with warning message.
              </p>
              <Button 
                onClick={showDeleteConfirm}
                id="delete-confirm-btn"
                variant="destructive"
              >
                Delete Item
              </Button>
            </div>

            {/* Save Confirmation */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="save-confirm-label">Save Confirmation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prompts user to save changes before leaving.
              </p>
              <Button 
                onClick={showSaveConfirm}
                id="save-confirm-btn"
                variant="secondary"
              >
                Save & Exit
              </Button>
            </div>

            {/* Testing Instructions */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Selenium Testing Notes:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use <code>driver.switchTo().alert()</code> to handle confirm dialogs</li>
                <li>• <code>alert.accept()</code> clicks OK (true)</li>
                <li>• <code>alert.dismiss()</code> clicks Cancel (false)</li>
                <li>• <code>alert.getText()</code> reads the confirmation message</li>
                <li>• Test both accept and dismiss scenarios</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlertsConfirm;