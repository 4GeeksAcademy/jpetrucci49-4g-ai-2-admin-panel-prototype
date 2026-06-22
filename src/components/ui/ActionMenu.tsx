import { EllipsisVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Action {
  label: string
  danger?: boolean
  onSelect: () => void
}

interface ActionMenuProps {
  ariaLabel: string
  actions: Action[]
}

export function ActionMenu({ ariaLabel, actions }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="relative inline-flex" ref={menuRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <EllipsisVertical size={18} />
      </button>

      {open ? (
        <ul className="absolute right-0 top-10 z-20 min-w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          {actions.map((action) => (
            <li key={action.label}>
              <button
                type="button"
                onClick={() => {
                  action.onSelect()
                  setOpen(false)
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                  action.danger
                    ? 'text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/50'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
