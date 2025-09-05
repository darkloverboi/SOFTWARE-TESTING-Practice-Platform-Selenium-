import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const testPages = [
    {
      title: "Login Testing",
      description: "Username/password forms, validation, error messages",
      path: "/login",
      id: "test-login",
      elements: ["Input fields", "Submit button", "Error handling", "Forgot password link"]
    },
    {
      title: "Form Elements",
      description: "Various input types, dropdowns, checkboxes, radio buttons",
      path: "/forms",
      id: "test-forms",
      elements: ["Text inputs", "Radio buttons", "Checkboxes", "Select dropdown"]
    },
    {
      title: "Link Testing",
      description: "Different link types, broken links, external links",
      path: "/links",
      id: "test-links",
      elements: ["Internal links", "External links", "Broken links", "Anchor links"]
    },
    {
      title: "Table Operations",
      description: "Static and dynamic tables, sorting, pagination",
      path: "/tables",
      id: "test-tables",
      elements: ["Static table", "Sortable columns", "Pagination", "Row selection"]
    },
    {
      title: "File Upload/Download",
      description: "File upload functionality and download testing",
      path: "/upload-download",
      id: "test-files",
      elements: ["File input", "Upload progress", "Download buttons", "Multiple files"]
    },
    {
      title: "Alerts & Popups",
      description: "JavaScript alerts, confirms, prompts and custom dialogs",
      path: "/alerts",
      id: "test-alerts",
      elements: ["Alert boxes", "Confirm dialogs", "Prompt inputs", "Custom modals"]
    },
    {
      title: "Dynamic Content",
      description: "Show/hide elements, loading states, real-time updates",
      path: "/dynamic",
      id: "test-dynamic",
      elements: ["Toggle visibility", "Progress bars", "Countdown timers", "AJAX loading"]
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border">
          <h1 className="text-4xl font-bold mb-4" id="main-heading">
            DLB Software Testing Web
          </h1>
          <p className="text-xl text-muted-foreground mb-6" id="main-description">
            Complete Selenium Automation Practice Website
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto" id="main-intro">
            This website contains all common web elements and interactions needed for 
            comprehensive Selenium automation testing. Each page includes properly 
            structured HTML with unique IDs and names for easy element location.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testPages.map((page, index) => (
            <Card key={index} id={page.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{page.title}</span>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                    {index + 1}
                  </span>
                </CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Test Elements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {page.elements.map((element, idx) => (
                        <li key={idx}>• {element}</li>
                      ))}
                    </ul>
                  </div>
                  <Link to={page.path}>
                    <Button className="w-full" id={`${page.id}-button`}>
                      Start Testing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Guide */}
        <Card id="quick-start-guide">
          <CardHeader>
            <CardTitle>Quick Start Guide for Testers</CardTitle>
            <CardDescription>
              How to use this website for Selenium automation practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">🎯 Testing Objectives</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Practice element locating strategies (ID, Name, XPath, CSS)</li>
                  <li>• Test form interactions and data input</li>
                  <li>• Handle different types of alerts and popups</li>
                  <li>• Work with dynamic content and wait conditions</li>
                  <li>• Test file upload/download functionality</li>
                  <li>• Validate table data and perform sorting operations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">🔧 Element Locators</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• All interactive elements have unique <code>id</code> attributes</li>
                  <li>• Form elements include <code>name</code> attributes</li>
                  <li>• Consistent naming convention for easy identification</li>
                  <li>• Error messages and status elements are clearly marked</li>
                  <li>• Tables include row and cell IDs for precise targeting</li>
                  <li>• Dynamic content has predictable ID patterns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Information */}
        <Card id="technical-info">
          <CardHeader>
            <CardTitle>Technical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">🏗️ Built With</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React 18 + TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Radix UI components</li>
                  <li>• Modern HTML5 semantics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🎯 Testing Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All common web elements</li>
                  <li>• Realistic user interactions</li>
                  <li>• Error states and validations</li>
                  <li>• Loading states and animations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📋 Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Semantic HTML structure</li>
                  <li>• Accessibility considerations</li>
                  <li>• Clean, maintainable code</li>
                  <li>• Consistent design patterns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default Index;