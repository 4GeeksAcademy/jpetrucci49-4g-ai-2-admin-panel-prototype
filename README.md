# AgentHub Admin Panel

Modern admin dashboard prototype for managing AI agents, users, skills, contracts, and system incidents.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Lucide React icons
- React Context API + hooks

## Features

- Persistent left navigation (desktop) and slide-in navigation (mobile)
- Top bar with light/dark mode toggle (class-based dark mode)
- Dashboard metrics and weekly activity chart placeholder
- User Management table with action menu and detail modal
- Agent Management table with expandable skills, configure modal, and delete action
- Skills catalog table with explanatory panel and detail modal
- Agent Contracts table with itemized pricing modal
- Error Log table with severity badges, full trace modal, and resolve action
- Responsive, card-based layout with keyboard-focus styles and ARIA labels

## Run Locally

```bash
npm install
npm run dev
```

Open the app at the local URL shown by Vite.

## Quality Check

```bash
npm run build
```

This runs TypeScript compilation and creates a production bundle.
