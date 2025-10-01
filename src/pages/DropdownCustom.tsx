import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";

const DropdownCustom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="custom-dropdown-title">
            ⬇️ Custom Dropdown Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice with custom div-based dropdown elements.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Menu className="h-5 w-5" />
              Custom Div Dropdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative" id="custom-dropdown-container">
              <Button
                id="custom-dropdown-trigger"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-between"
                variant="outline"
              >
                {selected}
              </Button>
              {isOpen && (
                <div
                  id="custom-dropdown-menu"
                  className="absolute w-full mt-2 bg-background border rounded-lg shadow-lg z-10"
                >
                  {options.map((option, index) => (
                    <div
                      key={index}
                      id={`custom-option-${index + 1}`}
                      className="px-4 py-2 hover:bg-secondary cursor-pointer"
                      onClick={() => {
                        setSelected(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selenium Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded font-mono text-xs space-y-2">
              <p>// Click custom dropdown trigger</p>
              <p>driver.findElement(By.id("custom-dropdown-trigger")).click();</p>
              <p>// Select option</p>
              <p>driver.findElement(By.id("custom-option-2")).click();</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DropdownCustom;
