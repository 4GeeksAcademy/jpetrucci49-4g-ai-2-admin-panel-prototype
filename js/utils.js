export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function toSafeText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function openModal(id) {
  const modal = qs(`#${id}`);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeModal(id) {
  const modal = qs(`#${id}`);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

export function closeModals(ids) {
  ids.forEach(closeModal);
}

export function setDarkTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('agenthub-theme', isDark ? 'dark' : 'light');
}

export function getPreferredTheme() {
  const savedTheme = localStorage.getItem('agenthub-theme');
  if (savedTheme === 'dark') return true;
  if (savedTheme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function statusBadge(status) {
  const map = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Trial: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
    'Past Due': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Inactive: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    Failing: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    Warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Critical: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    Auth: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
    Data: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300',
    Info: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
    Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
  };

  const palette = map[status] || map.Info;
  return `<span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold ${palette}">${toSafeText(status)}</span>`;
}

export function iconSvg(type) {
  const iconBase = 'h-5 w-5';
  const icons = {
    dollar: `<svg class="${iconBase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    discount: `<svg class="${iconBase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 7.5 9 9M16 7h.01M8 17h.01"/><path d="M3 10V3h7l11 11-7 7L3 10z"/></svg>`,
    agent: `<svg class="${iconBase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v2h2a2 2 0 0 1 2 2v8H4v-8a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z"/><path d="M9 14h6"/></svg>`,
    alert: `<svg class="${iconBase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`
  };

  return icons[type] || icons.agent;
}

export function menuToggleButton() {
  return `
    <button
      type="button"
      class="menu-toggle rounded-lg border border-slate-200 px-3 py-1.5 text-lg leading-none hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:hover:bg-slate-800"
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="Open actions menu"
    >
      ⋮
    </button>
  `;
}

export function menuPanelContent(actions) {
  return actions
    .map(
      (action) =>
        `<button type="button" data-action="${toSafeText(action.key)}" class="menu-action block w-full px-3 py-2 text-left ${action.key.includes("delete") ? "text-red-600 " : ""}text-sm hover:bg-slate-100 dark:hover:bg-slate-800">${toSafeText(action.label)}</button>`
    )
    .join('');
}

export function positionFloatingMenu(triggerElement, menuElement) {
  const rect = triggerElement.getBoundingClientRect();
  const menuWidth = 176;
  const margin = 12;
  const left = Math.min(Math.max(margin, rect.right - menuWidth), window.innerWidth - menuWidth - margin);
  const availableBottom = window.innerHeight - rect.bottom;
  const openUpward = availableBottom < 130;

  menuElement.style.left = `${Math.round(left)}px`;
  menuElement.style.top = openUpward ? `${Math.round(rect.top - 8)}px` : `${Math.round(rect.bottom + 8)}px`;
  menuElement.style.transform = openUpward ? 'translateY(-100%)' : 'none';
}
