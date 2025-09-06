import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Download, Copy, Trash2, Plus } from "lucide-react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface TestStep {
  id: string;
  stepNo: number;
  actionType: string;
  targetElement: string;
  value: string;
  expectedResult: string;
}

export default function Recorder() {
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);
  const [currentStep, setCurrentStep] = useState({
    stepNo: 1,
    actionType: '',
    targetElement: '',
    value: '',
    expectedResult: ''
  });

  const actionTypes = [
    'Click',
    'Type',
    'Clear',
    'Select',
    'Hover',
    'Double Click',
    'Right Click',
    'Navigate',
    'Wait',
    'Assert Text',
    'Assert Element',
    'Scroll',
    'Drag and Drop',
    'Upload File',
    'Switch Frame',
    'Switch Window',
    'Take Screenshot'
  ];

  const addTestStep = () => {
    if (!currentStep.actionType || !currentStep.targetElement) {
      toast.error("Please fill in Action Type and Target Element");
      return;
    }

    const newStep: TestStep = {
      id: Date.now().toString(),
      ...currentStep
    };

    setTestSteps(prev => [...prev, newStep]);
    setCurrentStep({
      stepNo: currentStep.stepNo + 1,
      actionType: '',
      targetElement: '',
      value: '',
      expectedResult: ''
    });
    toast.success("Test step added successfully!");
  };

  const removeTestStep = (id: string) => {
    setTestSteps(prev => prev.filter(step => step.id !== id));
    toast.success("Test step removed");
  };

  const clearAllSteps = () => {
    setTestSteps([]);
    setCurrentStep({
      stepNo: 1,
      actionType: '',
      targetElement: '',
      value: '',
      expectedResult: ''
    });
    toast.success("All steps cleared");
  };

  const exportToPDF = () => {
    if (testSteps.length === 0) {
      toast.error("No test steps to export");
      return;
    }

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Test Case Recording', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
    doc.text(`Total Steps: ${testSteps.length}`, 20, 45);

    // Table data
    const tableData = testSteps.map(step => [
      step.stepNo,
      step.actionType,
      step.targetElement,
      step.value || '-',
      step.expectedResult || '-'
    ]);

    // Add table
    (doc as any).autoTable({
      head: [['Step No.', 'Action Type', 'Target Element', 'Value', 'Expected Result']],
      body: tableData,
      startY: 60,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 139, 202] },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 },
        1: { cellWidth: 35 },
        2: { cellWidth: 45 },
        3: { cellWidth: 35 },
        4: { cellWidth: 45 }
      }
    });

    doc.save('test-case-recording.pdf');
    toast.success("PDF exported successfully!");
  };

  const exportToDocx = () => {
    if (testSteps.length === 0) {
      toast.error("No test steps to export");
      return;
    }

    // Create HTML content for DOCX conversion
    let htmlContent = `
      <html>
        <head>
          <title>Test Case Recording</title>
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
            <h1>Test Case Recording</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Steps: ${testSteps.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Step No.</th>
                <th>Action Type</th>
                <th>Target Element</th>
                <th>Value</th>
                <th>Expected Result</th>
              </tr>
            </thead>
            <tbody>
    `;

    testSteps.forEach(step => {
      htmlContent += `
        <tr>
          <td>${step.stepNo}</td>
          <td>${step.actionType}</td>
          <td>${step.targetElement}</td>
          <td>${step.value || '-'}</td>
          <td>${step.expectedResult || '-'}</td>
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
    a.download = 'test-case-recording.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("HTML file exported successfully! (Open with Word to convert to DOCX)");
  };

  const copyToClipboard = () => {
    if (testSteps.length === 0) {
      toast.error("No test steps to copy");
      return;
    }

    let markdownTable = '| Step No. | Action Type | Target Element | Value | Expected Result |\n';
    markdownTable += '|----------|-------------|----------------|-------|----------------|\n';
    
    testSteps.forEach(step => {
      markdownTable += `| ${step.stepNo} | ${step.actionType} | ${step.targetElement} | ${step.value || '-'} | ${step.expectedResult || '-'} |\n`;
    });

    navigator.clipboard.writeText(markdownTable).then(() => {
      toast.success("Markdown table copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy to clipboard");
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" id="recorder-title">Test Recorder</h1>
          <p className="text-muted-foreground" id="recorder-description">
            Record test steps manually and export them as PDF or Markdown
          </p>
        </div>

        {/* Test Step Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Record New Test Step</CardTitle>
            <CardDescription>Fill in the details for each test step</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor="step-number" className="text-sm font-medium mb-2 block">
                  Step No.
                </label>
                <Input
                  id="step-number"
                  type="number"
                  value={currentStep.stepNo}
                  onChange={(e) => setCurrentStep(prev => ({
                    ...prev,
                    stepNo: parseInt(e.target.value) || 1
                  }))}
                  min="1"
                />
              </div>

              <div>
                <label htmlFor="action-type" className="text-sm font-medium mb-2 block">
                  Action Type *
                </label>
                <Select
                  value={currentStep.actionType}
                  onValueChange={(value) => setCurrentStep(prev => ({
                    ...prev,
                    actionType: value
                  }))}
                >
                  <SelectTrigger id="action-type">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map(action => (
                      <SelectItem key={action} value={action} id={`action-${action.toLowerCase().replace(/\s+/g, '-')}`}>
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="target-element" className="text-sm font-medium mb-2 block">
                  Target Element *
                </label>
                <Input
                  id="target-element"
                  placeholder="ID, Name, XPath, CSS"
                  value={currentStep.targetElement}
                  onChange={(e) => setCurrentStep(prev => ({
                    ...prev,
                    targetElement: e.target.value
                  }))}
                />
              </div>

              <div>
                <label htmlFor="step-value" className="text-sm font-medium mb-2 block">
                  Value
                </label>
                <Input
                  id="step-value"
                  placeholder="Optional value"
                  value={currentStep.value}
                  onChange={(e) => setCurrentStep(prev => ({
                    ...prev,
                    value: e.target.value
                  }))}
                />
              </div>

              <div>
                <label htmlFor="expected-result" className="text-sm font-medium mb-2 block">
                  Expected Result
                </label>
                <Input
                  id="expected-result"
                  placeholder="Expected outcome"
                  value={currentStep.expectedResult}
                  onChange={(e) => setCurrentStep(prev => ({
                    ...prev,
                    expectedResult: e.target.value
                  }))}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={addTestStep} id="add-step-btn">
                <Plus className="mr-2 h-4 w-4" />
                Add Step
              </Button>
              {testSteps.length > 0 && (
                <Button onClick={clearAllSteps} variant="destructive" id="clear-steps-btn">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recorded Steps Display */}
        {testSteps.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recorded Test Steps</CardTitle>
                  <CardDescription>
                    {testSteps.length} step{testSteps.length !== 1 ? 's' : ''} recorded
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" id="copy-markdown-btn">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Markdown
                  </Button>
                  <Button onClick={exportToDocx} variant="outline" id="export-docx-btn">
                    <Download className="mr-2 h-4 w-4" />
                    Export HTML/DOCX
                  </Button>
                  <Button onClick={exportToPDF} id="export-pdf-btn">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" id="recorded-steps-table">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Step No.</th>
                      <th className="text-left p-3 font-medium">Action Type</th>
                      <th className="text-left p-3 font-medium">Target Element</th>
                      <th className="text-left p-3 font-medium">Value</th>
                      <th className="text-left p-3 font-medium">Expected Result</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testSteps.map((step, index) => (
                      <tr key={step.id} className="border-b hover:bg-muted/50" id={`step-row-${index}`}>
                        <td className="p-3 font-mono">{step.stepNo}</td>
                        <td className="p-3">
                          <Badge variant="outline">{step.actionType}</Badge>
                        </td>
                        <td className="p-3 font-mono text-sm">{step.targetElement}</td>
                        <td className="p-3 text-sm">{step.value || '-'}</td>
                        <td className="p-3 text-sm">{step.expectedResult || '-'}</td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeTestStep(step.id)}
                            id={`remove-step-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Start Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Action Types Guide:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li><strong>Click:</strong> Click on buttons, links, etc.</li>
                  <li><strong>Type:</strong> Enter text in input fields</li>
                  <li><strong>Select:</strong> Choose from dropdown options</li>
                  <li><strong>Assert Text:</strong> Verify displayed text</li>
                  <li><strong>Wait:</strong> Explicit wait for elements</li>
                  <li><strong>Navigate:</strong> Go to specific URL</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Target Element Examples:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li><strong>ID:</strong> #login-button</li>
                  <li><strong>Name:</strong> name="username"</li>
                  <li><strong>Class:</strong> .btn-primary</li>
                  <li><strong>XPath:</strong> //input[@type='password']</li>
                  <li><strong>CSS:</strong> input[name='email']</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Test Case */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Test Case</CardTitle>
            <CardDescription>Example of a login test scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-2">Step</th>
                    <th className="text-left p-2">Action</th>
                    <th className="text-left p-2">Target</th>
                    <th className="text-left p-2">Value</th>
                    <th className="text-left p-2">Expected Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">1</td>
                    <td className="p-2">Navigate</td>
                    <td className="p-2">URL</td>
                    <td className="p-2">https://example.com/login</td>
                    <td className="p-2">Login page loads</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">2</td>
                    <td className="p-2">Type</td>
                    <td className="p-2">#username</td>
                    <td className="p-2">testuser@email.com</td>
                    <td className="p-2">Username entered</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">3</td>
                    <td className="p-2">Type</td>
                    <td className="p-2">#password</td>
                    <td className="p-2">password123</td>
                    <td className="p-2">Password entered</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">4</td>
                    <td className="p-2">Click</td>
                    <td className="p-2">#login-btn</td>
                    <td className="p-2">-</td>
                    <td className="p-2">User logged in successfully</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}