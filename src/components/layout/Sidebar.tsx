import {
  AlertTriangle,
  Bot,
  ChartNoAxesCombined,
  FileText,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { NavSection } from '../../types/models'

interface SidebarProps {
  activeSection: NavSection
  onSelectSection: (section: NavSection) => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

interface NavItem {
  id: NavSection
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: ChartNoAxesCombined },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'agents', label: 'Agent Management', icon: Bot },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'contracts', label: 'Agent Contracts', icon: FileText },
  { id: 'errors', label: 'Error Log', icon: AlertTriangle },
]

export function Sidebar({
  activeSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white/70 p-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70 lg:block">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 p-5 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-100">AgentHub</p>
          <h1 className="mt-1 text-2xl font-semibold">Admin Panel</h1>
          <p className="mt-2 text-sm text-teal-50">Control your AI operations from one place.</p>
        </div>
        <nav aria-label="Main navigation" className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.id === activeSection

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                  isActive
                    ? 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-5 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">AgentHub</h2>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectSection(item.id)
                onCloseMobile()
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                item.id === activeSection
                  ? 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-[1px] lg:hidden"
        />
      ) : null}
    </>
  )
}
