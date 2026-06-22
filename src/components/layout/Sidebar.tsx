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

function getNavItemClasses(isActive: boolean) {
  return `group flex w-full items-center gap-3.5 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
    isActive
      ? 'border-sky-200 bg-sky-50 text-sky-900 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-200'
      : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/80 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900/70 dark:hover:text-slate-100'
  }`
}

function NavList({
  activeSection,
  onSelectSection,
  closeOnSelect,
}: {
  activeSection: NavSection
  onSelectSection: (section: NavSection) => void
  closeOnSelect?: () => void
}) {
  return (
    <nav aria-label="Main navigation" className="space-y-1.5">
      {navItems.map((item) => {
        const isActive = item.id === activeSection

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSelectSection(item.id)
              closeOnSelect?.()
            }}
            className={getNavItemClasses(isActive)}
          >
            <div
              className={`rounded-lg p-1.5 transition ${
                isActive
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/80 dark:text-sky-200'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-100'
              }`}
            >
              <item.icon size={16} />
            </div>
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function Sidebar({
  activeSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-y-auto border-r border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75 md:block">
        <div className="mb-6 rounded-2xl border border-slate-300/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-5 text-white shadow-2xl dark:border-slate-700">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-200">AgentHub</p>
          <h1 className="mt-1 text-2xl font-semibold">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-200">Control your AI operations from one place.</p>
        </div>
        <NavList activeSection={activeSection} onSelectSection={onSelectSection} />
        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">Workspace navigation</p>
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="mb-6 rounded-2xl border border-slate-300 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 text-white dark:border-slate-700">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-200">AgentHub</p>
          <h2 className="mt-1 text-xl font-semibold">Admin Panel</h2>
        </div>
        <div className="mb-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
        <NavList
          activeSection={activeSection}
          onSelectSection={onSelectSection}
          closeOnSelect={onCloseMobile}
        />
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-[2px] md:hidden"
        />
      ) : null}
    </>
  )
}
