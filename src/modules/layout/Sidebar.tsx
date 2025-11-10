import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/empleados', label: 'Empleados' },
  { to: '/prendas', label: 'Prendas' },
  { to: '/alquileres', label: 'Alquileres' },
  { to: '/lavanderia', label: 'Lavandería' },
]
export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 p-4">
      <div className="mb-6 flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white font-bold">A</div>
        <div><div className="text-sm text-muted">Atuendos</div><div className="font-semibold">Admin Panel</div></div>
      </div>
      <nav className="space-y-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end
            className={({isActive}) => clsx(
              'block rounded-xl px-3 py-2 text-sm',
              isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'
            )}
          >{l.label}</NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl bg-slate-900 p-4 text-white">
        <div className="text-sm opacity-70">Upgrade Pro</div>
        <div className="mt-1 text-lg font-semibold">$30/mes</div>
        <button className="mt-3 w-full rounded-xl bg-white/10 py-2 text-sm hover:bg-white/20">Ver beneficios</button>
      </div>
    </aside>
  )
}
