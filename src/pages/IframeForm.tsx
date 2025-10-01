import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const IframeForm = () => {
  const formIframeContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-container {
          background: rgba(255,255,255,0.95);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }
        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 24px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
          font-size: 14px;
        }
        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        button {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 10px;
        }
        button:hover {
          background: #5568d3;
        }
        .success-message {
          display: none;
          background: #4caf50;
          color: white;
          padding: 15px;
          border-radius: 6px;
          text-align: center;
          margin-top: 20px;
          font-weight: 500;
        }
        .error-message {
          display: none;
          background: #f44336;
          color: white;
          padding: 12px;
          border-radius: 6px;
          text-align: center;
          margin-bottom: 15px;
          font-size: 14px;
        }
        .forgot-password {
          text-align: center;
          margin-top: 15px;
        }
        .forgot-password a {
          color: #667eea;
          text-decoration: none;
          font-size: 13px;
        }
        .forgot-password a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h2 id="form-title">Login Form Inside Iframe</h2>
        
        <div id="error-message" class="error-message">
          Invalid credentials. Please try again.
        </div>
        
        <form id="iframe-login-form" onsubmit="handleSubmit(event)">
          <div class="form-group">
            <label for="iframe-username">Username</label>
            <input 
              type="text" 
              id="iframe-username" 
              name="username" 
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="iframe-password">Password</label>
            <input 
              type="password" 
              id="iframe-password" 
              name="password" 
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" id="iframe-login-button">
            Login
          </button>
          
          <div class="forgot-password">
            <a href="#" id="forgot-password-link" onclick="alert('Password reset link would be sent to your email'); return false;">
              Forgot Password?
            </a>
          </div>
        </form>
        
        <div id="success-message" class="success-message">
          ✓ Form submitted successfully!
        </div>
      </div>

      <script>
        function handleSubmit(event) {
          event.preventDefault();
          
          const username = document.getElementById('iframe-username').value;
          const password = document.getElementById('iframe-password').value;
          const errorMsg = document.getElementById('error-message');
          const successMsg = document.getElementById('success-message');
          const form = document.getElementById('iframe-login-form');
          
          // Simple validation
          if (username === 'admin' && password === 'password123') {
            // Success
            errorMsg.style.display = 'none';
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Reset after 3 seconds
            setTimeout(() => {
              form.style.display = 'block';
              successMsg.style.display = 'none';
              form.reset();
            }, 3000);
          } else {
            // Error
            errorMsg.style.display = 'block';
            
            // Hide error after 3 seconds
            setTimeout(() => {
              errorMsg.style.display = 'none';
            }, 3000);
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
            Practice interacting with form elements inside iframe contexts.
            Test form submission, validation, and success/error message handling within frames.
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
              height="500"
              style={{ border: '2px solid #667eea', borderRadius: '8px' }}
              srcDoc={formIframeContent}
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
                    // Switch to iframe context<br />
                    driver.switchTo().frame("form-frame");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Fill form inside iframe<br />
                    driver.findElement(By.id("iframe-username")).sendKeys("admin");<br />
                    driver.findElement(By.id("iframe-password")).sendKeys("password123");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Submit form<br />
                    driver.findElement(By.id("iframe-login-button")).click();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Verify success message<br />
                    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));<br />
                    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success-message")));
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Test Credentials:</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-green-800">✓ Valid Credentials:</p>
                  <p className="text-sm text-green-700 font-mono">Username: admin</p>
                  <p className="text-sm text-green-700 font-mono">Password: password123</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-800">✗ Invalid (Any other combination):</p>
                  <p className="text-sm text-red-700">Will show error message</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🧪 Testing Scenarios:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Valid Login:</strong> Enter correct credentials and verify success message</li>
                <li>• <strong>Invalid Login:</strong> Enter wrong credentials and verify error message</li>
                <li>• <strong>Empty Fields:</strong> Test HTML5 validation for required fields</li>
                <li>• <strong>Forgot Password:</strong> Click forgot password link and handle alert</li>
                <li>• <strong>Form Reset:</strong> Verify form resets after successful submission</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeForm;
