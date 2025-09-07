import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActionRecorder } from "@/hooks/useActionRecorder";
import { Download, Copy, Trash2, Play, Square } from "lucide-react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function RecordedActions() {
  const { actions, isRecording, startRecording, stopRecording, clearActions } = useActionRecorder();

  const printActions = () => {
    if (actions.length === 0) {
      toast.error("No actions to print");
      return;
    }

    // Create a new window with the printable content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups for this site.");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Recorded Actions Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            .meta-info { margin-bottom: 20px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .step-no { text-align: center; font-family: monospace; }
            .timestamp { font-family: monospace; font-size: 0.9em; }
            @media print {
              body { margin: 0; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
            }
          </style>
        </head>
        <body>
          <h1>Recorded Actions Report</h1>
          <div class="meta-info">
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Total Actions:</strong> ${actions.length}</p>
            <p><strong>Recording Status:</strong> ${isRecording ? 'Active' : 'Stopped'}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Action</th>
                <th>Target</th>
                <th>Value</th>
                <th>Page</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              ${actions.map(action => `
                <tr>
                  <td class="step-no">${action.stepNo}</td>
                  <td>${action.actionType}</td>
                  <td>${action.targetElement}</td>
                  <td>${action.value || '-'}</td>
                  <td>${action.page}</td>
                  <td class="timestamp">${action.timestamp}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      // Close the window after printing (optional)
      printWindow.onafterprint = () => printWindow.close();
    };
    
    toast.success("Print dialog opened!");
  };

  const exportToDocx = async () => {
    if (actions.length === 0) {
      toast.error("No actions to export");
      return;
    }

    // Create a simple HTML table for DOCX conversion
    let htmlContent = `
      <html>
        <head>
          <title>Recorded Actions Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4287ca; color: white; }
            .header { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Recorded Actions Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Actions: ${actions.length}</p>
            <p>Recording Status: ${isRecording ? 'Active' : 'Stopped'}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Action</th>
                <th>Target</th>
                <th>Value</th>
                <th>Page</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
    `;

    actions.forEach(action => {
      htmlContent += `
        <tr>
          <td>${action.stepNo}</td>
          <td>${action.actionType}</td>
          <td>${action.targetElement}</td>
          <td>${action.value || '-'}</td>
          <td>${action.page}</td>
          <td>${action.timestamp}</td>
        </tr>
      `;
    });

    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-actions.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("HTML file exported successfully! (Open with Word to convert to DOCX)");
  };

  const copyToClipboard = () => {
    if (actions.length === 0) {
      toast.error("No actions to copy");
      return;
    }

    let markdownTable = '# Recorded Actions Report\n\n';
    markdownTable += `**Generated:** ${new Date().toLocaleString()}\n`;
    markdownTable += `**Total Actions:** ${actions.length}\n`;
    markdownTable += `**Recording Status:** ${isRecording ? 'Active' : 'Stopped'}\n\n`;
    markdownTable += '| Step | Action | Target | Value | Page | Time |\n';
    markdownTable += '|------|--------|--------|-------|------|------|\n';
    
    actions.forEach(action => {
      markdownTable += `| ${action.stepNo} | ${action.actionType} | ${action.targetElement} | ${action.value || '-'} | ${action.page} | ${action.timestamp} |\n`;
    });

    navigator.clipboard.writeText(markdownTable).then(() => {
      toast.success("Markdown report copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy to clipboard");
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" id="recorded-actions-title">
            Recorded Actions
          </h1>
          <p className="text-muted-foreground" id="recorded-actions-description">
            View and export all recorded user interactions across the website
          </p>
        </div>

        {/* Recording Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recording Controls
              <Badge variant={isRecording ? "default" : "secondary"}>
                {isRecording ? "Recording" : "Stopped"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Control the global action recording system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 action-recorder-controls">
              {!isRecording ? (
                <Button onClick={startRecording} id="start-recording-btn">
                  <Play className="mr-2 h-4 w-4" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" id="stop-recording-btn">
                  <Square className="mr-2 h-4 w-4" />
                  Stop Recording
                </Button>
              )}
              {actions.length > 0 && (
                <Button onClick={clearActions} variant="outline" id="clear-actions-btn">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Actions
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recorded Actions Display */}
        {actions.length > 0 ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recorded Actions</CardTitle>
                  <CardDescription>
                    {actions.length} action{actions.length !== 1 ? 's' : ''} recorded
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" id="copy-markdown-actions-btn">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Markdown
                  </Button>
                  <Button onClick={exportToDocx} variant="outline" id="export-docx-actions-btn">
                    <Download className="mr-2 h-4 w-4" />
                    Export HTML/DOCX
                  </Button>
                  <Button onClick={printActions} id="print-actions-btn">
                    <Download className="mr-2 h-4 w-4" />
                    Print Actions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" id="recorded-actions-table">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Step</th>
                      <th className="text-left p-3 font-medium">Action</th>
                      <th className="text-left p-3 font-medium">Target</th>
                      <th className="text-left p-3 font-medium">Value</th>
                      <th className="text-left p-3 font-medium">Page</th>
                      <th className="text-left p-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((action, index) => (
                      <tr 
                        key={action.id} 
                        className="border-b hover:bg-muted/50" 
                        id={`action-row-${index}`}
                      >
                        <td className="p-3 font-mono">{action.stepNo}</td>
                        <td className="p-3">
                          <Badge variant="outline">{action.actionType}</Badge>
                        </td>
                        <td className="p-3 font-mono text-sm">{action.targetElement}</td>
                        <td className="p-3 text-sm">{action.value || '-'}</td>
                        <td className="p-3 text-sm">{action.page}</td>
                        <td className="p-3 text-sm font-mono">{action.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="space-y-4">
                <div className="text-muted-foreground text-lg">No actions recorded yet</div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Start recording to capture user interactions across all pages. 
                  Navigate to different pages and interact with elements to see them appear here.
                </p>
                {!isRecording && (
                  <Button onClick={startRecording} id="start-recording-empty-btn">
                    <Play className="mr-2 h-4 w-4" />
                    Start Recording Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recording Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Recording Guide</CardTitle>
            <CardDescription>How the action recorder works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Captured Actions:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Click:</strong> All mouse clicks on elements</li>
                  <li>• <strong>Type:</strong> Text input in form fields</li>
                  <li>• <strong>Select:</strong> Dropdown selections</li>
                  <li>• <strong>Right Click:</strong> Context menu triggers</li>
                  <li>• <strong>Double Click:</strong> Double-click events</li>
                  <li>• <strong>Drag & Drop:</strong> Drag start and drop events</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Export Options:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>PDF:</strong> Professional formatted report</li>
                  <li>• <strong>HTML/DOCX:</strong> Word-compatible format</li>
                  <li>• <strong>Markdown:</strong> Copy to clipboard for docs</li>
                  <li>• <strong>Clear:</strong> Reset all recorded actions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}