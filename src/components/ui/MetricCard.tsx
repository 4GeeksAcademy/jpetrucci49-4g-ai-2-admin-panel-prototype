import type { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string
  hint: string
  icon: ReactNode
}

export function MetricCard({ title, value, hint, icon }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</p>
        <div className="rounded-xl bg-teal-100 p-2 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{hint}</p>
    </article>
  )
}
