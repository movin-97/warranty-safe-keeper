
export const Demo = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See WarrantySafe in action
          </h2>
          <p className="text-xl text-gray-600">
            Watch how easy it is to upload a receipt and track your warranty
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Upload. Process. Track.
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="text-gray-700">Upload your receipt photo or PDF</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="text-gray-700">AI extracts warranty details automatically</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="text-gray-700">Get reminders and support links</span>
                  </div>
                </div>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">📱</span>
                  </div>
                  <p className="text-gray-600 font-medium">Interactive Demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
