export function DashboardShell({ sidebar, topbar, children }) {
  return (
    <div className="min-h-screen bg-[#05070a] text-white flex font-sans">
      {sidebar}
      <div className="flex-1 flex flex-col min-w-0">
        {topbar}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
