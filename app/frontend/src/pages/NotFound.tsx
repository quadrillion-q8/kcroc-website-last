import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
          <p className="text-gray-400">The page you're looking for doesn't exist or may have been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}