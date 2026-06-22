export type NavSection =
  | 'dashboard'
  | 'users'
  | 'agents'
  | 'skills'
  | 'contracts'
  | 'errors'

export type PlanType = 'Starter' | 'Professional' | 'Enterprise'
export type UserStatus = 'Active' | 'Trial' | 'Suspended'

export interface User {
  id: string
  name: string
  email: string
  plan: PlanType
  status: UserStatus
  company: string
  country: string
  createdAt: string
  monthlySpend: number
}

export type AgentStatus = 'Active' | 'Inactive' | 'Failing'

export interface Agent {
  id: string
  name: string
  owner: string
  status: AgentStatus
  skills: string[]
  prompt: string
  region: string
}

export interface Skill {
  id: string
  name: string
  description: string
  agentsUsing: number
  category: string
  version: string
}

export interface ContractLineItem {
  skill: string
  monthlyPrice: number
}

export interface AgentContract {
  id: string
  client: string
  rentedAgent: string
  contractedSkills: string[]
  startDate: string
  endDate: string
  totalAmount: number
  lineItems: ContractLineItem[]
}

export type ErrorSeverity = 'Critical' | 'High' | 'Medium' | 'Low'

export interface ErrorLogEntry {
  id: string
  timestamp: string
  agentName: string
  errorType: string
  description: string
  severity: ErrorSeverity
  trace: string
  resolved: boolean
}
