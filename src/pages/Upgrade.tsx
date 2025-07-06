
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const features = {
  free: [
    "Upload up to 10 bills",
    "Basic warranty tracking",
    "Email reminders",
    "Mobile app access"
  ],
  premium: [
    "Unlimited bill uploads",
    "Advanced AI processing",
    "Cloud backup & sync",
    "Priority support",
    "Multiple user profiles",
    "Export & reporting",
    "Custom reminder settings",
    "Warranty analytics"
  ]
};

const Upgrade = () => {
  const handleUpgrade = () => {
    toast("Upgrade feature coming soon! Payment integration will be added.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WarrantySafe</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-gray-600">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600">
            Unlock unlimited warranty tracking and advanced features
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <Card className="p-8 relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600 ml-1">/forever</span>
              </div>
              <p className="text-gray-600">Your current plan</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card className="p-8 relative border-2 border-blue-500 scale-105">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white">
              Recommended
            </Badge>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">$9</span>
                <span className="text-gray-600 ml-1">/month</span>
              </div>
              <p className="text-gray-600">Everything you need</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3"
            >
              Upgrade to Premium
            </Button>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why upgrade to Premium?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unlimited Storage</h3>
              <p className="text-gray-600 text-sm">Upload as many receipts as you need without any limits</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Faster Processing</h3>
              <p className="text-gray-600 text-sm">Priority AI processing for instant warranty extraction</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 text-sm">Detailed reports and insights about your warranties</p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            🔒 30-day money-back guarantee • Cancel anytime • No long-term commitment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
