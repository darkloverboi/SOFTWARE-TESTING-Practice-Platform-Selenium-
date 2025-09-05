import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dynamic = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [dynamicList, setDynamicList] = useState<string[]>([]);
  const [ajaxContent, setAjaxContent] = useState("");
  const [isAjaxLoading, setIsAjaxLoading] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdown]);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const startLoading = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const startCountdown = () => {
    setCountdown(10);
    setIsCountdownActive(true);
  };

  const addListItem = () => {
    const newItem = `Dynamic Item ${dynamicList.length + 1} - Added at ${new Date().toLocaleTimeString()}`;
    setDynamicList(prev => [...prev, newItem]);
  };

  const removeListItem = (index: number) => {
    setDynamicList(prev => prev.filter((_, i) => i !== index));
  };

  const clearList = () => {
    setDynamicList([]);
  };

  const loadAjaxContent = () => {
    setIsAjaxLoading(true);
    setAjaxContent("");

    // Simulate AJAX call
    setTimeout(() => {
      const content = `
        <div class="ajax-loaded-content">
          <h3>AJAX Content Loaded Successfully!</h3>
          <p>This content was loaded dynamically at ${new Date().toLocaleString()}</p>
          <p>Request ID: ${Math.random().toString(36).substr(2, 9)}</p>
          <ul>
            <li>Response Time: ${Math.floor(Math.random() * 500 + 100)}ms</li>
            <li>Status: 200 OK</li>
            <li>Content-Type: text/html</li>
          </ul>
        </div>
      `;
      setAjaxContent(content);
      setIsAjaxLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Show/Hide Content */}
        <Card id="visibility-card">
          <CardHeader>
            <CardTitle id="visibility-title">Show/Hide Dynamic Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              id="toggle-text-button"
              onClick={toggleTextVisibility}
            >
              {isTextVisible ? "Hide Text" : "Show Text"}
            </Button>

            <div 
              id="hidden-text-container"
              className={`transition-all duration-300 ${
                isTextVisible 
                  ? "opacity-100 max-h-40 overflow-visible" 
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              {isTextVisible && (
                <div 
                  id="dynamic-text"
                  className="p-4 bg-testing-element border border-testing-border rounded-md"
                >
                  <h4 className="font-medium mb-2">This text was shown dynamically!</h4>
                  <p className="text-sm text-muted-foreground">
                    This content appears and disappears based on user interaction. 
                    It's useful for testing element visibility, waiting for elements to appear, 
                    and handling dynamic content changes in automation scripts.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Shown at: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading Progress Bar */}
        <Card id="loading-card">
          <CardHeader>
            <CardTitle id="loading-title">Loading Progress Simulation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              id="start-loading-button"
              onClick={startLoading}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Start Loading"}
            </Button>

            <div id="progress-container" className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span id="progress-percentage">{loadingProgress}%</span>
              </div>
              <Progress 
                id="loading-progress-bar"
                value={loadingProgress} 
                className="w-full"
              />
            </div>

            {loadingProgress === 100 && !isLoading && (
              <div 
                id="loading-complete-message"
                className="p-3 bg-success/10 border border-success/20 text-success-foreground rounded-md"
              >
                ✅ Loading completed successfully!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Countdown Timer */}
        <Card id="countdown-card">
          <CardHeader>
            <CardTitle id="countdown-title">Auto-Updating Countdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                id="start-countdown-button"
                onClick={startCountdown}
                disabled={isCountdownActive}
              >
                Start Countdown
              </Button>
              
              <div 
                id="countdown-display"
                className={`text-2xl font-mono font-bold px-4 py-2 rounded-md border-2 ${
                  countdown <= 3 && isCountdownActive
                    ? "text-destructive border-destructive bg-destructive/10"
                    : "text-primary border-primary bg-primary/10"
                }`}
              >
                {countdown}
              </div>
            </div>

            {countdown === 0 && !isCountdownActive && (
              <div 
                id="countdown-finished-message"
                className="p-3 bg-warning/10 border border-warning/20 text-warning-foreground rounded-md"
              >
                🚀 Countdown finished! Time's up!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dynamic List Management */}
        <Card id="dynamic-list-card">
          <CardHeader>
            <CardTitle id="dynamic-list-title">Dynamic List Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                id="add-item-button"
                onClick={addListItem}
              >
                Add Item
              </Button>
              <Button 
                id="clear-list-button"
                onClick={clearList}
                variant="outline"
                disabled={dynamicList.length === 0}
              >
                Clear All
              </Button>
            </div>

            <div 
              id="dynamic-list-container"
              className="min-h-[100px] max-h-[200px] overflow-y-auto border rounded-md p-3"
            >
              {dynamicList.length === 0 ? (
                <p id="empty-list-message" className="text-muted-foreground text-center py-4">
                  No items in the list. Click "Add Item" to populate.
                </p>
              ) : (
                <ul id="dynamic-list" className="space-y-2">
                  {dynamicList.map((item, index) => (
                    <li 
                      key={index}
                      id={`list-item-${index}`}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <span className="text-sm">{item}</span>
                      <Button
                        id={`remove-item-${index}`}
                        onClick={() => removeListItem(index)}
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Total items: <span id="list-count">{dynamicList.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* AJAX Content Loading */}
        <Card id="ajax-card">
          <CardHeader>
            <CardTitle id="ajax-title">AJAX Content Loading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              id="load-ajax-button"
              onClick={loadAjaxContent}
              disabled={isAjaxLoading}
            >
              {isAjaxLoading ? "Loading..." : "Load AJAX Content"}
            </Button>

            <div id="ajax-content-container" className="min-h-[100px] border rounded-md p-4">
              {isAjaxLoading ? (
                <div id="ajax-loading-spinner" className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-muted-foreground">Loading content...</span>
                </div>
              ) : ajaxContent ? (
                <div 
                  id="ajax-loaded-content"
                  dangerouslySetInnerHTML={{ __html: ajaxContent }}
                  className="prose prose-sm max-w-none"
                />
              ) : (
                <p id="ajax-empty-message" className="text-muted-foreground text-center py-4">
                  No content loaded yet. Click "Load AJAX Content" to fetch data.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card id="dynamic-instructions-card">
          <CardHeader>
            <CardTitle>Dynamic Content Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Wait Strategies:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Test explicit waits for element visibility</li>
                  <li>• Wait for progress bar completion</li>
                  <li>• Wait for countdown timer changes</li>
                  <li>• Wait for AJAX content to load</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dynamic Elements:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Elements appearing/disappearing</li>
                  <li>• List items being added/removed</li>
                  <li>• Progress indicators updating</li>
                  <li>• Content loaded via AJAX calls</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default Dynamic;