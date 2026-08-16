export type CategoryType = 
  | 'System Prompt'
  | 'Creative Writing'
  | 'Code Generation'
  | 'Data Analysis'
  | 'Copywriting'
  | 'Brainstorming'
  | 'Productivity'
  | 'Custom';

export type TemplatePackType = 'Coding' | 'Marketing' | 'Writing' | 'Research' | 'YouTube';

export interface PromptVersion {
  id: string;
  versionNumber: number;
  title: string;
  content: string;
  notes: string;
  savedAt: string;
  changeSummary: string;
}

export interface Prompt {
  id: string;
  title: string;
  collectionId: string; // e.g. 'work', 'marketing', 'coding', 'personal', or custom id
  category: CategoryType;
  tags: string[];
  content: string;
  notes: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  variables: string[]; // parsed {{var}} names
  currentVersion: number;
  versions: PromptVersion[];
  copyCount: number;
}

export interface Collection {
  id: string;
  name: string;
  iconName: string;
  color: string;
  description: string;
  isDefault?: boolean;
}

export interface PromptTemplate {
  id: string;
  title: string;
  pack: TemplatePackType;
  category: CategoryType;
  tags: string[];
  content: string;
  notes: string;
  variables: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  description: string;
}

export interface AnalyticsData {
  totalCopies: number;
  aiEnhancementsUsed: number;
  mostCopiedPromptId: string | null;
  categoryUsageMap: Record<string, number>;
  lastActivityAt: string;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'updatedAt' | 'createdAt' | 'title' | 'favorites' | 'copyCount';
export type ActiveTab = 'dashboard' | 'library' | 'playground' | 'templates' | 'analytics';

export interface AIKeyConfig {
  apiKey: string;
  model: string;
  enabled: boolean;
}

export interface PlaygroundState {
  promptId?: string;
  title: string;
  content: string;
  variables: Record<string, string>;
  renderedOutput: string;
  aiOutput: string;
  isExecuting: boolean;
  temperature: number;
}
