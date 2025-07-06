
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "How does the AI warranty detection work?",
    answer: "Our AI analyzes your receipt images and PDFs to extract product information, purchase dates, and warranty terms. It recognizes text, identifies brands, and matches warranty periods from our comprehensive database."
  },
  {
    question: "What file formats can I upload?",
    answer: "You can upload JPG, PNG, PDF, and HEIC files. Our AI works with photos taken on your phone or scanned documents."
  },
  {
    question: "How accurate is the warranty extraction?",
    answer: "Our AI has over 95% accuracy for clear receipts. If something isn't detected correctly, you can easily edit the information manually."
  },
  {
    question: "When will I receive warranty reminders?",
    answer: "We send reminders 30 days, 7 days, and 1 day before your warranty expires. You can customize these notification timings in your settings."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade encryption to protect your data. Your receipts and warranty information are stored securely and never shared with third parties."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! You can upgrade, downgrade, or cancel your subscription at any time. There are no long-term commitments."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about WarrantySafe
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
