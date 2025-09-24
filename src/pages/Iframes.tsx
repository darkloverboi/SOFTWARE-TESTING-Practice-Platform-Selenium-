import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Square, Layers, ExternalLink } from "lucide-react";
import { useState } from "react";

const Iframes = () => {
  const [iframeMessage, setIframeMessage] = useState("");

  const createIframeContent = (id: string, bgColor: string, title: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, ${bgColor}, #ffffff);
          padding: 20px;
          margin: 0;
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .iframe-content {
          background: rgba(255,255,255,0.9);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        input, button {
          padding: 8px 12px;
          margin: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="iframe-content">
        <h2 id="${id}-title">${title}</h2>
        <p>This content is inside an iframe!</p>
        <input type="text" id="${id}-input" placeholder="Type something...">
        <br>
        <button id="${id}-button" onclick="updateText()">Click Me!</button>
        <p id="${id}-output">Iframe text will appear here...</p>
        
        <script>
          function updateText() {
            const input = document.getElementById('${id}-input');
            const output = document.getElementById('${id}-output');
            output.textContent = 'You typed: ' + (input.value || 'Nothing');
            
            // Send message to parent window
            if (window.parent) {
              window.parent.postMessage({
                source: '${id}',
                message: input.value || 'Empty input'
              }, '*');
            }
          }
        </script>
      </div>
    </body>
    </html>
  `;

  // Listen for iframe messages
  useState(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source) {
        setIframeMessage(`Message from ${event.data.source}: "${event.data.message}"`);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="iframes-title">
            🖼️ Nested Iframes Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice switching between iframe contexts and handling nested frame structures.
            Essential for testing embedded content and complex web applications.
          </p>
        </div>

        {/* Iframe Message Display */}
        {iframeMessage && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium" id="iframe-message">
                📨 {iframeMessage}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Single Iframe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Square className="h-5 w-5" />
              Simple Iframe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              id="simple-iframe"
              width="100%"
              height="250"
              style={{ border: '2px solid #e2e8f0', borderRadius: '8px' }}
              srcDoc={createIframeContent('simple', '#e3f2fd', 'Simple Iframe Content')}
              title="Simple iframe for testing"
            />
          </CardContent>
        </Card>

        {/* Nested Iframes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Nested Iframes Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Parent Iframe containing child iframe */}
            <div>
              <h3 className="font-semibold mb-2">Parent Iframe (Level 1)</h3>
              <iframe
                id="parent-iframe"
                width="100%"
                height="300"
                style={{ border: '3px solid #fbbf24', borderRadius: '8px' }}
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <style>
                      body { 
                        font-family: Arial, sans-serif; 
                        padding: 15px; 
                        background: linear-gradient(135deg, #fbbf24, #f59e0b);
                        margin: 0;
                      }
                      .parent-content {
                        background: rgba(255,255,255,0.9);
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 10px;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="parent-content">
                      <h3 id="parent-title">Parent Iframe Level</h3>
                      <input type="text" id="parent-input" placeholder="Parent iframe input">
                      <button id="parent-button" onclick="updateParent()">Parent Button</button>
                      <p id="parent-output">Parent output area</p>
                    </div>
                    
                    <h4>Child Iframe (Level 2):</h4>
                    <iframe 
                      id="child-iframe" 
                      width="100%" 
                      height="150" 
                      style="border: 2px solid #10b981; border-radius: 4px;"
                      srcdoc='${createIframeContent('child', '#d1fae5', 'Child Iframe (Nested)')}'
                    ></iframe>
                    
                    <script>
                      function updateParent() {
                        const input = document.getElementById("parent-input");
                        const output = document.getElementById("parent-output");
                        output.textContent = "Parent: " + (input.value || "No input");
                      }
                    </script>
                  </body>
                  </html>
                `}
                title="Parent iframe containing nested child"
              />
            </div>

          </CardContent>
        </Card>

        {/* Multiple Side-by-Side Iframes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Multiple Iframes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <h4 className="font-semibold mb-2">Iframe A</h4>
                <iframe
                  id="iframe-a"
                  width="100%"
                  height="200"
                  style={{ border: '2px solid #ef4444', borderRadius: '8px' }}
                  srcDoc={createIframeContent('frameA', '#fee2e2', 'Frame A Content')}
                  title="Iframe A"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Iframe B</h4>
                <iframe
                  id="iframe-b"
                  width="100%"
                  height="200"
                  style={{ border: '2px solid #8b5cf6', borderRadius: '8px' }}
                  srcDoc={createIframeContent('frameB', '#ede9fe', 'Frame B Content')}
                  title="Iframe B"
                />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Iframe Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Frame Switching:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to iframe by ID<br />
                    driver.switchTo().frame("simple-iframe");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to iframe by index<br />
                    driver.switchTo().frame(0);
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch back to main content<br />
                    driver.switchTo().defaultContent();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to parent frame<br />
                    driver.switchTo().parentFrame();
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nested Frame Navigation:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Step 1:</strong> Switch to parent iframe first</li>
                  <li>• <strong>Step 2:</strong> Then switch to child iframe</li>
                  <li>• <strong>Step 3:</strong> Interact with nested elements</li>
                  <li>• <strong>Step 4:</strong> Use parentFrame() to go back one level</li>
                  <li>• <strong>Step 5:</strong> Use defaultContent() to return to main page</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Always switch back to default content when done</li>
                <li>• Use WebDriverWait for iframe availability</li>
                <li>• Test frame switching in the correct sequence</li>
                <li>• Handle frame not found exceptions gracefully</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Iframes;