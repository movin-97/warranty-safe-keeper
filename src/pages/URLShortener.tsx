
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Link as LinkIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const generateShortUrl = (url: string): string => {
    // Simple short URL generation (in real app, you'd use a proper service)
    const shortCode = Math.random().toString(36).substring(2, 8);
    return `https://wsafe.ly/${shortCode}`;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isValidUrl(originalUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const shortUrl = generateShortUrl(originalUrl);
      setShortenedUrl(shortUrl);
      
      // Save to dashboard if authenticated
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated) {
        const savedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");
        const existingUrl = savedUrls.find((item: any) => item.originalUrl === originalUrl);
        
        if (!existingUrl) {
          const newUrl = {
            id: Date.now(),
            originalUrl,
            shortenedUrl: shortUrl,
            createdAt: new Date().toISOString(),
            clicks: 0
          };
          savedUrls.push(newUrl);
          localStorage.setItem("shortenedUrls", JSON.stringify(savedUrls));
        }
      }
      
      toast.success("URL shortened successfully!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy URL");
    }
  };

  const handleReset = () => {
    setOriginalUrl("");
    setShortenedUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">URL Shortener</h1>
            <p className="text-xl text-gray-600">Create short, memorable links - completely free!</p>
          </div>

          <Card className="p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your long URL
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="url"
                    placeholder="https://example.com/very-long-url-that-needs-shortening"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleShorten}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                  >
                    {isProcessing ? "Shortening..." : "Shorten URL"}
                  </Button>
                </div>
              </div>

              {shortenedUrl && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your shortened URL is ready!</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Original URL:</label>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white p-3 rounded border">
                        <LinkIcon className="w-4 h-4" />
                        <span className="truncate">{originalUrl}</span>
                        <a href={originalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shortened URL:</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={shortenedUrl}
                          readOnly
                          className="flex-1 bg-white border-green-300"
                        />
                        <Button onClick={handleCopy} variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button onClick={handleReset} variant="outline">
                      Shorten Another URL
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="text-center text-sm text-gray-600">
            <p>Free service with no limits • No account required • Works forever</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
