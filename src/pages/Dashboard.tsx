
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Bell, Calendar, Home, Coins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

// Mock warranty data
const mockWarranties = [
  {
    id: 1,
    productName: "MacBook Pro 16\"",
    brand: "Apple",
    purchaseDate: "2024-01-15",
    warrantyStart: "2024-01-15",
    warrantyEnd: "2025-01-15",
    supportUrl: "https://support.apple.com",
    status: "active"
  },
  {
    id: 2,
    productName: "Samsung 65\" QLED TV",
    brand: "Samsung",
    purchaseDate: "2023-11-20",
    warrantyStart: "2023-11-20",
    warrantyEnd: "2024-11-20",
    supportUrl: "https://support.samsung.com",
    status: "expiring"
  },
  {
    id: 3,
    productName: "Dyson V15 Vacuum",
    brand: "Dyson",
    purchaseDate: "2022-06-10",
    warrantyStart: "2022-06-10",
    warrantyEnd: "2024-06-10",
    supportUrl: "https://support.dyson.com",
    status: "expired"
  }
];

const Dashboard = () => {
  const [warranties, setWarranties] = useState(mockWarranties);
  const [filter, setFilter] = useState("all");
  const [userCoins, setUserCoins] = useState(0);
  const [hasUsedFreeUpload, setHasUsedFreeUpload] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    // Initialize coins for new users
    const coins = localStorage.getItem("userCoins");
    if (!coins) {
      localStorage.setItem("userCoins", "5");
      setUserCoins(5);
    } else {
      setUserCoins(parseInt(coins));
    }
    
    const freeUploadUsed = localStorage.getItem("hasUsedFreeUpload");
    setHasUsedFreeUpload(!!freeUploadUsed);
  }, [navigate]);

  const handleFileUpload = (file: File) => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    if (!hasUsedFreeUpload) {
      toast.success("Processing your free upload...");
      setTimeout(() => {
        localStorage.setItem("hasUsedFreeUpload", "true");
        setHasUsedFreeUpload(true);
        toast.success("Bill processed successfully! Your first upload was free.");
      }, 2000);
    } else if (userCoins > 0) {
      toast.success("Processing your upload...");
      setTimeout(() => {
        const newCoins = userCoins - 1;
        localStorage.setItem("userCoins", newCoins.toString());
        setUserCoins(newCoins);
        toast.success(`Bill processed successfully! You have ${newCoins} coins remaining.`);
      }, 2000);
    } else {
      toast.error("You need coins to upload more bills. Please upgrade your plan!");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (warranty: any) => {
    const daysRemaining = getDaysRemaining(warranty.warrantyEnd);
    
    if (daysRemaining < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (daysRemaining <= 30) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">Expiring Soon</Badge>;
    } else {
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    }
  };

  const filteredWarranties = warranties.filter(warranty => {
    if (filter === "all") return true;
    const daysRemaining = getDaysRemaining(warranty.warrantyEnd);
    
    if (filter === "active") return daysRemaining > 30;
    if (filter === "expiring") return daysRemaining <= 30 && daysRemaining >= 0;
    if (filter === "expired") return daysRemaining < 0;
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {userEmail}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-green-100 px-3 py-2 rounded-lg">
                  <Coins className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">{userCoins} coins</span>
                </div>
                <Link to="/upgrade">
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                    Get More Coins
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Upload Section */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-dashed border-blue-300">
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {!hasUsedFreeUpload ? "Upload Your First Bill Free!" : `Upload a New Receipt (1 coin)`}
              </h3>
              <p className="text-gray-600 mb-4">
                {!hasUsedFreeUpload 
                  ? "Your first upload is completely free!" 
                  : userCoins > 0 
                    ? "Each additional upload costs 1 coin (Max 5MB)"
                    : "You need coins to upload more bills"
                }
              </p>
              {(userCoins > 0 || !hasUsedFreeUpload) ? (
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
                    >
                      Choose File
                    </Button>
                  </label>
                </>
              ) : (
                <Link to="/upgrade">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                    Get More Coins
                  </Button>
                </Link>
              )}
            </div>
          </Card>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" ? "bg-gradient-to-r from-blue-500 to-green-500 text-white" : ""}
            >
              All Warranties
            </Button>
            <Button 
              onClick={() => setFilter("active")}
              variant={filter === "active" ? "default" : "outline"}
              className={filter === "active" ? "bg-green-500 text-white" : ""}
            >
              Active
            </Button>
            <Button 
              onClick={() => setFilter("expiring")}
              variant={filter === "expiring" ? "default" : "outline"}
              className={filter === "expiring" ? "bg-orange-500 text-white" : ""}
            >
              Expiring Soon
            </Button>
            <Button 
              onClick={() => setFilter("expired")}
              variant={filter === "expired" ? "default" : "outline"}
              className={filter === "expired" ? "bg-red-500 text-white" : ""}
            >
              Expired
            </Button>
          </div>

          {/* Warranties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWarranties.map((warranty) => (
              <Card key={warranty.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {warranty.productName}
                    </h3>
                    <p className="text-gray-600">{warranty.brand}</p>
                  </div>
                  {getStatusBadge(warranty)}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Purchased: {new Date(warranty.purchaseDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Bell className="w-4 h-4 mr-2" />
                    Expires: {new Date(warranty.warrantyEnd).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Home className="w-4 h-4 mr-2" />
                    {Math.max(0, getDaysRemaining(warranty.warrantyEnd))} days remaining
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.open(warranty.supportUrl, "_blank")}
                >
                  Visit Support Page
                </Button>
              </Card>
            ))}
          </div>

          {filteredWarranties.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No warranties found</h3>
              <p className="text-gray-600">Upload your first receipt to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
