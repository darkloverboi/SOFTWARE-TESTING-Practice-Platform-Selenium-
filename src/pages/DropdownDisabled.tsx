import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ban } from "lucide-react";

const DropdownDisabled = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="disabled-dropdown-title">
            ⬇️ Disabled Dropdown Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling disabled dropdown elements in automation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5" />
              Disabled Dropdowns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="enabled-dropdown" className="block text-sm font-medium mb-2">
                Enabled Dropdown
              </label>
              <Select>
                <SelectTrigger id="enabled-dropdown">
                  <SelectValue placeholder="This dropdown is enabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">Option 1</SelectItem>
                  <SelectItem value="opt2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="disabled-dropdown" className="block text-sm font-medium mb-2 text-muted-foreground">
                Disabled Dropdown
              </label>
              <Select disabled>
                <SelectTrigger id="disabled-dropdown" disabled>
                  <SelectValue placeholder="This dropdown is disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">Option 1</SelectItem>
                  <SelectItem value="opt2">Option 2</SelectItem>
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
              <p>// Check if dropdown is disabled</p>
              <p>boolean isDisabled = !driver.findElement(By.id("disabled-dropdown")).isEnabled();</p>
              <p>System.out.println("Dropdown disabled: " + isDisabled);</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DropdownDisabled;
