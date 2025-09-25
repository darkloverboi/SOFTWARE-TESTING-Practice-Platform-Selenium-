import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const IframeLinks = () => {
  const linksContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          margin: 0;
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .links-container {
          background: rgba(255,255,255,0.9);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 500px;
          margin: 0 auto;
        }
        .link-item {
          margin: 15px 0;
          padding: 15px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .link-item a {
          display: inline-block;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: background 0.3s ease;
        }
        .link-item a:hover {
          background: #0056b3;
        }
        .google-link { background: #4285f4 !important; }
        .youtube-link { background: #ff0000 !important; }
        .wikipedia-link { background: #000000 !important; }
        .google-link:hover { background: #3367d6 !important; }
        .youtube-link:hover { background: #cc0000 !important; }
        .wikipedia-link:hover { background: #333333 !important; }
        .description {
          margin-top: 8px;
          font-size: 12px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="links-container">
        <h2 id="iframe-links-title">External Links in Iframe</h2>
        <p>Click any link below to navigate within this iframe:</p>
        
        <div class="link-item">
          <a href="https://www.google.com" id="google-link" class="google-link" target="_self">
            🔍 Google
          </a>
          <div class="description">Search engine and web services</div>
        </div>
        
        <div class="link-item">
          <a href="https://www.youtube.com" id="youtube-link" class="youtube-link" target="_self">
            📺 YouTube
          </a>
          <div class="description">Video sharing platform</div>
        </div>
        
        <div class="link-item">
          <a href="https://www.wikipedia.org" id="wikipedia-link" class="wikipedia-link" target="_self">
            📚 Wikipedia
          </a>
          <div class="description">Free online encyclopedia</div>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 6px; border: 1px solid #ffeaa7;">
          <small id="navigation-note">
            <strong>Note:</strong> Links will load inside this iframe for testing navigation within frame contexts.
          </small>
        </div>
      </div>
    </body>
    </html>
  `;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="iframe-links-title">
            🖼️ Iframe Links Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice clicking links within iframe contexts and handling navigation changes inside frames.
            Test how external sites load within embedded iframe elements.
          </p>
        </div>

        {/* Iframe with Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              External Links in Iframe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              id="links-frame"
              width="100%"
              height="500"
              style={{ border: '2px solid #0ea5e9', borderRadius: '8px' }}
              srcDoc={linksContent}
              title="Iframe containing external links"
            />
          </CardContent>
        </Card>

        {/* Testing Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Iframe Link Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Link Navigation in Iframe:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to iframe context<br />
                    driver.switchTo().frame("links-frame");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Click Google link inside iframe<br />
                    driver.findElement(By.id("google-link")).click();
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Wait for page to load within iframe<br />
                    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));<br />
                    wait.until(ExpectedConditions.titleContains("Google"));
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Navigate back in iframe<br />
                    driver.navigate().back();
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Navigation Testing Scenarios:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Link Clicks:</strong> Test all three external links</li>
                  <li>• <strong>Page Loading:</strong> Verify external sites load in iframe</li>
                  <li>• <strong>Back Navigation:</strong> Use browser back within iframe</li>
                  <li>• <strong>URL Verification:</strong> Check iframe src changes</li>
                  <li>• <strong>Content Validation:</strong> Verify expected content loads</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Some websites may block iframe embedding (X-Frame-Options)</li>
                <li>• Use driver.switchTo().frame() before interacting with iframe content</li>
                <li>• Handle potential security restrictions gracefully</li>
                <li>• Test with both real and mock external URLs for reliability</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeLinks;