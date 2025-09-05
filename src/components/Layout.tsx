import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", id: "nav-home" },
    { path: "/login", label: "Login", id: "nav-login" },
    { path: "/forms", label: "Forms", id: "nav-forms" },
    { path: "/links", label: "Links", id: "nav-links" },
    { path: "/tables", label: "Tables", id: "nav-tables" },
    { path: "/upload-download", label: "Upload/Download", id: "nav-upload" },
    { path: "/alerts", label: "Alerts", id: "nav-alerts" },
    { path: "/dynamic", label: "Dynamic Content", id: "nav-dynamic" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-header-bg text-header-fg shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold" id="site-title">
            DLB Software Testing Web
          </h1>
          <p className="text-sm opacity-90 mt-1" id="site-subtitle">
            Selenium Automation Practice Website
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-nav-bg border-b border-nav-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                id={item.id}
                className={`px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer - DARKLOVERBOI PRESENCE */}
      <footer className="bg-header-bg mt-16 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-header-fg mb-2">
              ✨ DARKLOVERBOI PRESENCE – Testing Website for Free ✨
            </h2>
          </div>

          {/* Credits Section */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-header-fg mb-4">Credits</h3>
            <div className="space-y-3">
              <div>
                <span className="text-3xl font-bold text-primary">Developed by: Shebin K Babu (Ben)</span>
              </div>
              <div>
                <span className="text-xl font-semibold text-accent">Co Developer: Rakshitha M</span>
              </div>
              <div className="text-lg">
                <span className="text-success font-semibold">Teacher & Mentor: Shreedhar Sir</span>
                <br />
                <span className="text-header-fg text-sm italic">
                  (Special thanks for teaching me testing – this website is my gratitude and return gift)
                </span>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h3 className="text-xl font-semibold text-header-fg mb-4">About Me</h3>
            <div className="text-header-fg space-y-3 leading-relaxed">
              <p>
                Hi, I'm <span className="text-primary font-semibold">Shebin (Ben)</span>. 
                I created this project to help students and teachers practice software testing in one place.
              </p>
              <p>
                I noticed many people had to jump across multiple websites to perform simple testing tasks. 
                To make it easier, I built this all-in-one free testing practice website.
              </p>
              <p>
                If you are willing, you can support/donate through my Instagram: 
                <span className="text-accent font-semibold"> @darkloverboi</span>
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-header-fg mb-4">Contact</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-header-fg">
              <a 
                href="https://www.instagram.com/darkloverboi?igsh=OXR1eWJ3enppaTYy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
                id="contact-instagram"
              >
                📩 Instagram: @darkloverboi
              </a>
              <a 
                href="https://www.linkedin.com/in/shebink1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                id="contact-linkedin"
              >
                🔗 LinkedIn: Shebin K Babu
              </a>
              <a 
                href="mailto:kshebin86@gmail.com"
                className="flex items-center gap-2 hover:text-success transition-colors"
                id="contact-email"
              >
                📧 Email: kshebin86@gmail.com
              </a>
            </div>
          </div>

          {/* Closing Note */}
          <div className="text-center border-t border-nav-border pt-6">
            <p className="text-header-fg font-medium">
              Wishing all learners to skill up 🚀 Congratulations on selecting this website for your testing journey.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              © 2024 DLB Software Testing Web - Built for Selenium Automation Practice
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};