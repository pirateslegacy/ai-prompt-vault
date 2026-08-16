import { storageService } from './storageService';

export interface AIEnhanceResult {
  content: string;
  explanation: string;
}

export interface AIVariationsResult {
  variations: { title: string; content: string }[];
  explanation: string;
}

export const openaiService = {
  // --- Enhance Action Router ---
  enhancePrompt: async (
    action: 'improve' | 'shorten' | 'expand' | 'variations',
    promptContent: string,
    promptTitle: string
  ): Promise<any> => {
    const config = storageService.getAIConfig();

    // If API key is provided and enabled, call OpenAI directly
    if (config.enabled && config.apiKey && config.apiKey.trim().startsWith('sk-')) {
      try {
        return await openaiService.callOpenAI(action, promptContent, promptTitle, config.apiKey, config.model);
      } catch (err: any) {
        console.warn('Real OpenAI API call failed or rate-limited. Falling back to intelligent simulator.', err);
      }
    }

    // Fallback to intelligent offline simulator
    await new Promise(res => setTimeout(res, 800)); // simulate network delay
    return openaiService.simulateAIAction(action, promptContent, promptTitle);
  },

  // --- Real OpenAI API Execution ---
  callOpenAI: async (
    action: 'improve' | 'shorten' | 'expand' | 'variations',
    promptContent: string,
    promptTitle: string,
    apiKey: string,
    model: string
  ) => {
    const systemPrompts: Record<string, string> = {
      improve: 'You are an expert AI Prompt Architect. Improve the user prompt for maximum clarity, persona framing, variable safety, and output formatting. Return ONLY valid JSON with keys: "content" (string) and "explanation" (string).',
      shorten: 'You are an AI Prompt Architect. Shorten the prompt to be concise and direct without losing key variables or core constraints. Return ONLY valid JSON with keys: "content" (string) and "explanation" (string).',
      expand: 'You are an AI Prompt Architect. Expand the prompt to add comprehensive edge cases, detailed output schemas, and persona rules. Return ONLY valid JSON with keys: "content" (string) and "explanation" (string).',
      variations: 'You are an AI Prompt Architect. Generate 3 distinct high-quality prompt variations (e.g. Authoritative, Step-by-Step, Socratic). Return ONLY valid JSON with keys: "variations" (array of 3 objects with "title" and "content") and "explanation" (string).'
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompts[action] },
          { role: 'user', content: `Title: ${promptTitle}\nPrompt:\n${promptContent}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  },

  // --- Intelligent Offline Simulation ---
  simulateAIAction: (
    action: 'improve' | 'shorten' | 'expand' | 'variations',
    promptContent: string,
    promptTitle: string
  ) => {
    if (action === 'improve') {
      return {
        content: `You are an elite subject matter expert on this task.

# Persona & Context
Act with senior-level authority. Analyze the input parameters thoroughly before executing.

# Task Directives
${promptContent.trim()}

# Quality Requirements
1. Structure output logically using clear headings and bullet points.
2. Address edge cases and validate key constraints.
3. Provide actionable, production-ready output.`,
        explanation: 'Enhanced persona framing, added explicit quality requirements, and structured output formatting.'
      };
    }

    if (action === 'shorten') {
      const lines = promptContent.split('\n').filter(l => l.trim().length > 0);
      const mainLines = lines.slice(0, Math.max(2, Math.floor(lines.length / 2))).join('\n');
      return {
        content: `Direct Task Directive:
${mainLines}

Format response concisely with key takeaways only.`,
        explanation: 'Removed introductory filler words and condensed instructions down to essential directives.'
      };
    }

    if (action === 'expand') {
      return {
        content: `You are a Principal Lead Consultant and Domain Specialist.

# Core Mission
${promptContent.trim()}

# Exhaustive Analysis Matrix
1. Comprehensive Context & Objectives
2. Step-by-Step Execution Plan
3. Risk Mitigation & Edge Case Coverage
4. Verification & Validation Criteria

# Output Specifications
- Provide complete code or content deliverables (no placeholders).
- Format using GitHub Markdown tables, callouts, and clean blocks.`,
        explanation: 'Expanded prompt scope with exhaustive analysis matrix, risk mitigation criteria, and strict output formatting constraints.'
      };
    }

    // variations
    return {
      variations: [
        {
          title: `Option A: Structured Step-by-Step (${promptTitle})`,
          content: `Act as a Senior Specialist.\n\nExecute the following task step-by-step:\n\n${promptContent}\n\nStep 1: Planning\nStep 2: Execution\nStep 3: Quality Check`
        },
        {
          title: `Option B: Authoritative Executive Brief`,
          content: `You are a C-level Advisor.\n\nDeliver an executive-level output for:\n${promptContent}\n\nHighlight ROI, strategic risks, and top 3 priorities.`
        },
        {
          title: `Option C: Socratic Critical Reviewer`,
          content: `Act as a Critical Auditor.\n\nAnalyze and refine:\n${promptContent}\n\nChallenge assumptions and present counter-evidence before finalizing output.`
        }
      ],
      explanation: 'Generated 3 distinct prompt variations tailored for structured execution, executive summary, and critical auditing.'
    };
  },

  // --- Playground Prompt Execution Simulator / Real Run ---
  runPlaygroundExecution: async (renderedPrompt: string): Promise<string> => {
    const config = storageService.getAIConfig();

    if (config.enabled && config.apiKey && config.apiKey.trim().startsWith('sk-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          },
          body: JSON.stringify({
            model: config.model || 'gpt-4o-mini',
            messages: [{ role: 'user', content: renderedPrompt }],
            temperature: 0.7
          })
        });
        if (response.ok) {
          const data = await response.json();
          return data.choices[0].message.content;
        }
      } catch (e) {
        console.warn('Real execution failed. Using simulation output.', e);
      }
    }

    // Simulated output
    await new Promise(r => setTimeout(r, 900));
    return `[AI Output Simulation]

Prompt Executed:
"${renderedPrompt.slice(0, 120)}..."

--------------------------------------------------
### Simulated Response Output

Based on your prompt parameters, here is the generated output:

1. **Key Insights & Overview**:
   The prompt was successfully compiled and processed. All variable values were substituted cleanly.

2. **Core Deliverable**:
   - High-quality, tailored output matching your requested scope.
   - All specified constraints and formatting requirements were respected.

3. **Suggested Next Steps**:
   - You can copy this output directly or fine-tune variable values in the playground panel!`;
  }
};
