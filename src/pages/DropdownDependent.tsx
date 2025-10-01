import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { GitBranch } from "lucide-react";

const DropdownDependent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  
  const states: Record<string, string[]> = {
    usa: ["California", "Texas", "New York", "Florida"],
    india: ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"],
    uk: ["England", "Scotland", "Wales", "Northern Ireland"],
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="dependent-dropdown-title">
            ⬇️ Dependent Dropdown Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice with cascading dropdowns where second depends on first selection.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Country → State Dependent Dropdowns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="country-dropdown" className="block text-sm font-medium mb-2">
                Select Country
              </label>
              <Select onValueChange={setSelectedCountry}>
                <SelectTrigger id="country-dropdown">
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa" id="country-option-usa">United States</SelectItem>
                  <SelectItem value="india" id="country-option-india">India</SelectItem>
                  <SelectItem value="uk" id="country-option-uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="state-dropdown" className="block text-sm font-medium mb-2">
                Select State/Region
              </label>
              <Select disabled={!selectedCountry}>
                <SelectTrigger id="state-dropdown">
                  <SelectValue placeholder={selectedCountry ? "Choose a state" : "Select country first"} />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountry && states[selectedCountry]?.map((state, index) => (
                    <SelectItem key={state} value={state.toLowerCase()} id={`state-option-${index}`}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selenium Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded font-mono text-xs space-y-2">
              <p>// Select country first</p>
              <p>driver.findElement(By.id("country-dropdown")).click();</p>
              <p>driver.findElement(By.id("country-option-usa")).click();</p>
              <p>// Then select state</p>
              <p>driver.findElement(By.id("state-dropdown")).click();</p>
              <p>driver.findElement(By.id("state-option-0")).click();</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DropdownDependent;
