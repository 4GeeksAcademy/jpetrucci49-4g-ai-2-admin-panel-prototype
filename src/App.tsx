import { useMemo, useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { AgentContractsSection } from './components/sections/AgentContractsSection'
import { AgentManagementSection } from './components/sections/AgentManagementSection'
import { DashboardSection } from './components/sections/DashboardSection'
import { ErrorLogSection } from './components/sections/ErrorLogSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { UserManagementSection } from './components/sections/UserManagementSection'
import {
  agents,
  contracts,
  errorLogs,
  revenueThisMonth,
  skills,
  totalCouponLosses,
  users,
  weeklyActivity,
} from './data/mockData'
import type { NavSection } from './types/models'

const sectionMeta: Record<
  NavSection,
  {
    title: string
    subtitle: string
  }
> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Business health, usage, and risk signals at a glance.',
  },
  users: {
    title: 'User Management',
    subtitle: 'Manage customer accounts, plans, and account status.',
  },
  agents: {
    title: 'Agent Management',
    subtitle: 'Configure deployed agents and monitor behavior.',
  },
  skills: {
    title: 'Skills',
    subtitle: 'Track reusable capabilities across the platform.',
  },
  contracts: {
    title: 'Agent Contracts',
    subtitle: 'Review active contracts and skill billing breakdowns.',
  },
  errors: {
    title: 'Error Log',
    subtitle: 'Inspect incidents and resolve production issues.',
  },
}

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeAgentCount = useMemo(
    () => agents.filter((agent) => agent.status === 'Active').length,
    [],
  )

  const failingAgentCount = useMemo(
    () => agents.filter((agent) => agent.status === 'Failing').length,
    [],
  )

  const content = useMemo(() => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardSection
            revenueThisMonth={revenueThisMonth}
            totalCouponLosses={totalCouponLosses}
            activeAgents={activeAgentCount}
            failingAgents={failingAgentCount}
            weeklyActivity={weeklyActivity}
          />
        )
      case 'users':
        return <UserManagementSection users={users} />
      case 'agents':
        return <AgentManagementSection agents={agents} />
      case 'skills':
        return <SkillsSection skills={skills} />
      case 'contracts':
        return <AgentContractsSection contracts={contracts} />
      case 'errors':
        return <ErrorLogSection initialLogs={errorLogs} />
      default:
        return null
    }
  }, [activeAgentCount, activeSection, failingAgentCount])

  return (
    <div className="relative min-h-screen bg-page-pattern text-slate-800 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            title={sectionMeta[activeSection].title}
            subtitle={sectionMeta[activeSection].subtitle}
            onOpenMobileSidebar={() => setMobileOpen(true)}
          />
          <main className="animate-fade-in p-4 sm:p-6">{content}</main>
        </div>
      </div>
    </div>
  )
}

export default App
