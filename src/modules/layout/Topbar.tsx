export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold">Sistema de Alquiler</h1>
        <p className="text-sm text-muted">Universidad Compensar • 2025</p>
      </div>
      <div className="flex items-center gap-3">
        <input placeholder="Buscar…" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"/>
        <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/100?img=3" alt="avatar"/>
      </div>
    </header>
  )
}
