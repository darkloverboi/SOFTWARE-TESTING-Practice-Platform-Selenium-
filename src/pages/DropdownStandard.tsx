import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

const DropdownStandard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="standard-dropdown-title">
            ⬇️ Standard Dropdown Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice with standard HTML select dropdowns for Selenium automation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChevronDown className="h-5 w-5" />
              Standard Select Dropdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="country-select" className="block text-sm font-medium mb-2">
                Select Country
              </label>
              <Select>
                <SelectTrigger id="country-select" className="w-full">
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa" id="country-usa">United States</SelectItem>
                  <SelectItem value="uk" id="country-uk">United Kingdom</SelectItem>
                  <SelectItem value="canada" id="country-canada">Canada</SelectItem>
                  <SelectItem value="australia" id="country-australia">Australia</SelectItem>
                  <SelectItem value="india" id="country-india">India</SelectItem>
                  <SelectItem value="germany" id="country-germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="language-select" className="block text-sm font-medium mb-2">
                Select Language
              </label>
              <Select>
                <SelectTrigger id="language-select" className="w-full">
                  <SelectValue placeholder="Choose a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english" id="lang-english">English</SelectItem>
                  <SelectItem value="spanish" id="lang-spanish">Spanish</SelectItem>
                  <SelectItem value="french" id="lang-french">French</SelectItem>
                  <SelectItem value="german" id="lang-german">German</SelectItem>
                  <SelectItem value="chinese" id="lang-chinese">Chinese</SelectItem>
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
              <p>// Select dropdown by ID</p>
              <p>Select dropdown = new Select(driver.findElement(By.id("country-select")));</p>
              <p>dropdown.selectByVisibleText("Canada");</p>
              <p>dropdown.selectByValue("canada");</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DropdownStandard;
