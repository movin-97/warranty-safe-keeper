
export const Demo = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How WarrantySafe Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to never lose track of your warranties
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Upload your receipt</h3>
                  <p className="text-gray-700">Take a photo or upload a PDF of your purchase receipt</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI extracts warranty details</h3>
                  <p className="text-gray-700">Our AI automatically identifies product, brand, and warranty information</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get reminders and support</h3>
                  <p className="text-gray-700">Receive timely reminders and access official brand support links</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
