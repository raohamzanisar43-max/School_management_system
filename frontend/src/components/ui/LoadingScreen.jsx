export function LoadingScreen({ message = 'Syncing workspace...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 font-sans">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">{message}</p>
      </div>
    </div>
  );
}
