
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const Hero = () => {
  const [dragOver, setDragOver] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleFileUpload = (file: File) => {
    if (!isAuthenticated) {
      toast("Please login to upload your first bill for free!");
      return;
    }
    
    // Check if user has already used their free upload
    const hasUsedFreeUpload = localStorage.getItem("hasUsedFreeUpload");
    const userCoins = parseInt(localStorage.getItem("userCoins") || "0");
    
    if (hasUsedFreeUpload && userCoins === 0) {
      toast("You need coins to upload more bills. Please upgrade your plan!");
      return;
    }
    
    // Process the upload
    toast("Processing your bill... This may take a moment.");
    
    // Simulate processing
    setTimeout(() => {
      if (!hasUsedFreeUpload) {
        localStorage.setItem("hasUsedFreeUpload", "true");
        toast("Your first upload is free! Bill processed successfully.");
      } else {
        const newCoins = userCoins - 1;
        localStorage.setItem("userCoins", newCoins.toString());
        toast(`Bill processed successfully! You have ${newCoins} coins remaining.`);
      }
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

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
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-12">
          <Link to="/signup">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Upload Section */}
        <Card 
          className={`p-8 max-w-2xl mx-auto border-2 border-dashed transition-all duration-300 ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <div className="text-center">
            <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Your First Bill Free!
            </h3>
            <p className="text-gray-600 mb-6">
              Drag and drop your receipt or click to browse
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button 
                as="span"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer"
              >
                Choose File
              </Button>
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supports JPG, PNG, PDF files
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
