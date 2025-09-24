import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Mail, Phone } from "lucide-react";
import { useState } from "react";

const AlertsPrompt = () => {
  const [lastInput, setLastInput] = useState<string>("");

  const showNamePrompt = () => {
    const result = prompt("Please enter your name:");
    setLastInput(result ? `Name entered: "${result}"` : "Name prompt cancelled");
  };

  const showEmailPrompt = () => {
    const result = prompt("Enter your email address:", "user@example.com");
    setLastInput(result ? `Email entered: "${result}"` : "Email prompt cancelled");
  };

  const showAgePrompt = () => {
    const result = prompt("How old are you? (Numbers only)");
    if (result) {
      const age = parseInt(result);
      if (isNaN(age)) {
        setLastInput(`Invalid input: "${result}" is not a number`);
      } else {
        setLastInput(`Age entered: ${age} years old`);
      }
    } else {
      setLastInput("Age prompt cancelled");
    }
  };

  const showPasswordPrompt = () => {
    const result = prompt("Enter a test password (will be visible):");
    setLastInput(result ? `Password entered: "${result}"` : "Password prompt cancelled");
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="alerts-prompt-title">
            💬 Prompt Alerts Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling JavaScript prompt() dialogs with text input fields.
            Test user input handling and validation scenarios.
          </p>
        </div>

        {/* Prompt Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              JavaScript Prompt() Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Last Input Display */}
            {lastInput && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium" id="last-input-result">
                  Result: <span className="text-primary">{lastInput}</span>
                </p>
              </div>
            )}

            {/* Name Prompt */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2" id="name-prompt-label">
                <User className="h-4 w-4" />
                Name Input Prompt
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Basic prompt asking for user's name with no default value.
              </p>
              <Button 
                onClick={showNamePrompt}
                id="name-prompt-btn"
                variant="default"
              >
                Enter Name
              </Button>
            </div>

            {/* Email Prompt with Default */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2" id="email-prompt-label">
                <Mail className="h-4 w-4" />
                Email Prompt (with default)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prompt with pre-filled default email value.
              </p>
              <Button 
                onClick={showEmailPrompt}
                id="email-prompt-btn"
                variant="secondary"
              >
                Enter Email
              </Button>
            </div>

            {/* Age/Number Prompt */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2" id="age-prompt-label">
                <Phone className="h-4 w-4" />
                Age/Number Validation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tests number input validation and error handling.
              </p>
              <Button 
                onClick={showAgePrompt}
                id="age-prompt-btn"
                variant="outline"
              >
                Enter Age
              </Button>
            </div>

            {/* Password Prompt */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2" id="password-prompt-label">Password Prompt</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Note: Prompt dialogs don't hide text like password fields.
              </p>
              <Button 
                onClick={showPasswordPrompt}
                id="password-prompt-btn"
                variant="destructive"
              >
                Enter Password
              </Button>
            </div>

            {/* Testing Instructions */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Selenium Testing Notes:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use <code>driver.switchTo().alert()</code> to handle prompts</li>
                <li>• <code>alert.sendKeys("text")</code> to type in the input field</li>
                <li>• <code>alert.accept()</code> to click OK</li>
                <li>• <code>alert.dismiss()</code> to click Cancel</li>
                <li>• <code>alert.getText()</code> reads the prompt message</li>
                <li>• Test both valid input and cancellation scenarios</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlertsPrompt;