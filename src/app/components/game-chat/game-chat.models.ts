export enum AgentType {
  PROJECT_GUIDE = 'PROJECT_GUIDE',
  TECH_EXPERT = 'TECH_EXPERT',
  PORTFOLIO_HOST = 'PORTFOLIO_HOST',
  CONTACT_ASSISTANT = 'CONTACT_ASSISTANT'
}

export interface AgentInfo {
  type: AgentType;
  name: string;
  icon: string;
  color: string;
  personality: 'formal' | 'casual' | 'technical' | 'enthusiastic';
  expertise: string[];
  greetingTemplates: string[];
}

export interface ContextInfo {
  section: string;
  projectId?: string;
  metadata: any;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  agent: AgentInfo;
  context: ContextInfo;
  suggestions?: string[];
  isContextual: boolean;
  from: 'user' | 'bot';
}

export interface ProjectContext {
  projectId: string;
  title: string;
  technologies: string[];
  viewedAt: Date;
}
