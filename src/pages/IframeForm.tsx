import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const IframeForm = () => {
  const formContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: linear-gradient(135deg, #f0f9ff, #e0f7fa);
          margin: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .form-container {
          background: rgba(255,255,255,0.95);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 400px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
        }
        input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }
        input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .login-button {
          width: 100%;
          padding: 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .login-button:hover {
          background: #2563eb;
        }
        .message {
          margin-top: 15px;
          padding: 10px;
          border-radius: 4px;
          text-align: center;
          font-weight: 500;
          display: none;
        }
        .success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        .error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
      </style>
    </head>
    <body>
      <div class="form-container">
        <h2 id="form-title" style="text-align: center; margin-bottom: 25px; color: #1f2937;">
          🔐 Login Form
        </h2>
        
        <form id="iframe-login-form" onsubmit="return handleLogin(event)">
          <div class="form-group">
            <label for="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" id="login-button" class="login-button">
            Login
          </button>
        </form>
        
        <div id="message" class="message"></div>
        
        <div style="text-align: center; margin-top: 15px;">
          <small style="color: #6b7280;">
            Test credentials: <strong>admin</strong> / <strong>password123</strong>
          </small>
        </div>
      </div>

      <script>
        function handleLogin(event) {
          event.preventDefault();
          
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const messageDiv = document.getElementById('message');
          
          // Clear previous message
          messageDiv.style.display = 'none';
          messageDiv.className = 'message';
          
          // Simple validation
          if (username === 'admin' && password === 'password123') {
            messageDiv.textContent = '✅ Form submitted successfully! Login authenticated.';
            messageDiv.classList.add('success');
            messageDiv.style.display = 'block';
            
            // Clear form after success
            setTimeout(() => {
              document.getElementById('iframe-login-form').reset();
              messageDiv.style.display = 'none';
            }, 3000);
          } else {
            messageDiv.textContent = '❌ Invalid credentials. Please try again.';
            messageDiv.classList.add('error');
            messageDiv.style.display = 'block';
          }
          
          return false;
        }
      </script>
    </body>
    </html>
  `;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="iframe-form-title">
            🖼️ Iframe Form Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice filling out and submitting forms within iframe contexts.
            Test form validation and success/error message handling inside frames.
          </p>
        </div>

        {/* Iframe with Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Login Form in Iframe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              id="form-frame"
              width="100%"
              height="450"
              style={{ border: '2px solid #0ea5e9', borderRadius: '8px' }}
              srcDoc={formContent}
              title="Iframe containing login form"
            />
          </CardContent>
        </Card>

        {/* Testing Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Iframe Form Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Form Interaction in Iframe:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to form iframe<br />
                    driver.switchTo().frame("form-frame");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Fill out form fields<br />
                    driver.findElement(By.id("username")).sendKeys("admin");<br />
                    driver.findElement(By.id("password")).sendKeys("password123");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Submit form<br />
                    driver.findElement(By.id("login-button")).click();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Verify success message<br />
                    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));<br />
                    WebElement message = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("message")));
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Form Testing Scenarios:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Valid Login:</strong> Use admin/password123</li>
                  <li>• <strong>Invalid Login:</strong> Test wrong credentials</li>
                  <li>• <strong>Empty Fields:</strong> Test required field validation</li>
                  <li>• <strong>Success Message:</strong> Verify "Form submitted successfully"</li>
                  <li>• <strong>Error Message:</strong> Verify "Invalid credentials" message</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ Test Credentials:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>Username:</strong> admin</li>
                <li>• <strong>Password:</strong> password123</li>
                <li>• Form will show success message for correct credentials</li>
                <li>• Form will show error message for incorrect credentials</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeForm;