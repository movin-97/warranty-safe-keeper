
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const plans = {
  silver: {
    name: "Silver",
    subtitle: "Free Forever",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Perfect for getting started",
    features: [
      "Upload up to 10 receipts",
      "Basic warranty tracking",
      "Email notifications",
      "Mobile app access",
      "Community support"
    ],
    color: "gray"
  },
  gold: {
    name: "Gold",
    subtitle: "Most Popular",
    monthlyPrice: "$9",
    yearlyPrice: "$89",
    description: "For power users and families",
    features: [
      "Upload up to 100 receipts",
      "Advanced warranty tracking",
      "All notification types (Email, SMS, WhatsApp)",
      "Cloud backup & sync",
      "Priority support",
      "Export & reporting",
      "Multiple user profiles"
    ],
    popular: true,
    color: "yellow"
  },
  platinum: {
    name: "Platinum",
    subtitle: "Ultimate Experience",
    monthlyPrice: "$19",
    yearlyPrice: "$189",
    description: "For businesses and professionals",
    features: [
      "Unlimited receipt uploads",
      "Advanced AI processing",
      "All notification types",
      "24/7 priority support",
      "Custom integrations",
      "API access",
      "White-label solution",
      "Dedicated account manager"
    ],
    color: "purple"
  }
};

const Upgrade = () => {
  const [isYearly, setIsYearly] = useState(false);

  const handleUpgrade = (planName: string) => {
    if (planName === "Silver") {
      toast("You're already on the free plan!");
      return;
    }
    toast(`${planName} plan upgrade coming soon! Payment integration will be added.`);
  };

  const getColorClasses = (color: string, popular?: boolean) => {
    const baseClasses = popular ? "border-2 scale-105" : "";
    const colorClasses = {
      gray: popular ? "border-gray-500" : "",
      yellow: popular ? "border-yellow-500" : "",
      purple: popular ? "border-purple-500" : ""
    };
    return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses]}`;
  };

  const getBadgeClasses = (color: string) => {
    const colorClasses = {
      gray: "bg-gray-500",
      yellow: "bg-gradient-to-r from-blue-500 to-green-500",
      purple: "bg-purple-500"
    };
    return colorClasses[color as keyof typeof colorClasses];
  };

  const getButtonClasses = (color: string, popular?: boolean) => {
    if (color === "gray") {
      return "bg-gray-100 hover:bg-gray-200 text-gray-900";
    }
    if (popular) {
      return "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white";
    }
    const colorClasses = {
      yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
      purple: "bg-purple-500 hover:bg-purple-600 text-white"
    };
    return colorClasses[color as keyof typeof colorClasses] || "";
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock the full potential of warranty tracking
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-green-500"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans).map(([key, plan]) => (
            <Card 
              key={key}
              className={`p-8 relative hover:shadow-lg transition-all duration-300 ${getColorClasses(plan.color, plan.popular)}`}
            >
              {plan.popular && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${getBadgeClasses(plan.color)} text-white`}>
                  {plan.subtitle}
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {plan.name === "Silver" ? "" : `/${isYearly ? 'year' : 'month'}`}
                  </span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
                {isYearly && plan.name !== "Silver" && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save ${(parseInt(plan.monthlyPrice.replace('$', '')) * 12 - parseInt(plan.yearlyPrice.replace('$', ''))).toFixed(0)} per year
                  </p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className={`w-2 h-2 rounded-full mr-3 ${plan.color === 'gray' ? 'bg-gray-400' : 'bg-green-500'}`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleUpgrade(plan.name)}
                className={`w-full py-3 font-semibold ${getButtonClasses(plan.color, plan.popular)}`}
                disabled={plan.name === "Silver"}
              >
                {plan.name === "Silver" ? "Current Plan" : `Choose ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why upgrade from Silver?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">More Storage</h3>
              <p className="text-gray-600 text-sm">Upload up to 100 receipts with Gold or unlimited with Platinum</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">All Notifications</h3>
              <p className="text-gray-600 text-sm">Get reminders via Email, SMS, and WhatsApp</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Priority Support</h3>
              <p className="text-gray-600 text-sm">Get faster responses and dedicated assistance</p>
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
