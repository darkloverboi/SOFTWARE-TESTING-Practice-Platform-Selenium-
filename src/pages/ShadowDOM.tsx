import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Code, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ShadowDOM = () => {
  const [shadowText, setShadowText] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const shadowHostRef = useRef<HTMLDivElement>(null);

  const createShadowDOM = () => {
    if (shadowHostRef.current && !isCreated) {
      // Create shadow root
      const shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' });
      
      // Create shadow content
      const shadowHTML = `
        <style>
          .shadow-container {
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            color: white;
            text-align: center;
            margin: 10px 0;
          }
          .shadow-input {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            margin: 10px;
            width: 200px;
          }
          .shadow-button {
            padding: 8px 16px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 10px;
          }
          .shadow-button:hover {
            background: #45a049;
          }
          .shadow-text {
            margin-top: 10px;
            font-weight: bold;
          }
        </style>
        <div class="shadow-container">
          <h3>🌟 Shadow DOM Content</h3>
          <p>This content exists in Shadow DOM!</p>
          <input class="shadow-input" id="shadow-input" placeholder="Type in Shadow DOM..." />
          <br>
          <button class="shadow-button" id="shadow-button">Shadow Button</button>
          <div class="shadow-text" id="shadow-output">Shadow text will appear here...</div>
        </div>
      `;
      
      shadowRoot.innerHTML = shadowHTML;
      
      // Add event listeners to shadow elements
      const shadowInput = shadowRoot.getElementById('shadow-input') as HTMLInputElement;
      const shadowButton = shadowRoot.getElementById('shadow-button') as HTMLButtonElement;
      const shadowOutput = shadowRoot.getElementById('shadow-output') as HTMLDivElement;
      
      if (shadowInput && shadowButton && shadowOutput) {
        shadowButton.addEventListener('click', () => {
          const inputValue = shadowInput.value || 'No text entered';
          shadowOutput.textContent = `You entered: ${inputValue}`;
          setShadowText(inputValue);
        });
      }
      
      setIsCreated(true);
    }
  };

  useEffect(() => {
    // Auto-create shadow DOM on component mount
    const timer = setTimeout(() => {
      createShadowDOM();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const recreateShadowDOM = () => {
    if (shadowHostRef.current) {
      // Clear existing shadow root
      shadowHostRef.current.innerHTML = '';
      setIsCreated(false);
      setShadowText("");
      
      // Recreate after a short delay
      setTimeout(() => {
        createShadowDOM();
      }, 500);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="shadow-dom-title">
            🌓 Shadow DOM Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice interacting with Shadow DOM elements - a crucial skill for modern web automation.
            Shadow DOM isolates component styles and scripts from the main document.
          </p>
        </div>

        {/* Shadow DOM Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Shadow DOM Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Shadow Host */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Shadow Host Element
              </h3>
              <div 
                ref={shadowHostRef}
                id="shadow-host"
                className="border-2 border-dashed border-primary/30 rounded-lg p-4 min-h-[200px]"
              >
                {!isCreated && (
                  <div className="text-center text-muted-foreground">
                    Shadow DOM will be created here...
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button 
                onClick={createShadowDOM}
                disabled={isCreated}
                id="create-shadow-btn"
              >
                Create Shadow DOM
              </Button>
              <Button 
                onClick={recreateShadowDOM}
                disabled={!isCreated}
                id="recreate-shadow-btn"
                variant="secondary"
              >
                Recreate Shadow DOM
              </Button>
            </div>

            {/* Shadow Content Status */}
            {shadowText && (
              <div 
                id="shadow-status"
                className="p-4 bg-muted rounded-lg"
              >
                <p className="text-sm">
                  <strong>Last Shadow Input:</strong> {shadowText}
                </p>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Selenium Shadow DOM Testing Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Accessing Shadow Elements:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Find shadow host<br />
                    WebElement shadowHost = driver.findElement(By.id("shadow-host"));
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Get shadow root<br />
                    SearchContext shadowRoot = shadowHost.getShadowRoot();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Find elements in shadow<br />
                    WebElement shadowInput = shadowRoot.findElement(By.id("shadow-input"));
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Common Issues:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Regular findElement() won't work on shadow elements</li>
                  <li>• Must use getShadowRoot() method first</li>
                  <li>• CSS selectors work differently in shadow DOM</li>
                  <li>• Each shadow root is isolated scope</li>
                  <li>• Not all browsers support shadow DOM automation</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Shadow DOM support requires Selenium 4+ and ChromeDriver 96+</li>
                <li>• Test in different browsers for compatibility</li>
                <li>• Some shadow DOM implementations use closed mode (harder to access)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShadowDOM;