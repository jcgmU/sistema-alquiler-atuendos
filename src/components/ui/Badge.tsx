import { clsx } from 'clsx'
export function Badge({ children, color = 'slate' }: { children: React.ReactNode; color?: 'success' | 'danger' | 'slate' | 'warning' }) {
  const map = { success: 'bg-green-100 text-green-800', danger: 'bg-red-100 text-red-800', slate: 'bg-slate-100 text-slate-700', warning: 'bg-yellow-100 text-yellow-800' }
  return <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', map[color])}>{children}</span>
}
