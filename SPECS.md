# AgentHub Admin Panel - Specification Document

## Project Overview
Build a modern, professional admin dashboard for **AgentHub**, a SaaS platform for managing AI agents. The interface must support both light and dark modes and provide clear navigation for platform administrators.

## Tech Stack & Constraints
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS (use `dark:` prefix for dark mode)
- **Icons**: Lucide React or Heroicons
- **State Management**: React hooks + Context API
- **Design**: Clean, modern, professional aesthetic
- **Responsiveness**: Mobile-friendly + desktop optimized

## Global UI Requirements
- Persistent left sidebar navigation
- Top bar with dark/light mode toggle
- Consistent card-based layout
- Proper accessibility (ARIA labels, focus states, keyboard navigation)

## Navigation Sections

### 1. Dashboard
- Four key metric cards:
  - Total Revenue (this month)
  - Total Discount & Coupon Losses
  - Active Agents (across all clients)
  - Flagged / Failing Agents
- Weekly activity chart placeholder

### 2. User Management
- Data table: Name, Email, Plan, Status
- Row actions (`⋮` dropdown): **View Detail**, **Delete**
- "View Detail" opens a modal with full user information

### 3. Agent Management
- Table: Agent Name, Owner, Status (Active / Inactive / Failing), Skills
- Expandable skills list (smooth animation)
- Row actions: **Configure** (opens system prompt modal), **Delete**

### 4. Skills
- Skill catalog table: Name, Description, # of Agents using it
- Short explanatory text about what a "Skill" is in this platform
- Row actions: **View Detail**, **Delete**

### 5. Agent Contracts
- Table: Client, Rented Agent, Contracted Skills, Contract Dates, Total Amount
- Row actions: **View Detail** (modal with itemized skill pricing)

### 6. Error Log
- Table: Timestamp, Agent Name, Error Type, Description
- Color-coded badges by error severity/type
- Row actions: **View Detail** (full error trace), **Mark as Resolved**

## Output Requirements
- Generate well-structured, reusable React + TypeScript components
- Follow consistent naming conventions
- Use semantic HTML where appropriate
- Include helpful comments for complex sections
- Prioritize clean, maintainable, and scalable code

---
