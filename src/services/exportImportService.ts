import type { Prompt, Collection } from '../types/prompt';

export interface VaultBackup {
  version: string;
  exportedAt: string;
  prompts: Prompt[];
  collections: Collection[];
}

export const exportImportService = {
  exportVault: (prompts: Prompt[], collections: Collection[]) => {
    const data: VaultBackup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      prompts,
      collections
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vaultforprompt-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  validateAndParseImport: (fileContent: string): VaultBackup => {
    let parsed: any;
    try {
      parsed = JSON.parse(fileContent);
    } catch {
      throw new Error('Invalid JSON file format.');
    }

    if (!parsed || (typeof parsed !== 'object' && !Array.isArray(parsed))) {
      throw new Error('Invalid backup file. Please select a valid VaultForPrompt JSON backup.');
    }

    const rawPrompts = Array.isArray(parsed) ? parsed : parsed.prompts;
    if (!Array.isArray(rawPrompts)) {
      throw new Error('Invalid backup file. JSON structure does not contain a valid prompts list.');
    }

    const rawCollections = parsed && Array.isArray(parsed.collections) ? parsed.collections : [];

    // Safe schema validation
    const prompts: Prompt[] = rawPrompts.map((p: any, idx: number) => {
      if (!p || typeof p !== 'object' || !p.title || !p.content) {
        throw new Error(`Prompt at position ${idx + 1} is missing required title or content.`);
      }
      return {
        id: p.id || `prompt-${Date.now()}-${idx}`,
        title: String(p.title),
        collectionId: p.collectionId || 'work',
        category: p.category || 'general',
        tags: Array.isArray(p.tags) ? p.tags : [],
        content: String(p.content),
        notes: p.notes || '',
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
        variables: Array.isArray(p.variables) ? p.variables : [],
        copyCount: typeof p.copyCount === 'number' ? p.copyCount : 0,
        isFavorite: Boolean(p.isFavorite),
        currentVersion: typeof p.currentVersion === 'number' ? p.currentVersion : 1,
        versions: Array.isArray(p.versions) ? p.versions : []
      };
    });

    const collections: Collection[] = rawCollections.map((c: any, idx: number) => ({
      id: c.id || `col-${Date.now()}-${idx}`,
      name: c.name || `Collection ${idx + 1}`,
      description: c.description || '',
      color: c.color || '#6366f1',
      iconName: c.iconName || 'Folder',
      isSystem: Boolean(c.isSystem)
    }));

    return {
      version: parsed.version || '1.0.0',
      exportedAt: parsed.exportedAt || new Date().toISOString(),
      prompts,
      collections
    };
  }
};
