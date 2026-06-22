import { AlertTriangle, Bot, CircleDollarSign, TicketPercent } from 'lucide-react'
import { MetricCard } from '../ui/MetricCard'

interface DashboardSectionProps {
  revenueThisMonth: number
  totalCouponLosses: number
  activeAgents: number
  failingAgents: number
  weeklyActivity: number[]
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function DashboardSection({
  revenueThisMonth,
  totalCouponLosses,
  activeAgents,
  failingAgents,
  weeklyActivity,
}: DashboardSectionProps) {
  const max = Math.max(...weeklyActivity)

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Revenue (This Month)"
          value={currency.format(revenueThisMonth)}
          hint="+12.4% from last month"
          icon={<CircleDollarSign size={18} />}
        />
        <MetricCard
          title="Discount & Coupon Losses"
          value={currency.format(totalCouponLosses)}
          hint="6.1% of total MRR"
          icon={<TicketPercent size={18} />}
        />
        <MetricCard
          title="Active Agents"
          value={String(activeAgents)}
          hint="Across all clients"
          icon={<Bot size={18} />}
        />
        <MetricCard
          title="Flagged / Failing Agents"
          value={String(failingAgents)}
          hint="2 require immediate review"
          icon={<AlertTriangle size={18} />}
        />
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-slate-100">Weekly Activity</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Chart placeholder for sessions, alerts, and task volume</p>
        </div>
        <div className="grid grid-cols-7 items-end gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          {weeklyActivity.map((value, index) => (
            <div key={`bar-${value}-${index}`} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-lg bg-gradient-to-t from-teal-500 to-cyan-400"
                style={{
                  height: `${Math.max((value / max) * 180, 16)}px`,
                }}
                aria-hidden="true"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">D{index + 1}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
