import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'ghost'|'danger' }

export function Button({ variant='primary', className, ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50'
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    ghost: 'bg-slate-100 hover:bg-slate-200',
    danger: 'bg-danger text-white hover:opacity-90',
  }
  return <button className={clsx(base, variants[variant], className)} {...props}/>
}
