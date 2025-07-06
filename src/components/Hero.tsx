
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Eye, EyeOff, X, FileText, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface WarrantyDetails {
  productName: string;
  brand: string;
  purchaseDate: string;
  warrantyEnd: string;
  price: string;
  category: string;
  supportUrl: string;
  warrantyPeriod: string;
}

export const Hero = () => {
  const [dragOver, setDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [warrantyDetails, setWarrantyDetails] = useState<WarrantyDetails | null>(null);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isPaidUser = localStorage.getItem("userPlan") === "premium";

  // Simple text extraction for demo purposes
  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For demo purposes, we'll return some mock extracted text
        // In a real app, you'd use OCR or PDF parsing here
        resolve(`Receipt from ${file.name} - Sample extracted text for warranty analysis`);
      };
      reader.readAsText(file);
    });
  };

  // Mock AI analysis function that uses actual file data
  const analyzeFile = async (file: File): Promise<WarrantyDetails> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract some basic info from the actual file
    const extractedText = await extractTextFromFile(file);
    console.log("Analyzing file:", file.name, "Size:", file.size, "Type:", file.type);
    
    // Mock analysis based on file name and type for demo
    const fileName = file.name.toLowerCase();
    let productName = "Unknown Product";
    let brand = "Unknown Brand";
    
    // Simple pattern matching for demo
    if (fileName.includes('apple') || fileName.includes('iphone') || fileName.includes('macbook')) {
      productName = "MacBook Pro 16-inch";
      brand = "Apple";
    } else if (fileName.includes('samsung')) {
      productName = "Samsung Galaxy S24";
      brand = "Samsung";
    } else if (fileName.includes('laptop')) {
      productName = "Gaming Laptop";
      brand = "Dell";
    } else {
      // Use file name as product name for demo
      productName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      brand = "Generic Brand";
    }
    
    const today = new Date();
    const warrantyEnd = new Date(today);
    warrantyEnd.setFullYear(today.getFullYear() + 1);
    
    return {
      productName,
      brand,
      purchaseDate: today.toISOString().split('T')[0],
      warrantyEnd: warrantyEnd.toISOString().split('T')[0],
      price: "$" + Math.floor(Math.random() * 2000 + 500) + ".00",
      category: "Electronics",
      supportUrl: `https://support.${brand.toLowerCase().replace(' ', '')}.com`,
      warrantyPeriod: "1 Year Limited Warranty"
    };
  };

  const createImagePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
    } else {
      setUploadedImageUrl(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadedFile(file);
    createImagePreview(file);
    setIsAnalyzing(true);
    
    try {
      const details = await analyzeFile(file);
      setWarrantyDetails(details);
      toast.success("File analyzed successfully!");
    } catch (error) {
      toast.error("Failed to analyze file. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
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
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setWarrantyDetails(null);
    setShowAllDetails(false);
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    toast.success("File removed successfully");
  };

  const toggleDetailsView = () => {
    if (!isAuthenticated) {
      toast.error("Please login to see full details");
      return;
    }
    if (!isPaidUser && showAllDetails) {
      toast.error("Upgrade to premium to see all details");
      return;
    }
    setShowAllDetails(!showAllDetails);
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
            {!uploadedFile ? (
              <>
                <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isAnalyzing ? "Analyzing Your Bill..." : "Upload Your Bill & See Demo!"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {isAnalyzing 
                    ? "Our AI is extracting warranty details..." 
                    : "Drag and drop your receipt or click to browse (Max 5MB)"
                  }
                </p>
                
                {!isAnalyzing && (
                  <>
                    <input
                      type="file"
                      accept="*/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer"
                        type="button"
                        asChild
                      >
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </>
                )}
                
                {isAnalyzing && (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                )}
                
                <p className="text-sm text-gray-500 mt-4">
                  Supports all file types • Max size: 5MB
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {uploadedImageUrl ? (
                      <img 
                        src={uploadedImageUrl} 
                        alt="Uploaded file" 
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center">
                        {uploadedFile.type.startsWith('image/') ? (
                          <ImageIcon className="w-8 h-8 text-blue-600" />
                        ) : (
                          <FileText className="w-8 h-8 text-blue-600" />
                        )}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={removeFile}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {isAnalyzing && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="text-blue-600">Analyzing file...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Warranty Details Display */}
        {warrantyDetails && (
          <Card className="p-6 max-w-2xl mx-auto mt-8 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Warranty Details Extracted</h3>
              <Button
                onClick={toggleDetailsView}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {showAllDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showAllDetails ? "Hide Details" : "Show All"}
              </Button>
            </div>
            
            <div className="space-y-3 text-left">
              <div>
                <span className="font-semibold">Product:</span> {warrantyDetails.productName}
              </div>
              <div>
                <span className="font-semibold">Brand:</span> {warrantyDetails.brand}
              </div>
              <div>
                <span className="font-semibold">Purchase Date:</span> {warrantyDetails.purchaseDate}
              </div>
              
              {showAllDetails && (isAuthenticated && isPaidUser) && (
                <>
                  <div>
                    <span className="font-semibold">Warranty Expires:</span> {warrantyDetails.warrantyEnd}
                  </div>
                  <div>
                    <span className="font-semibold">Price:</span> {warrantyDetails.price}
                  </div>
                  <div>
                    <span className="font-semibold">Category:</span> {warrantyDetails.category}
                  </div>
                  <div>
                    <span className="font-semibold">Warranty Period:</span> {warrantyDetails.warrantyPeriod}
                  </div>
                  <div>
                    <span className="font-semibold">Support:</span> 
                    <a href={warrantyDetails.supportUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                      Visit Support Page
                    </a>
                  </div>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="bg-yellow-100 p-3 rounded-lg mt-4">
                  <p className="text-sm text-yellow-800">
                    <Link to="/login" className="font-semibold text-blue-600 hover:underline">Login</Link> to see complete warranty details and get reminders!
                  </p>
                </div>
              )}
              
              {isAuthenticated && !isPaidUser && showAllDetails && (
                <div className="bg-blue-100 p-3 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    <Link to="/upgrade" className="font-semibold text-blue-600 hover:underline">Upgrade to Premium</Link> to access all warranty details and advanced features!
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};
