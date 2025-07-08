import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Upload, Bell, Calendar, Home, X, FileText, Image as ImageIcon, Save, Settings, Phone, Mail, MessageSquare, Download, ExternalLink, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import Tesseract from 'tesseract.js';

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [extractedDetails, setExtractedDetails] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    whatsapp: false,
    email: true,
    phone: false
  });
  const [currentPlan, setCurrentPlan] = useState("silver");
  const [imageCompressions, setImageCompressions] = useState<any[]>([]);
  const [pdfCompressions, setPdfCompressions] = useState<any[]>([]);
  const [shortenedUrls, setShortenedUrls] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
    
    const savedPlan = localStorage.getItem("userPlan");
    if (savedPlan) {
      setCurrentPlan(savedPlan);
    }

    // Load compression and URL data
    setImageCompressions(JSON.parse(localStorage.getItem("imageCompressions") || "[]"));
    setPdfCompressions(JSON.parse(localStorage.getItem("pdfCompressions") || "[]"));
    setShortenedUrls(JSON.parse(localStorage.getItem("shortenedUrls") || "[]"));
  }, [navigate]);

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    try {
      if (file.type.startsWith('image/')) {
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        
        // Extract warranty details from OCR text
        const productMatch = text.match(/(?:product|item):\s*(.+)/i);
        const brandMatch = text.match(/(?:brand|manufacturer):\s*(.+)/i);
        const dateMatch = text.match(/(?:date|purchased):\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
        const priceMatch = text.match(/(?:\$|price):\s*(\d+\.?\d*)/i);
        
        const details = {
          productName: productMatch?.[1]?.trim() || file.name.replace(/\.[^/.]+$/, ""),
          brand: brandMatch?.[1]?.trim() || "Unknown Brand",
          purchaseDate: dateMatch?.[1] || new Date().toISOString().split('T')[0],
          price: priceMatch?.[1] || "0.00",
          warrantyPeriod: "1 year",
          supportUrl: "",
          extractedText: text
        };
        
        setExtractedDetails(details);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error("Failed to analyze file");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createImagePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
    } else {
      setUploadedImageUrl(null);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadedFile(file);
    createImagePreview(file);
    analyzeFile(file);
    toast.success("Processing your file...");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setExtractedDetails(null);
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    toast.success("File removed successfully");
  };

  const saveWarrantyInfo = () => {
    if (!extractedDetails) return;
    
    const newWarranty = {
      id: warranties.length + 1,
      productName: extractedDetails.productName,
      brand: extractedDetails.brand,
      purchaseDate: extractedDetails.purchaseDate,
      warrantyStart: extractedDetails.purchaseDate,
      warrantyEnd: new Date(new Date(extractedDetails.purchaseDate).setFullYear(
        new Date(extractedDetails.purchaseDate).getFullYear() + 1
      )).toISOString().split('T')[0],
      supportUrl: extractedDetails.supportUrl || "",
      status: "active"
    };
    
    setWarranties([...warranties, newWarranty]);
    toast.success("Warranty information saved successfully!");
    
    // Clear the upload state
    removeFile();
  };

  const updateNotificationSetting = (type: string, value: boolean) => {
    const newSettings = { ...notificationSettings, [type]: value };
    setNotificationSettings(newSettings);
    localStorage.setItem("notificationSettings", JSON.stringify(newSettings));
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${value ? 'enabled' : 'disabled'}`);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      <div className="pt-16">
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, {userEmail}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-slate-600">
                  {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="warranties" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
              <TabsTrigger value="warranties">Warranties</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="pdfs">PDFs</TabsTrigger>
              <TabsTrigger value="urls">URLs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="warranties" className="space-y-8">
              {/* Upload Section */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 shadow-sm">
                <div className="text-center">
                  {!uploadedFile ? (
                    <>
                      <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Receipt</h3>
                      <p className="text-gray-600 mb-4">Upload your receipt to extract warranty information (Max 5MB)</p>
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

                      {/* Extracted Details */}
                      {isAnalyzing && (
                        <div className="text-center py-4">
                          <p className="text-gray-600">Analyzing file... Please wait.</p>
                        </div>
                      )}

                      {extractedDetails && !isAnalyzing && (
                        <Card className="p-4 bg-white">
                          <h4 className="font-semibold text-gray-900 mb-3">Extracted Information</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Product:</span>
                              <p className="text-gray-900">{extractedDetails.productName}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Brand:</span>
                              <p className="text-gray-900">{extractedDetails.brand}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Purchase Date:</span>
                              <p className="text-gray-900">{extractedDetails.purchaseDate}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Price:</span>
                              <p className="text-gray-900">${extractedDetails.price}</p>
                            </div>
                          </div>
                          <Button
                            onClick={saveWarrantyInfo}
                            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Info
                          </Button>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
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
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compressed Images</h3>
                {imageCompressions.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No compressed images yet</p>
                    <Link to="/image-compressor">
                      <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                        Compress Images
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageCompressions.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
                          <img 
                            src={item.compressedDataUrl} 
                            alt={item.fileName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 truncate">{item.fileName}</h4>
                        <p className="text-sm text-gray-600">
                          {(item.originalSize / 1024 / 1024).toFixed(2)} MB → {item.compressionLevel}% quality
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        <Button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = item.compressedDataUrl;
                            link.download = `compressed_${item.fileName}`;
                            link.click();
                          }}
                          size="sm"
                          className="w-full mt-2"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="pdfs" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compressed PDFs</h3>
                {pdfCompressions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No compressed PDFs yet</p>
                    <Link to="/pdf-compressor">
                      <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white">
                        Compress PDFs
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pdfCompressions.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                              <FileText className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.fileName}</h4>
                              <p className="text-sm text-gray-600">
                                {(item.originalSize / 1024 / 1024).toFixed(2)} MB → {item.compressionLevel}% quality
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = item.compressedUrl;
                              link.download = `compressed_${item.fileName}`;
                              link.click();
                            }}
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="urls" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Shortened URLs</h3>
                {shortenedUrls.length === 0 ? (
                  <div className="text-center py-8">
                    <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No shortened URLs yet</p>
                    <Link to="/url-shortener">
                      <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                        Shorten URLs
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {shortenedUrls.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Original URL:</span>
                              <Button
                                onClick={() => copyToClipboard(item.originalUrl)}
                                size="sm"
                                variant="ghost"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded truncate">
                              {item.originalUrl}
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Short URL:</span>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => copyToClipboard(item.shortenedUrl)}
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => window.open(item.shortenedUrl, '_blank')}
                                  size="sm"
                                  variant="ghost"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                              {item.shortenedUrl}
                            </p>
                          </div>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
                            <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                            <span>Clicks: {item.clicks}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              {/* Notification Settings */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                </div>
                <p className="text-gray-600 mb-6">Manage how you receive warranty reminders</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp Notifications</p>
                        <p className="text-sm text-gray-600">Receive reminders via WhatsApp</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.whatsapp}
                      onCheckedChange={(checked) => updateNotificationSetting('whatsapp', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive reminders via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) => updateNotificationSetting('email', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Phone Notifications</p>
                        <p className="text-sm text-gray-600">Receive reminders via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.phone}
                      onCheckedChange={(checked) => updateNotificationSetting('phone', checked)}
                    />
                  </div>
                </div>
              </Card>

              {/* Subscription Plan */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription Plan</h3>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 capitalize">{currentPlan} Plan</h4>
                      <p className="text-sm text-gray-600">
                        {currentPlan === 'silver' && 'Free plan with basic features'}
                        {currentPlan === 'gold' && 'Premium plan with advanced features'}
                        {currentPlan === 'platinum' && 'Ultimate plan with all features'}
                      </p>
                    </div>
                    <Badge 
                      className={
                        currentPlan === 'silver' ? 'bg-gray-500' :
                        currentPlan === 'gold' ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }
                    >
                      {currentPlan.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <h5 className="font-medium text-gray-900">Plan Features:</h5>
                  {currentPlan === 'silver' && (
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Upload up to 10 receipts</li>
                      <li>• Basic warranty tracking</li>
                      <li>• Email notifications</li>
                      <li>• Basic compression (50%)</li>
                      <li>• Free URL shortening</li>
                    </ul>
                  )}
                  {currentPlan === 'gold' && (
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Upload up to 100 receipts</li>
                      <li>• Advanced warranty tracking</li>
                      <li>• All notification types</li>
                      <li>• Premium compression (80%)</li>
                      <li>• Priority support</li>
                    </ul>
                  )}
                  {currentPlan === 'platinum' && (
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Unlimited receipt uploads</li>
                      <li>• Advanced AI processing</li>
                      <li>• All notification types</li>
                      <li>• Premium compression (80%)</li>
                      <li>• 24/7 priority support</li>
                      <li>• Custom integrations</li>
                    </ul>
                  )}
                </div>

                {currentPlan === 'silver' && (
                  <Link to="/upgrade">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                      Upgrade Plan
                    </Button>
                  </Link>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
