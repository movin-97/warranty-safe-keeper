import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

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
    cta: "Get Started Free",
    popular: false,
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
    cta: "Upgrade to Gold",
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
    cta: "Go Platinum",
    popular: false,
    color: "purple"
  }
};

export const Upgrade = () => {
  const [isYearly, setIsYearly] = useState(false);

  const getColorClasses = (color: string, popular: boolean) => {
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
      yellow: "bg-yellow-500", 
      purple: "bg-purple-500"
    };
    return colorClasses[color as keyof typeof colorClasses];
  };

  const getButtonClasses = (color: string, popular: boolean) => {
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
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that's right for you. Upgrade or downgrade at any time.
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              
              <Link to={plan.name === 'Silver' ? '/signup' : '/upgrade'} className="w-full">
                <Button 
                  className={`w-full py-3 font-semibold ${getButtonClasses(plan.color, plan.popular)}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I switch plans anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and bank transfers for yearly plans.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Our Silver plan is free forever. You can also try Gold or Platinum with a 14-day free trial.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">Yes, we offer a 30-day money-back guarantee for all paid plans, no questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

