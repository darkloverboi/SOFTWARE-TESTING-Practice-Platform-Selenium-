import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3X3 } from "lucide-react";

const IframeMultiple = () => {
  const createIframeContent = (id: string, bgColor: string, title: string, content: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, ${bgColor}, #ffffff);
          padding: 15px;
          margin: 0;
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .iframe-content {
          background: rgba(255,255,255,0.9);
          padding: 15px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin: 5px;
        }
        button:hover { background: #0056b3; }
        input {
          padding: 6px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin: 5px;
        }
      </style>
    </head>
    <body>
      <div class="iframe-content">
        <h3 id="${id}-title">${title}</h3>
        ${content}
      </div>
    </body>
    </html>
  `;

  const frame1Content = createIframeContent(
    'frame1', 
    '#e3f2fd', 
    'Text Content', 
    '<p id="frame1-text">This is the first iframe with text content.</p><p>Simple text for testing purposes.</p>'
  );

  const frame2Content = createIframeContent(
    'frame2', 
    '#fee2e2', 
    'Button Content', 
    '<button id="frame2-button" onclick="alert(\'Button in frame 2 clicked!\')">Click This Button</button><p>This iframe contains an interactive button.</p>'
  );

  const frame3Content = createIframeContent(
    'frame3', 
    '#ede9fe', 
    'Input Content', 
    '<input type="text" id="frame3-input" placeholder="Type something here..." /><p>This iframe has an input field for testing.</p>'
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="multiple-iframe-title">
            🖼️ Multiple Iframes Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice switching between multiple iframe contexts on the same page.
            Each iframe contains different types of elements for comprehensive testing.
          </p>
        </div>

        {/* Multiple Iframes Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3X3 className="h-5 w-5" />
              Three Side-by-Side Iframes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Frame 1 - Text Content */}
              <div>
                <h4 className="font-semibold mb-2 text-center">Frame 1: Text</h4>
                <iframe
                  id="iframe1"
                  width="100%"
                  height="200"
                  style={{ border: '2px solid #2196f3', borderRadius: '6px' }}
                  srcDoc={frame1Content}
                  title="First iframe with text content"
                />
              </div>

              {/* Frame 2 - Button Content */}
              <div>
                <h4 className="font-semibold mb-2 text-center">Frame 2: Button</h4>
                <iframe
                  id="iframe2"
                  width="100%"
                  height="200"
                  style={{ border: '2px solid #f44336', borderRadius: '6px' }}
                  srcDoc={frame2Content}
                  title="Second iframe with button"
                />
              </div>

              {/* Frame 3 - Input Content */}
              <div>
                <h4 className="font-semibold mb-2 text-center">Frame 3: Input</h4>
                <iframe
                  id="iframe3"
                  width="100%"
                  height="200"
                  style={{ border: '2px solid #9c27b0', borderRadius: '6px' }}
                  srcDoc={frame3Content}
                  title="Third iframe with input field"
                />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Testing Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Iframe Testing Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Frame Switching Examples:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to first iframe<br />
                    driver.switchTo().frame("iframe1");<br />
                    String text = driver.findElement(By.id("frame1-text")).getText();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to second iframe<br />
                    driver.switchTo().defaultContent();<br />
                    driver.switchTo().frame("iframe2");<br />
                    driver.findElement(By.id("frame2-button")).click();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to third iframe<br />
                    driver.switchTo().defaultContent();<br />
                    driver.switchTo().frame("iframe3");<br />
                    driver.findElement(By.id("frame3-input")).sendKeys("test");
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Best Practices:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Reset Context:</strong> Always return to defaultContent() before switching</li>
                  <li>• <strong>Wait Strategy:</strong> Use WebDriverWait for frame availability</li>
                  <li>• <strong>Error Handling:</strong> Handle NoSuchFrameException gracefully</li>
                  <li>• <strong>Verification:</strong> Verify you're in correct frame before acting</li>
                  <li>• <strong>Cleanup:</strong> Return to main content when test completes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeMultiple;