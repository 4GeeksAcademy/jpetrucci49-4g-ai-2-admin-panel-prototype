import {
  qs,
  qsa,
  toSafeText,
  openModal,
  closeModal,
  closeModals,
  setDarkTheme,
  getPreferredTheme,
  statusBadge,
  iconSvg,
  menuToggleButton,
  menuPanelContent,
  positionFloatingMenu
} from './utils.js';

const state = {
  section: 'dashboard',
  pendingDelete: null,
  activeMenu: null,
  users: [
    { id: 1, name: 'Maya Lin', email: 'maya.lin@novamarket.ai', plan: 'Enterprise', status: 'Active', company: 'Nova Market', seats: 38, joined: '2025-11-04' },
    { id: 2, name: 'Daniel Ortiz', email: 'd.ortiz@fluxpay.io', plan: 'Pro', status: 'Trial', company: 'FluxPay', seats: 12, joined: '2026-01-09' },
    { id: 3, name: 'Priya Nandakumar', email: 'priya@horizonops.com', plan: 'Enterprise', status: 'Active', company: 'HorizonOps', seats: 52, joined: '2025-07-22' },
    { id: 4, name: 'Noah Grant', email: 'noah.grant@luminahealth.org', plan: 'Starter', status: 'Past Due', company: 'Lumina Health', seats: 6, joined: '2026-02-12' },
    { id: 5, name: 'Elena Rossi', email: 'elena@quantislegal.co', plan: 'Pro', status: 'Active', company: 'Quantis Legal', seats: 18, joined: '2025-09-17' }
  ],
  agents: [
    {
      id: 101,
      name: 'Onboarding Concierge',
      owner: 'Maya Lin',
      status: 'Active',
      skills: ['Intent Classification', 'CRM Sync', 'Knowledge Base Retrieval'],
      prompt: 'You are a precise onboarding specialist. Ask one clarifying question at a time and log actions in CRM.'
    },
    {
      id: 102,
      name: 'Finance Auditor',
      owner: 'Priya Nandakumar',
      status: 'Failing',
      skills: ['Invoice Parsing', 'Anomaly Detection', 'Policy Validation'],
      prompt: 'Validate invoice fields against policy rules before posting to accounting workflows.'
    },
    {
      id: 103,
      name: 'Support Deflector',
      owner: 'Daniel Ortiz',
      status: 'Inactive',
      skills: ['Ticket Routing', 'Sentiment Scoring'],
      prompt: 'Route tickets by urgency and sentiment, escalate critical events to human support immediately.'
    },
    {
      id: 104,
      name: 'Contract Summarizer',
      owner: 'Elena Rossi',
      status: 'Active',
      skills: ['Clause Extraction', 'Risk Flagging', 'Multilingual Translation'],
      prompt: 'Summarize contract obligations and flag legal risk with concise evidence references.'
    }
  ],
  skills: [
    { id: 201, name: 'CRM Sync', description: 'Pushes lead data and notes into CRM in near real-time.', usage: 14, owner: 'Platform Integrations Team' },
    { id: 202, name: 'Anomaly Detection', description: 'Detects outlier transactions and confidence drift.', usage: 8, owner: 'Risk and Compliance' },
    { id: 203, name: 'Knowledge Retrieval', description: 'Searches indexed docs to return grounded answers.', usage: 21, owner: 'AI Infra' },
    { id: 204, name: 'Multilingual Translation', description: 'Provides context-aware translations for 24 languages.', usage: 10, owner: 'Localization Ops' }
  ],
  contracts: [
    {
      id: 301,
      client: 'Nova Market',
      agent: 'Onboarding Concierge',
      skills: ['CRM Sync', 'Knowledge Retrieval'],
      dates: '2026-01-01 to 2026-12-31',
      total: '$52,000',
      pricing: [
        { item: 'Base Agent Rental', amount: '$36,000' },
        { item: 'CRM Sync Skill', amount: '$8,000' },
        { item: 'Knowledge Retrieval Skill', amount: '$8,000' }
      ]
    },
    {
      id: 302,
      client: 'HorizonOps',
      agent: 'Finance Auditor',
      skills: ['Anomaly Detection', 'Invoice Parsing'],
      dates: '2026-03-15 to 2027-03-14',
      total: '$67,500',
      pricing: [
        { item: 'Base Agent Rental', amount: '$45,000' },
        { item: 'Anomaly Detection Skill', amount: '$13,500' },
        { item: 'Invoice Parsing Skill', amount: '$9,000' }
      ]
    },
    {
      id: 303,
      client: 'FluxPay',
      agent: 'Support Deflector',
      skills: ['Ticket Routing', 'Sentiment Scoring'],
      dates: '2026-02-01 to 2026-11-30',
      total: '$41,200',
      pricing: [
        { item: 'Base Agent Rental', amount: '$30,000' },
        { item: 'Ticket Routing Skill', amount: '$6,200' },
        { item: 'Sentiment Scoring Skill', amount: '$5,000' }
      ]
    },
    {
      id: 304,
      client: 'Quantis Legal',
      agent: 'Contract Summarizer',
      skills: ['Clause Extraction', 'Multilingual Translation'],
      dates: '2026-04-01 to 2027-03-31',
      total: '$58,400',
      pricing: [
        { item: 'Base Agent Rental', amount: '$39,400' },
        { item: 'Clause Extraction Skill', amount: '$9,000' },
        { item: 'Multilingual Translation Skill', amount: '$10,000' }
      ]
    }
  ],
  errors: [
    {
      id: 401,
      timestamp: '2026-06-22 09:42 UTC',
      agent: 'Finance Auditor',
      type: 'Critical',
      description: 'Validation service timeout after 3 retries.',
      trace: 'Error: ETIMEDOUT at ValidatePolicy() -> RetryQueue(3) -> AbortWorkflow()',
      resolved: false
    },
    {
      id: 402,
      timestamp: '2026-06-22 10:11 UTC',
      agent: 'Support Deflector',
      type: 'Warning',
      description: 'Sentiment model confidence below threshold.',
      trace: 'Warning: confidence=0.42 required>=0.65 in routeTicket()',
      resolved: false
    },
    {
      id: 403,
      timestamp: '2026-06-22 10:55 UTC',
      agent: 'Onboarding Concierge',
      type: 'Auth',
      description: 'CRM token expired during lead write-back.',
      trace: 'AuthError: oauth token invalid when POST /crm/leads',
      resolved: false
    },
    {
      id: 404,
      timestamp: '2026-06-22 11:23 UTC',
      agent: 'Contract Summarizer',
      type: 'Data',
      description: 'Missing clause metadata in uploaded PDF.',
      trace: 'DataError: clause_id undefined in parseContract(file=QTL-12.pdf)',
      resolved: false
    },
    {
      id: 405,
      timestamp: '2026-06-22 12:07 UTC',
      agent: 'Finance Auditor',
      type: 'Critical',
      description: 'Unexpected null in ledger reconciliation.',
      trace: 'TypeError: cannot read properties of null at reconcileLedger()',
      resolved: false
    },
    {
      id: 406,
      timestamp: '2026-06-22 13:36 UTC',
      agent: 'Onboarding Concierge',
      type: 'Info',
      description: 'Fallback policy activated for unknown intent.',
      trace: 'Info: fallbackPolicy(intent=UNKNOWN) executed with confidence 0.31',
      resolved: true
    }
  ]
};

const sectionTitles = {
  dashboard: 'Dashboard',
  users: 'User Management',
  agents: 'Agent Management',
  skills: 'Skills',
  contracts: 'Agent Contracts',
  errors: 'Error Log'
};

const metricCards = [
  { title: 'Total Revenue (Month)', value: '$426,780', subtitle: '+11.4% vs last month', icon: 'dollar' },
  { title: 'Discount & Coupon Losses', value: '$19,240', subtitle: '-2.1% vs last month', icon: 'discount' },
  { title: 'Active Agents', value: '87', subtitle: 'Across 39 customer workspaces', icon: 'agent' },
  { title: 'Flagged / Failing Agents', value: '3', subtitle: 'Needs immediate intervention', icon: 'alert' }
];

function updateThemeLabel() {
  const isDark = document.documentElement.classList.contains('dark');
  qs('#theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
}

function setSection(sectionKey) {
  state.section = sectionKey;
  qs('#page-title').textContent = sectionTitles[sectionKey];

  qsa('.section-block').forEach((section) => section.classList.add('hidden'));
  qs(`#section-${sectionKey}`).classList.remove('hidden');

  qsa('.nav-btn').forEach((btn) => {
    const active = btn.dataset.section === sectionKey;
    btn.className = `nav-btn w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
      active
        ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;
    btn.setAttribute('aria-current', active ? 'page' : 'false');
  });
}

function metricCardTemplate(card) {
  return `
    <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-panel transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-sm font-medium text-slate-500 dark:text-slate-400">${toSafeText(card.title)}</h2>
        <span class="rounded-lg bg-cyan-100 p-2 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">${iconSvg(card.icon)}</span>
      </div>
      <p class="font-display text-2xl font-bold">${toSafeText(card.value)}</p>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">${toSafeText(card.subtitle)}</p>
    </article>
  `;
}

function actionCell(actions, kind, id) {
  return `
    <td class="px-4 py-3 text-right" data-kind="${toSafeText(kind)}" data-id="${id}">
      <div class="inline-block" data-dropdown>${menuToggleButton()}</div>
      <template data-menu-template>${menuPanelContent(actions)}</template>
    </td>
  `;
}

function renderMetrics() {
  qs('#metric-grid').innerHTML = metricCards.map(metricCardTemplate).join('');
}

function renderUsers() {
  qs('#users-body').innerHTML = state.users
    .map(
      (u, index) => `
      <tr class="${index % 2 ? 'bg-slate-50/60 dark:bg-slate-800/30' : ''}">
        <td class="px-4 py-3 font-medium">${toSafeText(u.name)}</td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${toSafeText(u.email)}</td>
        <td class="px-4 py-3">${toSafeText(u.plan)}</td>
        <td class="px-4 py-3">${statusBadge(u.status)}</td>
        ${actionCell(
          [
            { key: 'view-user', label: 'View Detail' },
            { key: 'delete-user', label: 'Delete' }
          ],
          'user',
          u.id
        )}
      </tr>
    `
    )
    .join('');
}

function renderAgents() {
  qs('#agents-body').innerHTML = state.agents
    .map(
      (a, index) => `
      <tr class="${index % 2 ? 'bg-slate-50/60 dark:bg-slate-800/30' : ''}">
        <td class="px-4 py-3 font-medium">${toSafeText(a.name)}</td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${toSafeText(a.owner)}</td>
        <td class="px-4 py-3">${statusBadge(a.status)}</td>
        <td class="px-4 py-3">
          <button type="button" data-collapse="skills-${a.id}" class="collapse-trigger rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800" aria-expanded="false" aria-controls="skills-${a.id}">
            ${a.skills.length} skills
          </button>
          <div id="skills-${a.id}" class="mt-2 max-h-0 overflow-hidden rounded-lg bg-slate-100 transition-all duration-300 dark:bg-slate-800">
            <ul class="space-y-1 p-2 text-xs text-slate-700 dark:text-slate-200">
              ${a.skills.map((skill) => `<li class="rounded bg-white px-2 py-1 dark:bg-slate-900">${toSafeText(skill)}</li>`).join('')}
            </ul>
          </div>
        </td>
        ${actionCell(
          [
            { key: 'configure-agent', label: 'Configure' },
            { key: 'delete-agent', label: 'Delete' }
          ],
          'agent',
          a.id
        )}
      </tr>
    `
    )
    .join('');
}

function renderSkills() {
  qs('#skills-body').innerHTML = state.skills
    .map(
      (s, index) => `
      <tr class="${index % 2 ? 'bg-slate-50/60 dark:bg-slate-800/30' : ''}">
        <td class="px-4 py-3 font-medium">${toSafeText(s.name)}</td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${toSafeText(s.description)}</td>
        <td class="px-4 py-3">${s.usage}</td>
        ${actionCell(
          [
            { key: 'view-skill', label: 'View Detail' },
            { key: 'delete-skill', label: 'Delete' }
          ],
          'skill',
          s.id
        )}
      </tr>
    `
    )
    .join('');
}

function renderContracts() {
  qs('#contracts-body').innerHTML = state.contracts
    .map(
      (c, index) => `
      <tr class="${index % 2 ? 'bg-slate-50/60 dark:bg-slate-800/30' : ''}">
        <td class="px-4 py-3 font-medium">${toSafeText(c.client)}</td>
        <td class="px-4 py-3">${toSafeText(c.agent)}</td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${toSafeText(c.skills.join(', '))}</td>
        <td class="px-4 py-3">${toSafeText(c.dates)}</td>
        <td class="px-4 py-3 font-semibold">${toSafeText(c.total)}</td>
        ${actionCell([{ key: 'view-contract', label: 'View Detail' }], 'contract', c.id)}
      </tr>
    `
    )
    .join('');
}

function renderErrors() {
  qs('#errors-body').innerHTML = state.errors
    .map(
      (e, index) => `
      <tr class="${index % 2 ? 'bg-slate-50/60 dark:bg-slate-800/30' : ''}">
        <td class="px-4 py-3">${toSafeText(e.timestamp)}</td>
        <td class="px-4 py-3 font-medium">${toSafeText(e.agent)}</td>
        <td class="px-4 py-3">${statusBadge(e.resolved ? 'Resolved' : e.type)}</td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${toSafeText(e.description)}</td>
        ${actionCell(
          [
            { key: 'view-error', label: 'View Detail' },
            { key: 'resolve-error', label: e.resolved ? 'Resolved' : 'Mark as Resolved' }
          ],
          'error',
          e.id
        )}
      </tr>
    `
    )
    .join('');
}

function renderAllTables() {
  renderUsers();
  renderAgents();
  renderSkills();
  renderContracts();
  renderErrors();
}

function showDetail(title, rows) {
  qs('#detail-modal-title').textContent = title;
  qs('#detail-modal-body').innerHTML = rows
    .map(
      (row) => `
      <div class="grid grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/70">
        <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">${toSafeText(row.label)}</p>
        <p class="col-span-2 font-medium text-slate-800 dark:text-slate-100">${toSafeText(row.value)}</p>
      </div>
    `
    )
    .join('');
  openModal('detail-modal');
}

function showConfirm(label, callback) {
  state.pendingDelete = callback;
  qs('#confirm-modal-text').textContent = `Delete ${label}? This action cannot be undone.`;
  openModal('confirm-modal');
}

function openSidebar() {
  qs('#sidebar').classList.remove('-translate-x-full');
  qs('#mobile-backdrop').classList.remove('hidden');
}

function closeSidebar() {
  qs('#sidebar').classList.add('-translate-x-full');
  qs('#mobile-backdrop').classList.add('hidden');
}

function closeActionMenu() {
  if (!state.activeMenu) return;

  const { button, menuEl } = state.activeMenu;
  button.setAttribute('aria-expanded', 'false');
  if (menuEl) menuEl.remove();
  qs('#action-menu-layer').classList.add('pointer-events-none');
  state.activeMenu = null;
}

function openActionMenu(button, actionCellEl) {
  const template = qs('[data-menu-template]', actionCellEl);
  if (!template) return;

  closeActionMenu();

  const menuEl = document.createElement('div');
  menuEl.className =
    'fixed z-[46] w-44 rounded-xl border border-slate-200 bg-white py-1 shadow-panel dark:border-slate-700 dark:bg-slate-900';
  menuEl.setAttribute('role', 'menu');
  menuEl.dataset.kind = actionCellEl.dataset.kind;
  menuEl.dataset.id = actionCellEl.dataset.id;
  menuEl.innerHTML = template.innerHTML;

  qs('#action-menu-layer').classList.remove('pointer-events-none');
  qs('#action-menu-layer').appendChild(menuEl);

  positionFloatingMenu(button, menuEl);

  button.setAttribute('aria-expanded', 'true');
  state.activeMenu = { button, menuEl };
}

function handleAction(action, id) {
  if (action === 'view-user') {
    const user = state.users.find((u) => u.id === id);
    showDetail('User Detail', [
      { label: 'Name', value: user.name },
      { label: 'Email', value: user.email },
      { label: 'Company', value: user.company },
      { label: 'Plan', value: user.plan },
      { label: 'Seats', value: String(user.seats) },
      { label: 'Joined', value: user.joined },
      { label: 'Status', value: user.status }
    ]);
  }

  if (action === 'delete-user') {
    const user = state.users.find((u) => u.id === id);
    showConfirm(`user ${user.name}`, () => {
      state.users = state.users.filter((u) => u.id !== id);
      renderUsers();
    });
  }

  if (action === 'configure-agent') {
    const agent = state.agents.find((a) => a.id === id);
    qs('#prompt-agent-name').textContent = `Editing: ${agent.name}`;
    qs('#prompt-content').value = agent.prompt;
    qs('#save-prompt').dataset.agentId = String(id);
    openModal('prompt-modal');
  }

  if (action === 'delete-agent') {
    const agent = state.agents.find((a) => a.id === id);
    showConfirm(`agent ${agent.name}`, () => {
      state.agents = state.agents.filter((a) => a.id !== id);
      renderAgents();
    });
  }

  if (action === 'view-skill') {
    const skill = state.skills.find((s) => s.id === id);
    showDetail('Skill Detail', [
      { label: 'Name', value: skill.name },
      { label: 'Description', value: skill.description },
      { label: 'Agents Using', value: String(skill.usage) },
      { label: 'Owner Team', value: skill.owner }
    ]);
  }

  if (action === 'delete-skill') {
    const skill = state.skills.find((s) => s.id === id);
    showConfirm(`skill ${skill.name}`, () => {
      state.skills = state.skills.filter((s) => s.id !== id);
      renderSkills();
    });
  }

  if (action === 'view-contract') {
    const contract = state.contracts.find((c) => c.id === id);
    const pricingBreakdown = contract.pricing.map((line) => `${line.item}: ${line.amount}`).join(' | ');
    showDetail('Contract Detail', [
      { label: 'Client', value: contract.client },
      { label: 'Agent', value: contract.agent },
      { label: 'Dates', value: contract.dates },
      { label: 'Contracted Skills', value: contract.skills.join(', ') },
      { label: 'Itemized Pricing', value: pricingBreakdown },
      { label: 'Total', value: contract.total }
    ]);
  }

  if (action === 'view-error') {
    const error = state.errors.find((e) => e.id === id);
    showDetail('Error Trace Detail', [
      { label: 'Timestamp', value: error.timestamp },
      { label: 'Agent', value: error.agent },
      { label: 'Type', value: error.type },
      { label: 'Description', value: error.description },
      { label: 'Trace', value: error.trace }
    ]);
  }

  if (action === 'resolve-error') {
    state.errors = state.errors.map((e) => (e.id === id ? { ...e, resolved: true } : e));
    renderErrors();
  }
}

function bindEvents() {
  qs('#theme-toggle').addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    setDarkTheme(isDark);
    updateThemeLabel();
  });

  qsa('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setSection(btn.dataset.section);
      if (window.innerWidth < 1024) closeSidebar();
    });
  });

  qs('#open-sidebar').addEventListener('click', openSidebar);
  qs('#close-sidebar').addEventListener('click', closeSidebar);
  qs('#mobile-backdrop').addEventListener('click', closeSidebar);

  document.addEventListener('click', (event) => {
    const menuAction = event.target.closest('.menu-action');
    const menuToggle = event.target.closest('.menu-toggle');
    const collapseBtn = event.target.closest('.collapse-trigger');

    if (menuToggle) {
      const actionTd = menuToggle.closest('td[data-kind]');
      if (!actionTd) return;
      const currentlyOpen = state.activeMenu && state.activeMenu.button === menuToggle;
      if (currentlyOpen) {
        closeActionMenu();
      } else {
        openActionMenu(menuToggle, actionTd);
      }
      return;
    }

    if (menuAction && state.activeMenu) {
      const action = menuAction.dataset.action;
      const id = Number(state.activeMenu.menuEl.dataset.id);
      closeActionMenu();
      handleAction(action, id);
      return;
    }

    if (collapseBtn) {
      const target = qs(`#${collapseBtn.dataset.collapse}`);
      const expanded = collapseBtn.getAttribute('aria-expanded') === 'true';
      collapseBtn.setAttribute('aria-expanded', String(!expanded));
      target.classList.toggle('max-h-80', !expanded);
      target.classList.toggle('max-h-0', expanded);
      return;
    }

    if (!event.target.closest('.menu-toggle')) {
      closeActionMenu();
    }
  });

  qsa('.modal-close').forEach((button) => {
    button.addEventListener('click', () => {
      closeModals(['detail-modal', 'prompt-modal', 'confirm-modal']);
    });
  });

  ['detail-modal', 'prompt-modal', 'confirm-modal'].forEach((id) => {
    const el = qs(`#${id}`);
    el.addEventListener('click', (event) => {
      if (event.target === el) closeModal(id);
    });
  });

  qs('#save-prompt').addEventListener('click', () => {
    const id = Number(qs('#save-prompt').dataset.agentId);
    const value = qs('#prompt-content').value.trim();
    state.agents = state.agents.map((agent) => (agent.id === id ? { ...agent, prompt: value || agent.prompt } : agent));
    closeModal('prompt-modal');
  });

  qs('#confirm-delete').addEventListener('click', () => {
    if (typeof state.pendingDelete === 'function') state.pendingDelete();
    state.pendingDelete = null;
    closeModal('confirm-modal');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeActionMenu();
      closeModals(['detail-modal', 'prompt-modal', 'confirm-modal']);
      closeSidebar();
    }
  });

  window.addEventListener('resize', () => {
    if (!state.activeMenu) return;
    positionFloatingMenu(state.activeMenu.button, state.activeMenu.menuEl);
  });

  window.addEventListener('scroll', () => {
    if (!state.activeMenu) return;
    positionFloatingMenu(state.activeMenu.button, state.activeMenu.menuEl);
  }, true);
}

function init() {
  setDarkTheme(getPreferredTheme());
  updateThemeLabel();
  renderMetrics();
  renderAllTables();
  setSection('dashboard');
  bindEvents();
}

init();
