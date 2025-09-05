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

      {/* Footer */}
      <footer className="bg-muted mt-16 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground" id="footer-text">
            © 2024 DLB Software Testing Web - Built for Selenium Automation Practice
          </p>
          <p className="text-sm text-muted-foreground mt-2" id="footer-note">
            All elements include proper IDs and names for easy test automation
          </p>
        </div>
      </footer>
    </div>
  );
};