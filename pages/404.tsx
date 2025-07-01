import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout 
      title="Page Not Found - GNG Engine"
      description="The page you're looking for doesn't exist. Return to GNG Engine's homepage to discover Australian college athletes."
    >
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-aussie-green to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-4xl">404</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-montserrat">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-aussie-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Return to Homepage
            </Link>
            
            <div className="text-gray-500">
              <p>Or try one of these pages:</p>
              <div className="flex justify-center space-x-4 mt-2">
                <Link href="/directory" className="text-aussie-green hover:text-green-700 transition-colors">
                  Directory
                </Link>
                <Link href="/about" className="text-aussie-green hover:text-green-700 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 