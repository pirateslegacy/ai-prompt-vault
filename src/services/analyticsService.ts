import { storageService } from './storageService';
import type { Prompt } from '../types/prompt';

export const analyticsService = {
  recordCopy: (promptId: string, category: string, prompts: Prompt[]): { updatedAnalytics: any, updatedPrompts: Prompt[] } => {
    const analytics = storageService.getAnalytics();
    
    // 1. Update prompt copy count
    const updatedPrompts = prompts.map(p => {
      if (p.id === promptId) {
        return { ...p, copyCount: (p.copyCount || 0) + 1 };
      }
      return p;
    });

    // 2. Find most copied prompt
    let maxCopies = 0;
    let topId = analytics.mostCopiedPromptId;
    updatedPrompts.forEach(p => {
      if (p.copyCount > maxCopies) {
        maxCopies = p.copyCount;
        topId = p.id;
      }
    });

    // 3. Update category usage
    const catMap = { ...analytics.categoryUsageMap };
    catMap[category] = (catMap[category] || 0) + 1;

    const updatedAnalytics = {
      ...analytics,
      totalCopies: analytics.totalCopies + 1,
      mostCopiedPromptId: topId,
      categoryUsageMap: catMap,
      lastActivityAt: new Date().toISOString()
    };

    storageService.savePrompts(updatedPrompts);
    storageService.saveAnalytics(updatedAnalytics);

    return { updatedAnalytics, updatedPrompts };
  },

  recordAIEnhancement: () => {
    const analytics = storageService.getAnalytics();
    const updated = {
      ...analytics,
      aiEnhancementsUsed: analytics.aiEnhancementsUsed + 1,
      lastActivityAt: new Date().toISOString()
    };
    storageService.saveAnalytics(updated);
    return updated;
  }
};
