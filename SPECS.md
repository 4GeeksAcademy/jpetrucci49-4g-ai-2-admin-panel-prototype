# AgentHub Admin Panel - Specification Document

## Project Overview
Build a modern, professional admin dashboard for **AgentHub**, a SaaS platform for managing AI agents. The interface must support both light and dark modes and provide clear navigation for platform administrators and must be fully functional using only HTML, Tailwind CSS via CDN, and vanilla JavaScript.

## Tech Stack & Strict Constraints
- **HTML5** semantic markup
- **Tailwind CSS** via CDN (`<script src="https://cdn.tailwindcss.com">`)
- **Vanilla JavaScript** only (no frameworks, no React, no Vue)
- All data must be **hardcoded** (no backend or API calls)
- Single `index.html` file preferred (or minimal linked files)
- No custom CSS files and no inline `style` attributes

## Component Inventory (Reusable UI Components)
- **Sidebar Navigation** – persistent left sidebar with active states
- **Top Bar** – contains logo, title, dark mode toggle, and user info
- **Metric Card** – reusable card for key metrics with icon and value
- **Data Table** – reusable table with striped rows and action menus
- **Action Dropdown** – `⋮` menu with options (View Detail, Delete, etc.)
- **Modal** – overlay modal with backdrop click-to-close and close button
- **Collapsible Section** – expandable skill list with smooth transition
- **Badge** – color-coded status and error type badges
- **Confirmation Modal** – for destructive actions (Delete)

## Global Requirements
- Persistent sidebar navigation with 6 sections
- Dark/Light mode toggle in top bar using Tailwind `dark:` utilities
- Fully responsive design (mobile + desktop)
- All dropdowns close when clicking outside
- All modals close when clicking the backdrop
- Smooth transitions and hover states
- Proper accessibility (ARIA labels, focus states, keyboard navigation)

## Navigation Sections

### 1. Dashboard
- Four metric cards: Total Revenue (this month), Total Discount & Coupon Losses, Active Agents, Flagged/Failing Agents
- Weekly activity chart placeholder (styled div or simple chart)

### 2. User Management
- Table with at least 5 hardcoded users (name, email, plan, status)
- Row actions (`⋮` dropdown): **View Detail**, **Delete**
- "View Detail" opens modal with full user record

### 3. Agent Management
- Table with at least 4 agents (name, owner, status (Active / Inactive / Failing), skills)
- Expandable skills list (smooth animation)
- Row actions: **Configure** (opens system prompt modal), **Delete**

### 4. Skills
- Table with at least 4 skills (name, description, # of agents using it)
- Brief in-panel explanation of what a "Skill" is
- Row actions: **View Detail**, **Delete**

### 5. Agent Contracts
- Table with at least 4 contracts (client, rented agent, contracted skills, contract dates, total amount)
- Row actions: **View Detail** (modal with itemized skill pricing)

### 6. Error Log
- At least 6 hardcoded error entries (timestamp, agent name, error type, description)
- Color-coded badges by error severity/type
- Row actions: **View Detail** (full error trace), **Mark as Resolved**

## Acceptance Criteria
1. Sidebar navigation works and highlights the active section
2. Dark/light mode toggle switches the entire interface and persists
3. All action dropdowns open/close correctly and close on outside click
4. All modals open and close via button and backdrop click
5. Collapsible skill lists expand and collapse with smooth transition
6. All tables display correctly with proper data and action menus
7. The interface is fully responsive on mobile and desktop
8. All hardcoded data is realistic and consistent

## Output Requirements
- Generate the entire admin panel as a **single `index.html` file**
- Use **Tailwind CSS via CDN** (`<script src="https://cdn.tailwindcss.com">`) for all styling
- Use **only vanilla HTML, CSS (via Tailwind), and JavaScript** — no frameworks, no React, no external libraries
- Write clean, well-structured, and semantic HTML
- Include helpful comments explaining key sections and interactive logic
- Make the code readable and maintainable
- Ensure all Tailwind classes are written directly in the HTML elements
- Prioritize modern, professional SaaS aesthetics with smooth interactions

---