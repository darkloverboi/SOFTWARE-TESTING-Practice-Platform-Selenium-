import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Forms = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    hobbies: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      country: "",
      hobbies: [],
    });
    setSubmitted(false);
  };

  const handleHobbyChange = (hobby: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        hobbies: prev.hobbies.filter(h => h !== hobby)
      }));
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card id="forms-card">
          <CardHeader>
            <CardTitle id="forms-title">Test Forms Page</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} id="test-form" className="space-y-6">
              {/* Basic Input Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name-input">Full Name</Label>
                  <Input
                    id="name-input"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-input">Email Address</Label>
                  <Input
                    id="email-input"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-input">Phone Number</Label>
                  <Input
                    id="phone-input"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
              </div>

              {/* Radio buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gender Selection</h3>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({...prev, gender: value}))}
                  id="gender-radio-group"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <Label htmlFor="gender-other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hobbies & Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["Programming", "Reading", "Sports", "Music", "Gaming", "Cooking"].map((hobby) => (
                    <div key={hobby} className="flex items-center space-x-2">
                      <Checkbox
                        id={`hobby-${hobby.toLowerCase()}`}
                        checked={formData.hobbies.includes(hobby)}
                        onCheckedChange={(checked) => handleHobbyChange(hobby, checked as boolean)}
                      />
                      <Label htmlFor={`hobby-${hobby.toLowerCase()}`}>{hobby}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dropdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Location</h3>
                <div className="space-y-2">
                  <Label htmlFor="country-select">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData(prev => ({...prev, country: value}))}
                  >
                    <SelectTrigger id="country-select">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-4">
                <Button type="submit" id="submit-button">Submit Form</Button>
                <Button type="button" variant="outline" id="reset-button" onClick={handleReset}>
                  Reset Form
                </Button>
              </div>
            </form>

            {/* Submitted Data Display */}
            {submitted && (
              <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-md">
                <h4 className="font-medium text-success-foreground mb-2">Form Submitted Successfully!</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Gender:</strong> {formData.gender}</p>
                  <p><strong>Country:</strong> {formData.country}</p>
                  <p><strong>Hobbies:</strong> {formData.hobbies.join(", ") || "None selected"}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Forms;