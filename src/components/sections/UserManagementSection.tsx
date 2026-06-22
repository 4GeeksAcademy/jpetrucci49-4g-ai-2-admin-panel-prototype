import { useMemo, useState } from 'react'
import { ActionMenu } from '../ui/ActionMenu'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'
import type { User } from '../../types/models'

interface UserManagementSectionProps {
  users: User[]
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function UserManagementSection({ users }: UserManagementSectionProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [removedUserIds, setRemovedUserIds] = useState<Set<string>>(new Set())

  const visibleUsers = useMemo(
    () => users.filter((user) => !removedUserIds.has(user.id)),
    [removedUserIds, users],
  )

  return (
    <section className="space-y-6">
      <article className="shadow-soft-panel overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Plan</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {visibleUsers.map((user) => (
                <tr key={user.id} className="text-slate-700 transition hover:bg-slate-50/70 dark:text-slate-200 dark:hover:bg-slate-900/40">
                  <td className="px-5 py-4 font-medium">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.plan}</td>
                  <td className="px-5 py-4">
                    <Badge
                      tone={
                        user.status === 'Active'
                          ? 'success'
                          : user.status === 'Trial'
                            ? 'info'
                            : 'danger'
                      }
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ActionMenu
                      ariaLabel={`Actions for ${user.name}`}
                      actions={[
                        {
                          label: 'View Detail',
                          onSelect: () => setSelectedUser(user),
                        },
                        {
                          label: 'Delete',
                          danger: true,
                          onSelect: () =>
                            setRemovedUserIds((previousIds) =>
                              new Set(previousIds).add(user.id),
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
        title={selectedUser ? `${selectedUser.name} Details` : 'User Details'}
        open={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
      >
        {selectedUser ? (
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.name}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Company</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.company}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Country</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.country}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Plan</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.plan}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Status</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.status}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Created At</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedUser.createdAt}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Monthly Spend</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{currency.format(selectedUser.monthlySpend)}</dd>
            </div>
          </dl>
        ) : null}
      </Modal>
    </section>
  )
}
