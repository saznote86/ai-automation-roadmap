export interface Topic {
  id: string;
  title: string;
  explanation: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  keyTakeaways: string[];
}

export interface PhaseProject {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tips: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Phase {
  id: number;
  slug: string;
  number: string;
  title: string;
  duration: string;
  badgeColor: string;
  summary: string;
  importance: string;
  topics: Topic[];
  projects: PhaseProject[];
  quiz: QuizQuestion[];
}

export interface PortfolioProject {
  id: number;
  title: string;
  difficulty: string;
  difficultyColor: string;
  summary: string;
  businessValue: string;
  tools: string[];
  steps: string[];
  samplePayload: {
    input: string;
    output: string;
  };
}

export interface CommonMistake {
  id: number;
  mistake: string;
  whyItHurts: string;
  theFix: string;
}

export interface TechStackItem {
  category: string;
  primaryTool: string;
  alternatives: string[];
  description: string;
  badge: string;
}
