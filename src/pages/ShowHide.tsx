import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const ShowHide = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [showCount, setShowCount] = useState(0);

  const toggleText = () => {
    setIsTextVisible(!isTextVisible);
    setShowCount(prev => prev + 1);
  };

  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  const toggleList = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="show-hide-title">
            👁️ Show/Hide Elements Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling dynamically shown/hidden elements with different visibility patterns.
            Essential for testing dynamic content changes.
          </p>
        </div>

        {/* Show/Hide Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Basic Text Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isTextVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                Text Toggle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={toggleText}
                id="toggle-text-btn"
                variant="default"
                className="w-full"
              >
                {isTextVisible ? "Hide Text" : "Show Text"}
              </Button>
              
              {isTextVisible && (
                <div 
                  id="hidden-text"
                  className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20"
                >
                  <p className="text-primary font-medium">
                    🎉 This text is now visible! 
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Shown {showCount} times in this session.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Div Container Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ToggleLeft className="h-5 w-5" />
                Container Toggle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={toggleDiv}
                id="toggle-div-btn"
                variant="secondary"
                className="w-full"
              >
                {isDivVisible ? "Hide Container" : "Show Container"}
              </Button>
              
              {isDivVisible && (
                <div 
                  id="toggle-container"
                  className="p-4 bg-accent/10 rounded-lg border-2 border-accent/20"
                >
                  <h4 className="font-semibold text-accent mb-2">Dynamic Container</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Element ID: toggle-container</li>
                    <li>• Status: Currently visible</li>
                    <li>• Test: visibility tracking</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* List Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ToggleRight className="h-5 w-5" />
                List Toggle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={toggleList}
                id="toggle-list-btn"
                variant="outline"
                className="w-full"
              >
                {isListVisible ? "Hide List" : "Show List"}
              </Button>
              
              {isListVisible && (
                <div 
                  id="dynamic-list"
                  className="p-4 bg-muted rounded-lg"
                >
                  <h4 className="font-semibold mb-3">Testing Checklist:</h4>
                  <ul className="space-y-2 text-sm">
                    <li id="list-item-1" className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Element visibility detection
                    </li>
                    <li id="list-item-2" className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Dynamic content loading
                    </li>
                    <li id="list-item-3" className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      State change validation
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Wait Strategies:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <code>WebDriverWait</code> for element visibility</li>
                  <li>• <code>ExpectedConditions.visibilityOf()</code></li>
                  <li>• <code>ExpectedConditions.invisibilityOf()</code></li>
                  <li>• <code>element.isDisplayed()</code> check</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Test Scenarios:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Test initial state (visible/hidden)</li>
                  <li>• Verify toggle functionality</li>
                  <li>• Validate element presence vs visibility</li>
                  <li>• Check content changes after show/hide</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShowHide;