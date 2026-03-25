import React from 'react';

export default function Downloads() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Downloads</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">BoundaryEQ Pro</h2>
            <p className="text-gray-300 mb-6">
              Download the latest version of BoundaryEQ Pro. If you've purchased a license, 
              you can download updates here at any time.
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Version 1.1.0</h3>
                    <p className="text-sm text-gray-400">Latest Release</p>
                  </div>
                  <span className="text-green-500 text-sm">Latest</span>
                </div>
                
                <p className="text-gray-300 mb-4">
                  • Improved licensing system<br/>
                  • Enhanced UI performance<br/>
                  • Bug fixes and stability improvements
                </p>
                
                <div className="flex gap-4">
                  <a 
                    href="https://your-download-link.com/BoundaryEQ-1.1.0-Windows.zip"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Download for Windows
                  </a>
                  <a 
                    href="https://your-download-link.com/BoundaryEQ-1.1.0-macOS.zip"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Download for macOS
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-gray-300 mb-4">
              If you've lost your license key or need assistance, please visit your{' '}
              <a 
                href="https://app.lemonsqueezy.com/my-orders" 
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lemon Squeezy customer portal
              </a>
              {' '}to access your purchase details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
