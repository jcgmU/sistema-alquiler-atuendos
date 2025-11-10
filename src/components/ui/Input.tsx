import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props}
      className={clsx(
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm',
        'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary',
        props.className
      )}
    />
  )
}
