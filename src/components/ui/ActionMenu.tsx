import { EllipsisVertical } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node

      if (
        !menuRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  useLayoutEffect(() => {
    if (!open) {
      return
    }

    const updatePosition = () => {
      if (!triggerRef.current || !listRef.current) {
        return
      }

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const menuWidth = listRef.current.offsetWidth || 176
      const menuHeight = listRef.current.offsetHeight
      const gap = 8
      const viewportPadding = 8
      const spaceBelow = window.innerHeight - triggerRect.bottom
      const shouldOpenUpward =
        spaceBelow < menuHeight + gap && triggerRect.top > spaceBelow

      const nextTop = shouldOpenUpward
        ? Math.max(viewportPadding, triggerRect.top - menuHeight - gap)
        : Math.min(
            window.innerHeight - menuHeight - viewportPadding,
            triggerRect.bottom + gap,
          )

      const nextLeft = Math.min(
        window.innerWidth - menuWidth - viewportPadding,
        Math.max(viewportPadding, triggerRect.right - menuWidth),
      )

      setPosition({ top: nextTop, left: nextLeft })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open])

  return (
    <div className="relative inline-flex" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <EllipsisVertical size={18} />
      </button>

      {open ? (
        createPortal(
          <ul
            ref={listRef}
            className="fixed z-[120] min-w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900"
            style={{ top: position.top, left: position.left }}
            role="menu"
          >
            {actions.map((action) => (
              <li key={action.label}>
                <button
                  type="button"
                  onClick={() => {
                    action.onSelect()
                    setOpen(false)
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                    action.danger
                      ? 'text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/50'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                  role="menuitem"
                >
                  {action.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )
      ) : null}
    </div>
  )
}
