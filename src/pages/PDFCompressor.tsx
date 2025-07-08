
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";

const PDFCompressor = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<50 | 80>(50);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const currentPlan = localStorage.getItem("userPlan") || "silver";

  const compressPDF = async (file: File, quality: number): Promise<string> => {
    // Simulate PDF compression (in real app, you'd use a library like pdf-lib)
    return new Promise((resolve) => {
      setTimeout(() => {
        const compressedSize = file.size * (quality / 100);
        const blob = new Blob([file], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, 2000);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    setUploadedFile(file);
    toast.success("PDF uploaded successfully!");
  };

  const handleCompress = async () => {
    if (!uploadedFile) return;
    
    setIsCompressing(true);
    try {
      const level = !isAuthenticated ? 50 : (currentPlan === 'silver' ? 50 : 80);
      setCompressionLevel(level);
      
      const compressed = await compressPDF(uploadedFile, level);
      setCompressedPdfUrl(compressed);
      
      // Save to dashboard if authenticated
      if (isAuthenticated) {
        const savedCompressions = JSON.parse(localStorage.getItem("pdfCompressions") || "[]");
        const newCompression = {
          id: Date.now(),
          fileName: uploadedFile.name,
          originalSize: uploadedFile.size,
          compressedUrl: compressed,
          compressionLevel: level,
          createdAt: new Date().toISOString()
        };
        savedCompressions.push(newCompression);
        localStorage.setItem("pdfCompressions", JSON.stringify(savedCompressions));
      }
      
      toast.success(`PDF compressed to ${level}%!`);
    } catch (error) {
      toast.error("Compression failed");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedPdfUrl) return;
    
    if (!isAuthenticated || currentPlan === 'silver') {
      const link = document.createElement('a');
      link.href = compressedPdfUrl;
      link.download = `compressed_${uploadedFile?.name || 'document.pdf'}`;
      link.click();
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setCompressedPdfUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Compressor</h1>
            <p className="text-xl text-gray-600">Reduce PDF file size while maintaining readability</p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            {!uploadedFile ? (
              <div className="text-center">
                <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your PDF</h3>
                <p className="text-gray-600 mb-6">Max file size: 10MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer" asChild>
                    <span>Choose PDF</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button onClick={removeFile} variant="outline" size="sm" className="text-red-600">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleCompress}
                    disabled={isCompressing}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                  >
                    {isCompressing ? "Compressing..." : "Compress PDF"}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Results Section */}
          {compressedPdfUrl && (
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Compression Results</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Compressed PDF ({compressionLevel}% quality)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimated size: {((uploadedFile?.size || 0) * compressionLevel / 100 / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  {!isAuthenticated && compressionLevel === 80 ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Premium Quality - Login Required</p>
                      <Link to="/login">
                        <Button size="sm" variant="outline">Login to Download</Button>
                      </Link>
                    </div>
                  ) : (
                    <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="text-center text-sm text-gray-600">
                  <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link> for better compression quality
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFCompressor;
