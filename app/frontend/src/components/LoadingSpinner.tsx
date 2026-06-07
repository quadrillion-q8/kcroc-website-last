interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  message = 'Loading...',
  fullScreen = true,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-transparent ${fullScreen ? 'min-h-[60vh]' : 'p-8'}`}>
      
      {/* Premium Tech Dual-Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer Emerald Ring */}
        <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-emerald-500 animate-spin"></div>
        {/* Inner Blue Ring (Spins reverse) */}
        <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>

      {/* Pulsing Message */}
      {message && (
        <p className="mt-4 text-slate-500 font-medium animate-pulse tracking-wide">
          {message}
        </p>
      )}
      
    </div>
  );
}
