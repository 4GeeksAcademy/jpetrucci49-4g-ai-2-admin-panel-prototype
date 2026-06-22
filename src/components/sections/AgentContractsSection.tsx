import { useState } from 'react'
import { ActionMenu } from '../ui/ActionMenu'
import { Modal } from '../ui/Modal'
import type { AgentContract } from '../../types/models'

interface AgentContractsSectionProps {
  contracts: AgentContract[]
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function AgentContractsSection({ contracts }: AgentContractsSectionProps) {
  const [selectedContract, setSelectedContract] = useState<AgentContract | null>(null)

  return (
    <section className="space-y-6">
      <article className="shadow-soft-panel overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3.5">Client</th>
                <th className="px-5 py-3.5">Rented Agent</th>
                <th className="px-5 py-3.5">Contracted Skills</th>
                <th className="px-5 py-3.5">Contract Dates</th>
                <th className="px-5 py-3.5">Total Amount</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {contracts.map((contract) => (
                <tr key={contract.id} className="text-slate-700 transition hover:bg-slate-50/70 dark:text-slate-200 dark:hover:bg-slate-900/40">
                  <td className="px-5 py-4 font-medium">{contract.client}</td>
                  <td className="px-5 py-4">{contract.rentedAgent}</td>
                  <td className="px-5 py-4">{contract.contractedSkills.join(', ')}</td>
                  <td className="px-5 py-4">{contract.startDate} - {contract.endDate}</td>
                  <td className="px-5 py-4">{currency.format(contract.totalAmount)}</td>
                  <td className="px-5 py-4 text-right">
                    <ActionMenu
                      ariaLabel={`Actions for contract ${contract.client}`}
                      actions={[
                        {
                          label: 'View Detail',
                          onSelect: () => setSelectedContract(contract),
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
        title={selectedContract ? `${selectedContract.client} Contract` : 'Contract Details'}
        open={selectedContract !== null}
        onClose={() => setSelectedContract(null)}
      >
        {selectedContract ? (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <p className="text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Client:</span>{' '}
                {selectedContract.client}
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Agent:</span>{' '}
                {selectedContract.rentedAgent}
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">Itemized Skill Pricing</h3>
              <ul className="space-y-2">
                {selectedContract.lineItems.map((item) => (
                  <li
                    key={item.skill}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <span className="text-slate-700 dark:text-slate-200">{item.skill}</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {currency.format(item.monthlyPrice)} / mo
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-right font-semibold text-slate-900 dark:text-slate-100">
              Contract Total: {currency.format(selectedContract.totalAmount)}
            </p>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
