import type { PropsWithChildren } from 'react'
import { clsx } from 'clsx'

export default function Card({ children, className }: PropsWithChildren<{className?: string}>) {
  return <div className={clsx('bg-card rounded-2xl shadow-soft p-5', className)}>{children}</div>
}
