import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Link href="/">
            <Button className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-lg h-[400px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
}
