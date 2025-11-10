import { clsx } from 'clsx'
export function Badge({ children, color='slate' }: {children: React.ReactNode; color?: 'success'|'danger'|'slate'}) {
  const map = { success:'bg-green-100 text-success', danger:'bg-red-100 text-danger', slate:'bg-slate-100 text-slate-700' }
  return <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', map[color])}>{children}</span>
}
