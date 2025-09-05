import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Links = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card id="links-card">
          <CardHeader>
            <CardTitle id="links-title">Test Links Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Working Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Working Links</h3>
              <div className="space-y-2">
                <p>
                  <a 
                    href="/"
                    id="link-home"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    Link to Home Page
                  </a>
                </p>
                <p>
                  <a 
                    href="/forms"
                    id="link-forms"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    Link to Forms Page
                  </a>
                </p>
                <p>
                  <a 
                    href="/login"
                    id="link-login"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    Link to Login Page
                  </a>
                </p>
              </div>
            </div>

            {/* External Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">External Links</h3>
              <div className="space-y-2">
                <p>
                  <a 
                    href="https://www.selenium.dev"
                    id="link-selenium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    Selenium Official Website (Opens in New Tab)
                  </a>
                </p>
                <p>
                  <a 
                    href="https://github.com"
                    id="link-github"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    GitHub (Opens in New Tab)
                  </a>
                </p>
              </div>
            </div>

            {/* Broken Link */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Broken Link (404 Test)</h3>
              <p>
                <a 
                  href="/non-existent-page"
                  id="broken-link"
                  className="text-destructive hover:text-destructive-hover underline"
                >
                  This is a broken link (will show 404 page)
                </a>
              </p>
            </div>

            {/* Anchor Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Anchor Links (Page Scroll)</h3>
              <p>
                <a 
                  href="#section-bottom"
                  id="anchor-link-bottom"
                  className="text-accent hover:text-accent-hover underline"
                >
                  Click to scroll to bottom section
                </a>
              </p>
            </div>

            {/* JavaScript Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">JavaScript Links</h3>
              <div className="space-y-2">
                <p>
                  <a 
                    href="javascript:alert('Hello from JavaScript link!');"
                    id="js-alert-link"
                    className="text-warning hover:text-warning-foreground underline"
                  >
                    JavaScript Alert Link
                  </a>
                </p>
                <p>
                  <a 
                    href="javascript:void(0);"
                    id="js-void-link"
                    className="text-muted-foreground hover:text-foreground underline"
                    onClick={() => console.log('JavaScript void link clicked')}
                  >
                    JavaScript Void Link (Check Console)
                  </a>
                </p>
              </div>
            </div>

            {/* Link States */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Link States Testing</h3>
              <div className="space-y-2">
                <p>
                  <a 
                    href="#"
                    id="link-visited"
                    className="text-primary hover:text-primary-hover visited:text-purple-600 underline"
                  >
                    Link with Visited State
                  </a>
                </p>
                <p>
                  <a 
                    href="#"
                    id="link-active"
                    className="text-primary hover:text-primary-hover active:text-primary-hover underline"
                  >
                    Link with Active State
                  </a>
                </p>
              </div>
            </div>

            {/* Spacer for anchor link */}
            <div className="h-96"></div>

            {/* Bottom Section */}
            <div id="section-bottom" className="space-y-4 p-4 bg-testing-element border border-testing-border rounded-md">
              <h3 className="text-lg font-medium">Bottom Section</h3>
              <p>You've reached the bottom section via anchor link!</p>
              <p>
                <a 
                  href="#links-title"
                  id="anchor-link-top"
                  className="text-accent hover:text-accent-hover underline"
                >
                  Click to scroll back to top
                </a>
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Links;