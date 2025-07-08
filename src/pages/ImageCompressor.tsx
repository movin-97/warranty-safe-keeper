
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";

const ImageCompressor = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<50 | 80>(50);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const currentPlan = localStorage.getItem("userPlan") || "silver";

  const compressImage = (file: File, quality: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
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

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    setUploadedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
    toast.success("Image uploaded successfully!");
  };

  const handleCompress = async () => {
    if (!uploadedFile) return;
    
    setIsCompressing(true);
    try {
      const level = !isAuthenticated ? 50 : (currentPlan === 'silver' ? 50 : 80);
      setCompressionLevel(level);
      
      const compressed = await compressImage(uploadedFile, level);
      setCompressedImageUrl(compressed);
      
      // Save to dashboard if authenticated
      if (isAuthenticated) {
        const savedCompressions = JSON.parse(localStorage.getItem("imageCompressions") || "[]");
        const newCompression = {
          id: Date.now(),
          fileName: uploadedFile.name,
          originalSize: uploadedFile.size,
          compressedDataUrl: compressed,
          compressionLevel: level,
          createdAt: new Date().toISOString()
        };
        savedCompressions.push(newCompression);
        localStorage.setItem("imageCompressions", JSON.stringify(savedCompressions));
      }
      
      toast.success(`Image compressed to ${level}%!`);
    } catch (error) {
      toast.error("Compression failed");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImageUrl) return;
    
    if (!isAuthenticated || currentPlan === 'silver') {
      const link = document.createElement('a');
      link.href = compressedImageUrl;
      link.download = `compressed_${uploadedFile?.name || 'image.jpg'}`;
      link.click();
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setCompressedImageUrl(null);
    if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Compressor</h1>
            <p className="text-xl text-gray-600">Compress your images while maintaining quality</p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            {!uploadedFile ? (
              <div className="text-center">
                <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your Image</h3>
                <p className="text-gray-600 mb-6">Support all image formats, max 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer" asChild>
                    <span>Choose Image</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={uploadedImageUrl!} alt="Uploaded" className="w-16 h-16 object-cover rounded" />
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
                    {isCompressing ? "Compressing..." : "Compress Image"}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Results Section */}
          {compressedImageUrl && (
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Compression Results</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Original Image</h4>
                  <img src={uploadedImageUrl!} alt="Original" className="w-full h-48 object-cover rounded border" />
                </div>
                
                <div className="relative">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Compressed Image ({compressionLevel}% quality)
                  </h4>
                  <div className="relative">
                    <img src={compressedImageUrl} alt="Compressed" className="w-full h-48 object-cover rounded border" />
                    {!isAuthenticated && compressionLevel === 80 && (
                      <div className="absolute inset-0 bg-gray-900/50 rounded flex items-center justify-center">
                        <div className="text-center text-white">
                          <p className="font-semibold mb-2">Premium Quality</p>
                          <Link to="/login">
                            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                              Login to Download
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                {(isAuthenticated && currentPlan === 'silver') || !isAuthenticated ? (
                  <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Compressed Image
                  </Button>
                ) : null}
                
                {!isAuthenticated && (
                  <div className="mt-4 text-sm text-gray-600">
                    <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link> for better compression quality
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
