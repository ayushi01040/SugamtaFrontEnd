export default function Navbar() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      {/* brand */}
      <div className="flex items-center gap-2">
        {/* simple placeholder logo */}
        <div className="size-7 rounded-lg bg-blue-600 grid place-items-center text-white font-bold">S</div>
        <span className="font-semibold text-slate-800">Sugamta</span>
      </div>

      {/* profile dropdown (static for now) */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">SuperAdmin</span>
        <div className="size-8 rounded-full bg-slate-200 grid place-items-center">👤</div>
      </div>
    </header>
  );
}