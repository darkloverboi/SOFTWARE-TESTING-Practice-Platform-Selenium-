import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-6xl font-bold text-destructive mb-4">404</CardTitle>
            <CardTitle>Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-sm text-muted-foreground">
              You tried to access: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
            </p>
            <Button asChild className="w-full">
              <a href="/">Return to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFound;
