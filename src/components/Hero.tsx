
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Never lose track of your{" "}
          <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            warranties
          </span>{" "}
          again.
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in">
          Upload your bills. We'll track your warranty — start to finish.
          Get automatic reminders before expiry and access official support links instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Link to="/signup">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
          >
            Watch Demo
          </Button>
        </div>
        
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <p className="text-gray-600 font-medium">Demo Video Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
