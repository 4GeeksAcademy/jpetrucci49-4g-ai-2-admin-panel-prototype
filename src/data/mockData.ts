import type {
  Agent,
  AgentContract,
  ErrorLogEntry,
  Skill,
  User,
} from '../types/models'

export const revenueThisMonth = 247680
export const totalCouponLosses = 12735

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Elena Ramos',
    email: 'elena@northstar.ai',
    plan: 'Enterprise',
    status: 'Active',
    company: 'Northstar Logistics',
    country: 'Spain',
    createdAt: '2025-03-22',
    monthlySpend: 6400,
  },
  {
    id: 'user-2',
    name: 'Marcus Lee',
    email: 'marcus@harborlabs.com',
    plan: 'Professional',
    status: 'Trial',
    company: 'Harbor Labs',
    country: 'United States',
    createdAt: '2026-01-05',
    monthlySpend: 1200,
  },
  {
    id: 'user-3',
    name: 'Sasha Kim',
    email: 'sasha@zenithcare.io',
    plan: 'Starter',
    status: 'Suspended',
    company: 'Zenith Care',
    country: 'South Korea',
    createdAt: '2025-11-18',
    monthlySpend: 350,
  },
  {
    id: 'user-4',
    name: 'Daniel Ortiz',
    email: 'daniel@altaworks.net',
    plan: 'Professional',
    status: 'Active',
    company: 'AltaWorks',
    country: 'Mexico',
    createdAt: '2024-12-09',
    monthlySpend: 2200,
  },
]

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Claims Copilot',
    owner: 'Elena Ramos',
    status: 'Active',
    skills: ['Policy Lookup', 'Document OCR', 'Escalation Routing'],
    region: 'eu-west-1',
    prompt:
      'You are an insurance claims assistant. Verify claim details, detect missing evidence, and draft concise follow-up actions.',
  },
  {
    id: 'agent-2',
    name: 'Onboarding Concierge',
    owner: 'Marcus Lee',
    status: 'Inactive',
    skills: ['Welcome Flows', 'CRM Sync', 'Task Prioritization'],
    region: 'us-east-2',
    prompt:
      'Guide new customers through onboarding with warm, direct language and strict compliance with account setup checklists.',
  },
  {
    id: 'agent-3',
    name: 'Care Triage Agent',
    owner: 'Sasha Kim',
    status: 'Failing',
    skills: ['Intent Classifier', 'Urgency Detection', 'HIPAA Guardrails'],
    region: 'ap-northeast-2',
    prompt:
      'Classify incoming patient intents and assign urgency tags while preserving privacy and avoiding diagnostic statements.',
  },
]

export const skills: Skill[] = [
  {
    id: 'skill-1',
    name: 'Document OCR',
    description: 'Extracts structured entities from uploaded PDFs and scans.',
    agentsUsing: 14,
    category: 'Data Extraction',
    version: 'v2.3.1',
  },
  {
    id: 'skill-2',
    name: 'Escalation Routing',
    description: 'Routes high-risk conversations to the correct team queue.',
    agentsUsing: 22,
    category: 'Workflow Automation',
    version: 'v1.9.0',
  },
  {
    id: 'skill-3',
    name: 'Intent Classifier',
    description: 'Predicts user intent categories with confidence scoring.',
    agentsUsing: 31,
    category: 'NLP',
    version: 'v4.0.2',
  },
  {
    id: 'skill-4',
    name: 'CRM Sync',
    description: 'Bi-directional sync of lead and customer profile updates.',
    agentsUsing: 11,
    category: 'Integrations',
    version: 'v3.4.5',
  },
]

export const contracts: AgentContract[] = [
  {
    id: 'contract-1',
    client: 'Northstar Logistics',
    rentedAgent: 'Claims Copilot',
    contractedSkills: ['Document OCR', 'Escalation Routing'],
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    totalAmount: 26800,
    lineItems: [
      { skill: 'Document OCR', monthlyPrice: 1100 },
      { skill: 'Escalation Routing', monthlyPrice: 1133.33 },
    ],
  },
  {
    id: 'contract-2',
    client: 'Harbor Labs',
    rentedAgent: 'Onboarding Concierge',
    contractedSkills: ['CRM Sync', 'Welcome Flows'],
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    totalAmount: 14640,
    lineItems: [
      { skill: 'CRM Sync', monthlyPrice: 620 },
      { skill: 'Welcome Flows', monthlyPrice: 600 },
    ],
  },
]

export const errorLogs: ErrorLogEntry[] = [
  {
    id: 'err-1',
    timestamp: '2026-06-20 14:35:19 UTC',
    agentName: 'Care Triage Agent',
    errorType: 'TimeoutError',
    description: 'External policy engine response exceeded 20 second threshold.',
    severity: 'Critical',
    resolved: false,
    trace:
      'TimeoutError: policyCheck() exceeded 20000ms\n at PolicyGateway.request (gateway.ts:84)\n at TriagePipeline.run (pipeline.ts:192)\n at async handler (api.ts:42)',
  },
  {
    id: 'err-2',
    timestamp: '2026-06-19 09:11:03 UTC',
    agentName: 'Claims Copilot',
    errorType: 'ValidationError',
    description: 'Missing claimant ID in incoming payload from partner webhook.',
    severity: 'Medium',
    resolved: false,
    trace:
      'ValidationError: claimantId is required\n at validatePayload (validator.ts:22)\n at webhookHandler (webhook.ts:58)',
  },
  {
    id: 'err-3',
    timestamp: '2026-06-18 17:54:55 UTC',
    agentName: 'Onboarding Concierge',
    errorType: 'RateLimitError',
    description: 'CRM API quota exhausted for tenant harborlabs.com.',
    severity: 'High',
    resolved: true,
    trace:
      'RateLimitError: HTTP 429 from CRM provider\n at retrySync (sync.ts:108)\n at queueWorker (worker.ts:46)',
  },
]

export const weeklyActivity = [72, 86, 64, 94, 105, 88, 91]
