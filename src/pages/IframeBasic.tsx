import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Square } from "lucide-react";

const IframeBasic = () => {
  const iframeContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: linear-gradient(135deg, #e3f2fd, #ffffff);
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .content {
          background: rgba(255,255,255,0.9);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        button:hover {
          background: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="content">
        <h2 id="iframe-heading">This is inside an iframe</h2>
        <p>This content is loaded within an iframe element.</p>
        <button id="iframe-button" onclick="alert('Button clicked inside iframe!')">Click Me!</button>
      </div>
    </body>
    </html>
  `;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="basic-iframe-title">
            🖼️ Basic Iframe Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice switching into a simple iframe context and interacting with elements inside it.
            Perfect for learning basic iframe automation fundamentals.
          </p>
        </div>

        {/* Basic Iframe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Square className="h-5 w-5" />
              Basic Iframe Element
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              id="frame1"
              width="100%"
              height="300"
              style={{ border: '2px solid #e2e8f0', borderRadius: '8px' }}
              srcDoc={iframeContent}
              title="Basic iframe for testing"
            />
          </CardContent>
        </Card>

        {/* Testing Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Basic Iframe Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Frame Switching Code:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to iframe by ID<br />
                    driver.switchTo().frame("frame1");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Find and click button inside iframe<br />
                    driver.findElement(By.id("iframe-button")).click();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch back to main content<br />
                    driver.switchTo().defaultContent();
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Testing Steps:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Step 1:</strong> Identify iframe element by ID "frame1"</li>
                  <li>• <strong>Step 2:</strong> Switch driver context to iframe</li>
                  <li>• <strong>Step 3:</strong> Locate elements inside iframe (heading, button)</li>
                  <li>• <strong>Step 4:</strong> Interact with iframe elements</li>
                  <li>• <strong>Step 5:</strong> Switch back to main page context</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeBasic;