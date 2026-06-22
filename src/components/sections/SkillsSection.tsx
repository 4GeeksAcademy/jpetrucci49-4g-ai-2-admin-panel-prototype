import { useMemo, useState } from 'react'
import { ActionMenu } from '../ui/ActionMenu'
import { Modal } from '../ui/Modal'
import type { Skill } from '../../types/models'

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [removedSkillIds, setRemovedSkillIds] = useState<Set<string>>(new Set())

  const visibleSkills = useMemo(
    () => skills.filter((skill) => !removedSkillIds.has(skill.id)),
    [removedSkillIds, skills],
  )

  return (
    <section className="space-y-6">
      <article className="shadow-soft-panel rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-sky-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:from-slate-900 dark:to-sky-950/30 dark:text-slate-200">
        <p>
          A skill is a reusable capability module that agents can compose, such as OCR, routing, or intent detection. Skills allow rapid customization while keeping agent behavior consistent.
        </p>
      </article>

      <article className="shadow-soft-panel overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Description</th>
                <th className="px-5 py-3.5">Agents Using</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm dark:divide-slate-800">
              {visibleSkills.map((skill) => (
                <tr key={skill.id} className="text-slate-700 transition hover:bg-slate-50/70 dark:text-slate-200 dark:hover:bg-slate-900/40">
                  <td className="px-5 py-4 font-medium">{skill.name}</td>
                  <td className="px-5 py-4">{skill.description}</td>
                  <td className="px-5 py-4">{skill.agentsUsing}</td>
                  <td className="px-5 py-4 text-right">
                    <ActionMenu
                      ariaLabel={`Actions for ${skill.name}`}
                      actions={[
                        {
                          label: 'View Detail',
                          onSelect: () => setSelectedSkill(skill),
                        },
                        {
                          label: 'Delete',
                          danger: true,
                          onSelect: () =>
                            setRemovedSkillIds((previousIds) =>
                              new Set(previousIds).add(skill.id),
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
        title={selectedSkill ? `${selectedSkill.name} Details` : 'Skill Details'}
        open={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
      >
        {selectedSkill ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedSkill.name}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Version</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedSkill.version}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Category</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedSkill.category}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Agents Using</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedSkill.agentsUsing}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-500 dark:text-slate-400">Description</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{selectedSkill.description}</dd>
            </div>
          </dl>
        ) : null}
      </Modal>
    </section>
  )
}
