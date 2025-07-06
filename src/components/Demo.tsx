
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
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-24 -translate-x-24 opacity-50"></div>
            
            <div className="relative space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload your receipt</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Simply drag and drop your purchase receipt or take a photo. Our AI supports all file formats including PDF, JPG, PNG, and more.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-green-300"></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">AI extracts warranty details</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our advanced AI automatically identifies product information, brand details, purchase date, warranty period, and extracts all relevant warranty terms.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <div className="w-24 h-24 bg-green-50 rounded-xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gradient-to-b from-green-300 to-purple-300"></div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get reminders and support</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Receive timely email and push notifications before your warranty expires. Access official brand support links and warranty claim processes instantly.
                  </p>
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <div className="w-24 h-24 bg-purple-50 rounded-xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879l-1.414 1.414A3 3 0 002 9.5V13H1V9.5a4 4 0 011.172-2.828z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Ready to never lose a warranty again?</h4>
                <p className="text-blue-100 mb-6">Join thousands of users who trust WarrantySafe with their warranties</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
