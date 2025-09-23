import { Link } from "react-router-dom";

export const MiniFooter = () => {
  return (
    <footer className="bg-header-bg mt-8 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-header-fg text-sm">
          ✨ DARKLOVERBOI PRESENCE – Testing Website for Free ✨
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Created by{" "}
          <span className="text-primary font-semibold">Shebin K Babu (Ben)</span>
          {" "}• Co-Developer:{" "}
          <span className="text-accent font-semibold">Rakshitha M</span>
          {" "}• Mentor:{" "}
          <span className="text-success font-semibold">Shreedhar Sir</span>
        </p>
        <div className="mt-2">
          <Link 
            to="/credits" 
            className="text-primary hover:text-primary-hover text-xs underline"
            id="full-credits-link"
          >
            View Full Credits
          </Link>
        </div>
      </div>
    </footer>
  );
};