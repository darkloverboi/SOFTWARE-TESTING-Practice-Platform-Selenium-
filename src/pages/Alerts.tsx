import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Alerts = () => {
  const [alertResults, setAlertResults] = useState<string[]>([]);
  const [customAlertOpen, setCustomAlertOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);
  const [promptValue, setPromptValue] = useState("");

  const addResult = (result: string) => {
    setAlertResults(prev => [`${new Date().toLocaleTimeString()}: ${result}`, ...prev.slice(0, 9)]);
  };

  const handleSimpleAlert = () => {
    alert("This is a simple JavaScript alert box!");
    addResult("Simple alert was displayed and closed");
  };

  const handleConfirmAlert = () => {
    const result = confirm("Do you want to proceed with this action?");
    if (result) {
      addResult("Confirm alert: User clicked OK");
    } else {
      addResult("Confirm alert: User clicked Cancel");
    }
  };

  const handlePromptAlert = () => {
    const result = prompt("Please enter your name:");
    if (result !== null) {
      if (result.trim() === "") {
        addResult("Prompt alert: User entered empty string");
      } else {
        addResult(`Prompt alert: User entered "${result}"`);
      }
    } else {
      addResult("Prompt alert: User clicked Cancel");
    }
  };

  const handleCustomConfirm = (confirmed: boolean) => {
    setConfirmDialogOpen(false);
    if (confirmed) {
      addResult("Custom confirm dialog: User accepted");
    } else {
      addResult("Custom confirm dialog: User cancelled");
    }
  };

  const handleCustomPrompt = (submitted: boolean) => {
    setPromptDialogOpen(false);
    if (submitted) {
      if (promptValue.trim() === "") {
        addResult("Custom prompt dialog: User submitted empty value");
      } else {
        addResult(`Custom prompt dialog: User submitted "${promptValue}"`);
      }
    } else {
      addResult("Custom prompt dialog: User cancelled");
    }
    setPromptValue("");
  };

  const clearResults = () => {
    setAlertResults([]);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* JavaScript Alerts */}
        <Card id="js-alerts-card">
          <CardHeader>
            <CardTitle id="js-alerts-title">JavaScript Alert Testing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="space-y-2">
                <h4 className="font-medium">Simple Alert</h4>
                <p className="text-sm text-muted-foreground">Basic alert with OK button only</p>
                <Button 
                  id="simple-alert-button"
                  onClick={handleSimpleAlert}
                  className="w-full"
                >
                  Show Alert
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Confirm Alert</h4>
                <p className="text-sm text-muted-foreground">Alert with OK and Cancel buttons</p>
                <Button 
                  id="confirm-alert-button"
                  onClick={handleConfirmAlert}
                  variant="outline"
                  className="w-full"
                >
                  Show Confirm
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Prompt Alert</h4>
                <p className="text-sm text-muted-foreground">Alert with text input field</p>
                <Button 
                  id="prompt-alert-button"
                  onClick={handlePromptAlert}
                  variant="destructive"
                  className="w-full"
                >
                  Show Prompt
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Custom Alert Dialogs */}
        <Card id="custom-alerts-card">
          <CardHeader>
            <CardTitle id="custom-alerts-title">Custom Alert Dialogs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="space-y-2">
                <h4 className="font-medium">Custom Info Alert</h4>
                <p className="text-sm text-muted-foreground">Styled information dialog</p>
                <AlertDialog open={customAlertOpen} onOpenChange={setCustomAlertOpen}>
                  <AlertDialogTrigger asChild>
                    <Button id="custom-info-button" variant="outline" className="w-full">
                      Show Info Dialog
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent id="custom-info-dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Information</AlertDialogTitle>
                      <AlertDialogDescription>
                        This is a custom information dialog created with React components. 
                        It provides better styling and control compared to native JavaScript alerts.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction 
                        id="custom-info-ok"
                        onClick={() => {
                          setCustomAlertOpen(false);
                          addResult("Custom info dialog: User clicked OK");
                        }}
                      >
                        OK
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Custom Confirm</h4>
                <p className="text-sm text-muted-foreground">Styled confirmation dialog</p>
                <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button id="custom-confirm-button" variant="outline" className="w-full">
                      Show Confirm Dialog
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent id="custom-confirm-dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this item? This action cannot be undone 
                        and will permanently remove the data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel 
                        id="custom-confirm-cancel"
                        onClick={() => handleCustomConfirm(false)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        id="custom-confirm-delete"
                        onClick={() => handleCustomConfirm(true)}
                        className="bg-destructive hover:bg-destructive-hover"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Custom Prompt</h4>
                <p className="text-sm text-muted-foreground">Styled input dialog</p>
                <AlertDialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button id="custom-prompt-button" variant="outline" className="w-full">
                      Show Input Dialog
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent id="custom-prompt-dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Enter Information</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please provide your feedback about this testing website.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                      <input
                        id="custom-prompt-input"
                        type="text"
                        placeholder="Type your feedback here..."
                        value={promptValue}
                        onChange={(e) => setPromptValue(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel 
                        id="custom-prompt-cancel"
                        onClick={() => handleCustomPrompt(false)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        id="custom-prompt-submit"
                        onClick={() => handleCustomPrompt(true)}
                      >
                        Submit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Alert Results Log */}
        <Card id="alert-results-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle id="alert-results-title">Alert Results Log</CardTitle>
            <Button 
              id="clear-results-button"
              onClick={clearResults}
              variant="outline"
              size="sm"
            >
              Clear Log
            </Button>
          </CardHeader>
          <CardContent>
            <div 
              id="alert-log"
              className="bg-muted p-4 rounded-md min-h-[200px] max-h-[300px] overflow-y-auto"
            >
              {alertResults.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No alerts triggered yet. Click any alert button above to see results here.
                </p>
              ) : (
                <div className="space-y-1">
                  {alertResults.map((result, index) => (
                    <div 
                      key={index} 
                      id={`alert-result-${index}`}
                      className="text-sm font-mono bg-background p-2 rounded border"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card id="alert-instructions-card">
          <CardHeader>
            <CardTitle>Alert Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">JavaScript Alerts:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Test alert() - simple notification</li>
                  <li>• Test confirm() - OK/Cancel choices</li>
                  <li>• Test prompt() - text input collection</li>
                  <li>• Verify alert text content</li>
                  <li>• Test alert dismissal methods</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Custom Dialogs:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Test modal dialog visibility</li>
                  <li>• Test dialog button interactions</li>
                  <li>• Test input field in custom dialogs</li>
                  <li>• Verify dialog close behavior</li>
                  <li>• Test overlay/backdrop clicks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default Alerts;