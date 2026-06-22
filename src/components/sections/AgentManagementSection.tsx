import { useMemo, useState } from 'react'
import { ActionMenu } from '../ui/ActionMenu'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'
import type { Agent } from '../../types/models'

interface AgentManagementSectionProps {
  agents: Agent[]
}

export function AgentManagementSection({ agents }: AgentManagementSectionProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [removedAgentIds, setRemovedAgentIds] = useState<Set<string>>(new Set())

  const visibleAgents = useMemo(
    () => agents.filter((agent) => !removedAgentIds.has(agent.id)),
    [agents, removedAgentIds],
  )

  return (
    <section className="space-y-6">
      <article className="shadow-soft-panel overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3.5">Agent Name</th>
                <th className="px-5 py-3.5">Owner</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Skills</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {visibleAgents.map((agent) => {
                const isExpanded = expanded.has(agent.id)

                return (
                  <tr key={agent.id} className="align-top text-slate-700 transition hover:bg-slate-50/70 dark:text-slate-200 dark:hover:bg-slate-900/40">
                    <td className="px-5 py-4 font-medium">{agent.name}</td>
                    <td className="px-5 py-4">{agent.owner}</td>
                    <td className="px-5 py-4">
                      <Badge
                        tone={
                          agent.status === 'Active'
                            ? 'success'
                            : agent.status === 'Inactive'
                              ? 'warning'
                              : 'danger'
                        }
                      >
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((currentExpanded) => {
                            const nextExpanded = new Set(currentExpanded)
                            if (nextExpanded.has(agent.id)) {
                              nextExpanded.delete(agent.id)
                            } else {
                              nextExpanded.add(agent.id)
                            }
                            return nextExpanded
                          })
                        }
                        className="rounded-lg px-2 py-1 text-xs font-medium text-sky-700 transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-sky-300 dark:hover:bg-sky-950/60"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'Hide Skills' : 'Show Skills'}
                      </button>
                      <div
                        className={`mt-2 grid transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <ul className="overflow-hidden space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {agent.skills.map((skill) => (
                            <li key={skill} className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <ActionMenu
                        ariaLabel={`Actions for ${agent.name}`}
                        actions={[
                          {
                            label: 'Configure',
                            onSelect: () => setSelectedAgent(agent),
                          },
                          {
                            label: 'Delete',
                            danger: true,
                            onSelect: () =>
                              setRemovedAgentIds((previousIds) =>
                                new Set(previousIds).add(agent.id),
                              ),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </article>

      <Modal
        title={selectedAgent ? `Configure ${selectedAgent.name}` : 'Configure Agent'}
        open={selectedAgent !== null}
        onClose={() => setSelectedAgent(null)}
      >
        {selectedAgent ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Region: <span className="font-medium">{selectedAgent.region}</span>
            </p>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">System Prompt</h3>
              <pre className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                {selectedAgent.prompt}
              </pre>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
