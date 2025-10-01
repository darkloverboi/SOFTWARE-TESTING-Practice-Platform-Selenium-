import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { List } from "lucide-react";

const DropdownMulti = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="multi-dropdown-title">
            ⬇️ Multi-Select Dropdown Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice selecting multiple options from dropdown lists.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Multi-Select Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" id="skills-multiselect">
              <div className="flex items-center space-x-2">
                <Checkbox id="skill-java" />
                <label htmlFor="skill-java" className="text-sm font-medium">Java</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="skill-python" />
                <label htmlFor="skill-python" className="text-sm font-medium">Python</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="skill-javascript" />
                <label htmlFor="skill-javascript" className="text-sm font-medium">JavaScript</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="skill-selenium" />
                <label htmlFor="skill-selenium" className="text-sm font-medium">Selenium</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="skill-cypress" />
                <label htmlFor="skill-cypress" className="text-sm font-medium">Cypress</label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selenium Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded font-mono text-xs space-y-2">
              <p>// Select multiple checkboxes</p>
              <p>driver.findElement(By.id("skill-java")).click();</p>
              <p>driver.findElement(By.id("skill-selenium")).click();</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DropdownMulti;
