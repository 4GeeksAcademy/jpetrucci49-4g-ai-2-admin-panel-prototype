import { useMemo, useState } from 'react'
import { ActionMenu } from '../ui/ActionMenu'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'
import type { ErrorLogEntry } from '../../types/models'

interface ErrorLogSectionProps {
  initialLogs: ErrorLogEntry[]
}

export function ErrorLogSection({ initialLogs }: ErrorLogSectionProps) {
  const [logs, setLogs] = useState(initialLogs)
  const [selectedLog, setSelectedLog] = useState<ErrorLogEntry | null>(null)

  const unresolvedCount = useMemo(
    () => logs.filter((log) => !log.resolved).length,
    [logs],
  )

  return (
    <section className="space-y-4">
      <article className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Unresolved incidents: <span className="font-semibold text-slate-900 dark:text-slate-100">{unresolvedCount}</span>
        </p>
      </article>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Agent Name</th>
                <th className="px-4 py-3">Error Type</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="text-slate-700 dark:text-slate-200">
                  <td className="px-4 py-3">{log.timestamp}</td>
                  <td className="px-4 py-3 font-medium">{log.agentName}</td>
                  <td className="px-4 py-3">{log.errorType}</td>
                  <td className="px-4 py-3">{log.description}</td>
                  <td className="px-4 py-3">
                    <Badge
                      tone={
                        log.severity === 'Critical' || log.severity === 'High'
                          ? 'danger'
                          : log.severity === 'Medium'
                            ? 'warning'
                            : 'info'
                      }
                    >
                      {log.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      ariaLabel={`Actions for log ${log.id}`}
                      actions={[
                        {
                          label: 'View Detail',
                          onSelect: () => setSelectedLog(log),
                        },
                        {
                          label: 'Mark as Resolved',
                          onSelect: () =>
                            setLogs((previousLogs) =>
                              previousLogs.map((entry) =>
                                entry.id === log.id
                                  ? { ...entry, resolved: true }
                                  : entry,
                              ),
                            ),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <Modal
        title={selectedLog ? `${selectedLog.errorType} Trace` : 'Error Trace'}
        open={selectedLog !== null}
        onClose={() => setSelectedLog(null)}
      >
        {selectedLog ? (
          <pre className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
            {selectedLog.trace}
          </pre>
        ) : null}
      </Modal>
    </section>
  )
}
