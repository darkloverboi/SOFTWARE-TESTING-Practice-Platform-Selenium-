import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

const IframeScrollable = () => {
  const scrollableContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: linear-gradient(180deg, #f0f9ff, #e0f2fe);
          margin: 0;
          line-height: 1.6;
        }
        .content-section {
          background: rgba(255,255,255,0.9);
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .scroll-note {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #ff6b6b;
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 1000;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .highlight-box {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          margin: 10px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="scroll-note" id="scroll-indicator">📜 Scroll inside this iframe</div>
      
      <div class="content-section">
        <h2 id="section1">Section 1: Introduction</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        
        <div class="highlight-box">
          <strong>Note:</strong> This is a scrollable iframe with extensive content for testing scroll actions in Selenium.
        </div>
      </div>

      <div class="content-section">
        <h2 id="section2">Section 2: Data Table</h2>
        <table id="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>John Smith</td><td>Engineering</td><td>$75,000</td><td>2021-03-15</td></tr>
            <tr><td>2</td><td>Sarah Johnson</td><td>Marketing</td><td>$65,000</td><td>2020-08-22</td></tr>
            <tr><td>3</td><td>Mike Davis</td><td>Sales</td><td>$70,000</td><td>2019-11-30</td></tr>
            <tr><td>4</td><td>Lisa Wilson</td><td>HR</td><td>$60,000</td><td>2022-01-10</td></tr>
            <tr><td>5</td><td>David Brown</td><td>Engineering</td><td>$80,000</td><td>2020-05-18</td></tr>
            <tr><td>6</td><td>Emma Taylor</td><td>Marketing</td><td>$62,000</td><td>2021-09-03</td></tr>
            <tr><td>7</td><td>James Anderson</td><td>Sales</td><td>$68,000</td><td>2019-07-12</td></tr>
            <tr><td>8</td><td>Anna Martinez</td><td>Engineering</td><td>$77,000</td><td>2022-02-28</td></tr>
          </tbody>
        </table>
      </div>

      <div class="content-section">
        <h2 id="section3">Section 3: More Content</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.</p>
        
        <div class="highlight-box">
          <strong id="bottom-element">Bottom Element:</strong> This element is at the bottom and requires scrolling to reach it.
        </div>
      </div>

      <div class="content-section">
        <h2 id="section4">Section 4: Final Section</h2>
        <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth.</p>
        
        <p id="last-paragraph">This is the last paragraph in the scrollable iframe. If you can see this text, you've successfully scrolled to the bottom of the iframe content.</p>
      </div>
    </body>
    </html>
  `;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="scrollable-iframe-title">
            🖼️ Scrollable Iframe Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice scrolling within iframe contexts and locating elements that require scrolling to become visible.
            Essential for testing content-heavy embedded applications.
          </p>
        </div>

        {/* Scrollable Iframe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Long Scrollable Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              id="scrollable-frame"
              width="100%"
              height="400"
              style={{ border: '2px solid #0ea5e9', borderRadius: '8px' }}
              srcDoc={scrollableContent}
              title="Scrollable iframe with long content"
            />
          </CardContent>
        </Card>

        {/* Testing Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Scrollable Iframe Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Scroll Actions in Iframe:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Switch to scrollable iframe<br />
                    driver.switchTo().frame("scrollable-frame");
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Scroll to element at bottom<br />
                    WebElement bottomElement = driver.findElement(By.id("bottom-element"));<br />
                    ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView();", bottomElement);
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Scroll by pixels<br />
                    ((JavascriptExecutor) driver).executeScript("window.scrollBy(0,300);");
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Scroll Testing Strategies:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>ScrollIntoView:</strong> Scroll element into viewport</li>
                  <li>• <strong>Window.scrollBy:</strong> Scroll by specific pixel amounts</li>
                  <li>• <strong>Page Down/Up:</strong> Use Keys.PAGE_DOWN, Keys.PAGE_UP</li>
                  <li>• <strong>Element Visibility:</strong> Wait for elements to become visible</li>
                  <li>• <strong>Table Scrolling:</strong> Test horizontal/vertical table scroll</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Always switch to iframe context before attempting scroll actions</li>
                <li>• Use explicit waits for elements that appear after scrolling</li>
                <li>• Test both vertical and horizontal scrolling scenarios</li>
                <li>• Verify element visibility after scroll actions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default IframeScrollable;