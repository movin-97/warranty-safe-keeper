
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WarrantySafe</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Hi, {userEmail?.split('@')[0]}</span>
                <Button onClick={handleLogout} variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
