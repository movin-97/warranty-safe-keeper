
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "WarrantySafe saved me thousands! I almost missed claiming my laptop warranty. The reminder came just in time.",
    avatar: "SJ"
  },
  {
    name: "Mike Chen",
    role: "Tech Enthusiast",
    content: "Finally, a simple way to track all my gadget warranties. The AI detection is incredibly accurate.",
    avatar: "MC"
  },
  {
    name: "Lisa Rodriguez",
    role: "Homeowner",
    content: "Managing warranties for all our appliances was a nightmare. WarrantySafe made it effortless.",
    avatar: "LR"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by thousands of users
          </h2>
          <p className="text-xl text-gray-600">
            See what our users are saying about WarrantySafe
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
