import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

const Dropdowns = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customDropdownOpen, setCustomDropdownOpen] = useState(false);
  const [customSelectedValue, setCustomSelectedValue] = useState("Select an option");
  
  // Country-State mapping for dependent dropdowns
  const countryStates: { [key: string]: string[] } = {
    India: ["Karnataka", "Kerala", "Maharashtra", "Gujarat", "Tamil Nadu"],
    USA: ["California", "Texas", "New York", "Florida", "Illinois"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"]
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleCustomDropdownSelect = (value: string) => {
    setCustomSelectedValue(value);
    setCustomDropdownOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold mb-4" id="dropdowns-heading">
            Dropdown Testing Page
          </h1>
          <p className="text-muted-foreground" id="dropdowns-description">
            Practice different types of dropdown interactions for Selenium automation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Standard HTML Select Dropdown */}
          <Card id="standard-dropdown-card">
            <CardHeader>
              <CardTitle>1. Standard HTML Select Dropdown</CardTitle>
              <CardDescription>Basic HTML select element with country options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="country-select">Select Country</Label>
                <Select onValueChange={setSelectedCountry} value={selectedCountry}>
                  <SelectTrigger id="country-select" className="w-full">
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent id="country-select-content">
                    <SelectItem value="India" id="country-india">India</SelectItem>
                    <SelectItem value="USA" id="country-usa">USA</SelectItem>
                    <SelectItem value="UK" id="country-uk">UK</SelectItem>
                    <SelectItem value="Australia" id="country-australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div id="selected-country-display" className="text-sm text-muted-foreground">
                Selected: {selectedCountry || "None"}
              </div>
            </CardContent>
          </Card>

          {/* Multi-select Dropdown */}
          <Card id="multiselect-dropdown-card">
            <CardHeader>
              <CardTitle>2. Multi-select Dropdown</CardTitle>
              <CardDescription>Select multiple programming skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Your Skills</Label>
                <div className="border rounded-md p-3" id="skills-multiselect">
                  {["Java", "Python", "Selenium", "SQL", "JavaScript", "C#"].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        id={`skill-${skill.toLowerCase()}`}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="rounded"
                      />
                      <label 
                        htmlFor={`skill-${skill.toLowerCase()}`}
                        className="text-sm cursor-pointer"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div id="selected-skills-display" className="text-sm text-muted-foreground">
                Selected Skills: {selectedSkills.length > 0 ? selectedSkills.join(", ") : "None"}
              </div>
            </CardContent>
          </Card>

          {/* Custom Styled Dropdown */}
          <Card id="custom-dropdown-card">
            <CardHeader>
              <CardTitle>3. Custom Styled Dropdown</CardTitle>
              <CardDescription>DIV-based dropdown (non-select element)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label>Custom Dropdown</Label>
                <div
                  id="custom-dropdown-trigger"
                  className="flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => setCustomDropdownOpen(!customDropdownOpen)}
                >
                  <span id="custom-dropdown-value">{customSelectedValue}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${customDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {customDropdownOpen && (
                  <div id="custom-dropdown-menu" className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((option, index) => (
                      <div
                        key={option}
                        id={`custom-option-${index + 1}`}
                        className="px-3 py-2 hover:bg-accent cursor-pointer"
                        onClick={() => handleCustomDropdownSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Disabled Dropdown */}
          <Card id="disabled-dropdown-card">
            <CardHeader>
              <CardTitle>4. Disabled Dropdown</CardTitle>
              <CardDescription>State dropdown disabled until country is selected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="state-select">Select State/Province</Label>
                <Select disabled={!selectedCountry} value="" onValueChange={() => {}}>
                  <SelectTrigger id="state-select" className="w-full">
                    <SelectValue placeholder={selectedCountry ? "Choose a state" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent id="state-select-content">
                    {selectedCountry && countryStates[selectedCountry]?.map((state, index) => (
                      <SelectItem 
                        key={state} 
                        value={state} 
                        id={`state-${state.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div id="state-status" className="text-sm text-muted-foreground">
                Status: {selectedCountry ? "Enabled" : "Disabled - Select a country first"}
              </div>
            </CardContent>
          </Card>

          {/* Dependent/Chained Dropdowns */}
          <Card id="dependent-dropdown-card" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>5. Dependent (Chained) Dropdowns</CardTitle>
              <CardDescription>Country selection affects available states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="chain-country-select">Country</Label>
                  <Select onValueChange={setSelectedCountry} value={selectedCountry}>
                    <SelectTrigger id="chain-country-select" className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent id="chain-country-content">
                      {Object.keys(countryStates).map((country) => (
                        <SelectItem 
                          key={country} 
                          value={country} 
                          id={`chain-country-${country.toLowerCase()}`}
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="chain-state-select">State/Province</Label>
                  <Select disabled={!selectedCountry} value="" onValueChange={() => {}}>
                    <SelectTrigger id="chain-state-select" className="w-full">
                      <SelectValue placeholder={selectedCountry ? "Select State" : "Select country first"} />
                    </SelectTrigger>
                    <SelectContent id="chain-state-content">
                      {selectedCountry && countryStates[selectedCountry]?.map((state) => (
                        <SelectItem 
                          key={state} 
                          value={state} 
                          id={`chain-state-${state.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Available States for {selectedCountry || "No Country Selected"}:</h4>
                <div id="available-states-list" className="text-sm text-muted-foreground">
                  {selectedCountry ? (
                    <ul className="list-disc list-inside">
                      {countryStates[selectedCountry]?.map((state, index) => (
                        <li key={state} id={`available-state-${index}`}>{state}</li>
                      ))}
                    </ul>
                  ) : (
                    "Please select a country to see available states"
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Instructions */}
        <Card id="testing-instructions">
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
            <CardDescription>Guidelines for automated testing of these dropdowns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">🎯 Test Scenarios</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Test standard select dropdown selection</li>
                  <li>• Verify multi-select checkbox interactions</li>
                  <li>• Test custom dropdown click and selection</li>
                  <li>• Verify disabled state behavior</li>
                  <li>• Test dependent dropdown relationships</li>
                  <li>• Validate selected values display correctly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔍 Key Element IDs</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code>country-select</code> - Standard dropdown</li>
                  <li>• <code>skills-multiselect</code> - Multi-select container</li>
                  <li>• <code>custom-dropdown-trigger</code> - Custom dropdown</li>
                  <li>• <code>state-select</code> - Disabled dropdown</li>
                  <li>• <code>chain-country-select</code> - Dependent country</li>
                  <li>• <code>chain-state-select</code> - Dependent state</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dropdowns;