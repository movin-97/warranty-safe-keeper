
import { Upload, Bell, Calendar, Home } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Upload Bills Easily",
    description: "Simply upload photos or PDFs of your receipts. Our AI handles the rest automatically.",
  },
  {
    icon: Calendar,
    title: "AI Warranty Detection",
    description: "Advanced AI extracts warranty information, dates, and product details instantly.",
  },
  {
    icon: Bell,
    title: "Auto Reminder Before Expiry",
    description: "Get timely notifications before your warranties expire. Never miss a claim again.",
  },
  {
    icon: Home,
    title: "Warranty Support Links",
    description: "Access official brand support pages and warranty claim forms with one click.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage warranties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From upload to expiry, we've got your warranty management covered with intelligent automation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
