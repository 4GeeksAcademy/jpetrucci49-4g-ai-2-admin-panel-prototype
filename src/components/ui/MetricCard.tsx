import type { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string
  hint: string
  icon: ReactNode
}

export function MetricCard({ title, value, hint, icon }: MetricCardProps) {
  return (
    <article className="shadow-soft-panel rounded-2xl border border-slate-200/80 bg-white/85 p-5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</p>
        <div className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{hint}</p>
    </article>
  )
}
