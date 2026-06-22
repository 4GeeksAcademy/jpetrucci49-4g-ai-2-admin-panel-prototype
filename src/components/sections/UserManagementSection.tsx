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
    <section className="space-y-4">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {visibleUsers.map((user) => (
                <tr key={user.id} className="text-slate-700 dark:text-slate-200">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.plan}</td>
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3 text-right">
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
