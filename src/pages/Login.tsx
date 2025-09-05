import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Simulate login validation
    setTimeout(() => {
      if (username === "admin" && password === "password123") {
        setErrorMessage("");
        alert("Login successful! Welcome back.");
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert("Password reset link has been sent to your email address.");
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Card id="login-card">
          <CardHeader className="text-center">
            <CardTitle id="login-title">Login to Your Account</CardTitle>
            <CardDescription id="login-description">
              Enter your credentials to access the testing portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} id="login-form" className="space-y-4">
              {errorMessage && (
                <div 
                  id="error-message" 
                  className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md"
                >
                  {errorMessage}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                id="login-button"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                id="forgot-password-link"
                onClick={handleForgotPassword}
                className="text-primary hover:text-primary-hover underline text-sm"
              >
                Forgot your password?
              </button>
            </div>

            <div className="mt-4 p-3 bg-testing-element border border-testing-border rounded-md">
              <p className="text-sm font-medium">Test Credentials:</p>
              <p className="text-sm text-muted-foreground">Username: <span className="font-mono">admin</span></p>
              <p className="text-sm text-muted-foreground">Password: <span className="font-mono">password123</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;