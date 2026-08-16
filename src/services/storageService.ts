import type { Prompt, Collection, AnalyticsData, AIKeyConfig } from '../types/prompt';
import { INITIAL_PROMPTS, DEFAULT_COLLECTIONS } from '../data/initialPrompts';

const KEYS = {
  PROMPTS: 'ai_prompt_vault_prompts_v1',
  COLLECTIONS: 'ai_prompt_vault_collections_v1',
  ANALYTICS: 'ai_prompt_vault_analytics_v1',
  THEME: 'ai_prompt_vault_theme_v1',
  AI_KEY: 'ai_prompt_vault_aikey_v1'
};

export const storageService = {
  // --- Prompts ---
  getPrompts: (): Prompt[] => {
    try {
      const data = localStorage.getItem(KEYS.PROMPTS);
      if (!data) {
        localStorage.setItem(KEYS.PROMPTS, JSON.stringify(INITIAL_PROMPTS));
        return INITIAL_PROMPTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load prompts from storage', e);
      return INITIAL_PROMPTS;
    }
  },

  savePrompts: (prompts: Prompt[]): void => {
    try {
      localStorage.setItem(KEYS.PROMPTS, JSON.stringify(prompts));
    } catch (e) {
      console.error('Failed to save prompts to storage', e);
    }
  },

  // --- Collections ---
  getCollections: (): Collection[] => {
    try {
      const data = localStorage.getItem(KEYS.COLLECTIONS);
      if (!data) {
        localStorage.setItem(KEYS.COLLECTIONS, JSON.stringify(DEFAULT_COLLECTIONS));
        return DEFAULT_COLLECTIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load collections from storage', e);
      return DEFAULT_COLLECTIONS;
    }
  },

  saveCollections: (collections: Collection[]): void => {
    try {
      localStorage.setItem(KEYS.COLLECTIONS, JSON.stringify(collections));
    } catch (e) {
      console.error('Failed to save collections to storage', e);
    }
  },

  // --- Analytics ---
  getAnalytics: (): AnalyticsData => {
    try {
      const data = localStorage.getItem(KEYS.ANALYTICS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load analytics', e);
    }
    const initial: AnalyticsData = {
      totalCopies: 85,
      aiEnhancementsUsed: 12,
      mostCopiedPromptId: 'prompt-2',
      categoryUsageMap: {
        'Copywriting': 22,
        'Code Generation': 14,
        'Creative Writing': 27,
        'System Prompt': 7,
        'Productivity': 5
      },
      lastActivityAt: new Date().toISOString()
    };
    localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(initial));
    return initial;
  },

  saveAnalytics: (analytics: AnalyticsData): void => {
    try {
      localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(analytics));
    } catch (e) {
      console.error('Failed to save analytics', e);
    }
  },

  // --- Theme ---
  getTheme: (): 'dark' | 'light' => {
    try {
      const data = localStorage.getItem(KEYS.THEME);
      if (data === 'dark' || data === 'light') return data;
    } catch (e) {
      console.error('Failed to load theme', e);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
  },

  saveTheme: (theme: 'dark' | 'light'): void => {
    try {
      localStorage.setItem(KEYS.THEME, theme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  },

  // --- AI Key Settings ---
  getAIConfig: (): AIKeyConfig => {
    try {
      const data = localStorage.getItem(KEYS.AI_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load AI Key config', e);
    }
    return {
      apiKey: '',
      model: 'gpt-4o-mini',
      enabled: false
    };
  },

  saveAIConfig: (config: AIKeyConfig): void => {
    try {
      localStorage.setItem(KEYS.AI_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save AI config', e);
    }
  }
};
