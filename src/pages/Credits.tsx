import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Mail, Instagram, Linkedin, Code, Star } from "lucide-react";

const Credits = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="credits-title">
            ✨ DARKLOVERBOI PRESENCE ✨
          </h1>
          <h2 className="text-2xl font-semibold mb-2" id="credits-subtitle">
            Testing Website for Free
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with passion for the testing community - helping students and professionals 
            practice Selenium automation in one comprehensive platform.
          </p>
        </div>

        {/* Main Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Developer - Rakshitha */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Code className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-primary text-xl" id="rakshitha-name">
                    Rakshitha M
                  </CardTitle>
                  <CardDescription>Developer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge className="bg-primary text-primary-foreground">Primary Developer</Badge>
                <p className="text-sm text-muted-foreground">
                  The developer behind this comprehensive testing platform, built to help 
                  students and professionals practice Selenium automation efficiently.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mentor - Shreedhar Sir */}
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-warning-foreground" />
                </div>
                <div>
                  <CardTitle className="text-warning text-xl" id="shreedhar-name">
                    Shreedhar Sir
                  </CardTitle>
                  <CardDescription>Teacher & Mentor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge className="bg-warning text-warning-foreground">Mentor & Teacher</Badge>
                <p className="text-sm text-muted-foreground">
                  The inspiring teacher who taught the fundamentals of testing. 
                  This website is built as gratitude and a return gift for his guidance.
                </p>
                <div className="flex items-center gap-2 text-sm text-warning">
                  <Heart className="h-4 w-4" />
                  <span>Special thanks for teaching me testing!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">About This Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Why This Website Was Built</h3>
                <p className="text-muted-foreground">
                  This project was created to help students and teachers practice software testing in one place.
                  Many people had to jump across multiple websites to perform simple testing tasks. 
                  This all-in-one free testing practice website makes it easier for everyone.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <ul className="text-left space-y-1">
                      <li>• Comprehensive form testing elements</li>
                      <li>• Dynamic content and AJAX interactions</li>
                      <li>• File upload/download functionality</li>
                      <li>• Multiple dropdown types</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-left space-y-1">
                      <li>• Advanced testing scenarios</li>
                      <li>• Test case recording tools</li>
                      <li>• Proper element IDs for automation</li>
                      <li>• Real-world testing challenges</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Support the Project</h3>
                <p className="text-muted-foreground">
                  If you find this website helpful, feel free to share it with others 
                  who might benefit from practicing their Selenium automation skills.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Closing Message */}
        <div className="text-center py-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            🚀 Wishing all learners to skill up!
          </h2>
          <p className="text-muted-foreground text-lg">
            Congratulations on selecting this website for your testing journey.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            © 2024 DLB Software Testing Web - Built for Selenium Automation Practice
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Credits;