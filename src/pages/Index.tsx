import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const testPages = [
    {
      title: "Login Page",
      icon: "🔑",
      description: "Username/password forms, validation, error messages",
      path: "/login",
      id: "test-login"
    },
    {
      title: "Forms Page", 
      icon: "📝",
      description: "Various input types, dropdowns, checkboxes, radio buttons",
      path: "/forms",
      id: "test-forms"
    },
    {
      title: "Links Page",
      icon: "🔗", 
      description: "Different link types, broken links, external links",
      path: "/links",
      id: "test-links"
    },
    {
      title: "Tables Page",
      icon: "📊",
      description: "Static and dynamic tables, sorting, pagination", 
      path: "/tables",
      id: "test-tables"
    },
    {
      title: "Upload & Download",
      icon: "📂",
      description: "File upload functionality and download testing",
      path: "/upload-download", 
      id: "test-files"
    },
    {
      title: "Alerts & Popups",
      icon: "⚠️",
      description: "JavaScript alerts, confirms, prompts and custom dialogs",
      path: "/alerts",
      id: "test-alerts"
    },
    {
      title: "Dynamic Content", 
      icon: "🔄",
      description: "Show/hide elements, loading states, real-time updates",
      path: "/dynamic",
      id: "test-dynamic"
    },
    {
      title: "Advanced Testing",
      icon: "🧩",
      description: "Shadow DOM, iframes, drag & drop, complex interactions",
      path: "/advanced",
      id: "test-advanced"
    },
    {
      title: "Test Recorder",
      icon: "🎥", 
      description: "Record test steps and export as PDF or Markdown",
      path: "/recorder",
      id: "test-recorder"
    },
    {
      title: "Dropdowns",
      icon: "⬇️",
      description: "Various dropdown types including standard, custom, and dependent",
      path: "/dropdowns",
      id: "test-dropdowns"
    },
    {
      title: "Credits", 
      icon: "👨‍💻",
      description: "Meet the team behind this testing platform",
      path: "/credits",
      id: "test-credits"
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

        {/* Features Grid - Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testPages.map((page, index) => (
            <Link key={index} to={page.path} id={`${page.id}-card`}>
              <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30">
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {page.icon}
                    </div>
                    <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors">
                      {page.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {page.description}
                    </CardDescription>
                  </div>
                  <Button 
                    className="w-full mt-4 group-hover:bg-primary-hover" 
                    id={`${page.id}-button`}
                  >
                    Start Testing
                  </Button>
                </CardContent>
              </Card>
            </Link>
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