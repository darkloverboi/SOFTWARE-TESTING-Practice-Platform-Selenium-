import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

const IframeNested = () => {
  const innerIframeContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 15px;
          background: linear-gradient(135deg, #d1fae5, #ffffff);
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .inner-content {
          background: rgba(255,255,255,0.9);
          padding: 15px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 250px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="inner-content">
        <h3 id="inner-heading">Innermost Iframe</h3>
        <p>This is the deepest nested level</p>
        <input 
          type="text" 
          id="nested-input" 
          placeholder="Enter text inside nested iframe"
        />
      </div>
    </body>
    </html>
  `;

  const parentIframeContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          margin: 0;
        }
        .parent-content {
          background: rgba(255,255,255,0.9);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="parent-content">
        <h3 id="parent-heading">Parent Iframe Level</h3>
        <p>This iframe contains another iframe below:</p>
      </div>
      
      <iframe 
        id="frame3" 
        width="100%" 
        height="200" 
        style="border: 2px solid #10b981; border-radius: 6px;"
        srcdoc='${innerIframeContent}'
        title="Inner nested iframe"
      ></iframe>
    </body>
    </html>
  `;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="nested-iframe-title">
            🖼️ Nested Iframes Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice navigating through multiple levels of nested iframe contexts.
            Master switching between parent and child frame structures.
          </p>
        </div>

        {/* Nested Iframe Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Nested Iframe Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              id="frame2"
              width="100%"
              height="350"
              style={{ border: '3px solid #fbbf24', borderRadius: '8px' }}
              srcDoc={parentIframeContent}
              title="Parent iframe containing nested child"
            />
          </CardContent>
        </Card>

        {/* Testing Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Nested Iframe Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Sequential Frame Switching:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Step 1: Switch to parent iframe<br />
                    driver.switchTo().frame("frame2");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Step 2: Switch to nested child iframe<br />
                    driver.switchTo().frame("frame3");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Step 3: Interact with nested input<br />
                    driver.findElement(By.id("nested-input")).sendKeys("Test");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Step 4: Go back to main content<br />
                    driver.switchTo().defaultContent();
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Navigation Strategy:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Level 0:</strong> Main page (default content)</li>
                  <li>• <strong>Level 1:</strong> Parent iframe (frame2)</li>
                  <li>• <strong>Level 2:</strong> Child iframe (frame3)</li>
                  <li>• <strong>Tip:</strong> Use parentFrame() to go up one level</li>
                  <li>• <strong>Tip:</strong> Use defaultContent() to return to main page</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeNested;