import type { Prompt, Collection } from '../types/prompt';

export const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'work',
    name: 'Work',
    iconName: 'Briefcase',
    color: '#3b82f6', // blue
    description: 'Work-related tasks, client proposals, and team workflows',
    isDefault: true
  },
  {
    id: 'marketing',
    name: 'Marketing',
    iconName: 'TrendingUp',
    color: '#ec4899', // pink
    description: 'Campaigns, copy, SEO, and social media prompts',
    isDefault: true
  },
  {
    id: 'coding',
    name: 'Coding',
    iconName: 'Code',
    color: '#8b5cf6', // purple
    description: 'Code refactoring, debugging, and architecture prompts',
    isDefault: true
  },
  {
    id: 'personal',
    name: 'Personal',
    iconName: 'User',
    color: '#10b981', // emerald
    description: 'Personal notes, learning goals, and creative hobbies',
    isDefault: true
  }
];

export const INITIAL_PROMPTS: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'Senior TypeScript Code Refactor & Cleanup',
    collectionId: 'coding',
    category: 'Code Generation',
    tags: ['TypeScript', 'Coding', 'Refactoring', 'Clean Code'],
    content: `You are a Principal Software Architect specializing in {{language}}.
Review the following code snippet and refactor it for modern best practices, clean architecture, and optimal performance:

\`\`\`{{language}}
{{source_code}}
\`\`\`

Requirements:
1. Simplify complex control flow and nested conditions.
2. Ensure strict type safety and proper handling of asynchronous operations.
3. Add explanatory comments for non-trivial logic.`,
    notes: 'Use this whenever converting legacy code into clean modern TypeScript/JavaScript.',
    isFavorite: true,
    createdAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-08-14T15:30:00.000Z',
    variables: ['language', 'source_code'],
    currentVersion: 2,
    copyCount: 14,
    versions: [
      {
        id: 'v1-p1',
        versionNumber: 1,
        title: 'TypeScript Refactor Initial',
        content: `Refactor the following {{language}} code for cleanliness:\n\n{{source_code}}`,
        notes: 'Initial draft of refactor prompt.',
        savedAt: '2026-08-10T10:00:00.000Z',
        changeSummary: 'Initial creation'
      },
      {
        id: 'v2-p1',
        versionNumber: 2,
        title: 'Senior TypeScript Code Refactor & Cleanup',
        content: `You are a Principal Software Architect specializing in {{language}}.
Review the following code snippet and refactor it for modern best practices, clean architecture, and optimal performance:

\`\`\`{{language}}
{{source_code}}
\`\`\`

Requirements:
1. Simplify complex control flow and nested conditions.
2. Ensure strict type safety and proper handling of asynchronous operations.
3. Add explanatory comments for non-trivial logic.`,
        notes: 'Use this whenever converting legacy code into clean modern TypeScript/JavaScript.',
        savedAt: '2026-08-14T15:30:00.000Z',
        changeSummary: 'Added persona requirements and markdown code formatting.'
      }
    ]
  },
  {
    id: 'prompt-2',
    title: 'High-Converting B2B Cold Email Sequence',
    collectionId: 'marketing',
    category: 'Copywriting',
    tags: ['Cold Email', 'Marketing', 'Sales', 'B2B'],
    content: `Act as a Lead B2B Copywriter. Write a 3-step cold email outreach sequence for {{product_name}} targeting {{target_persona}}.

Core Benefit: {{core_benefit}}
Main Pain Point: {{pain_point}}

Step 1: Short, personalized curiosity hook (<100 words).
Step 2: Social proof & case study result.
Step 3: Low-friction CTA invite for a brief 10-minute demo.`,
    notes: 'Has generated a 32% open rate and 8% reply rate in past campaigns.',
    isFavorite: true,
    createdAt: '2026-08-11T12:00:00.000Z',
    updatedAt: '2026-08-13T09:15:00.000Z',
    variables: ['product_name', 'target_persona', 'core_benefit', 'pain_point'],
    currentVersion: 1,
    copyCount: 22,
    versions: [
      {
        id: 'v1-p2',
        versionNumber: 1,
        title: 'High-Converting B2B Cold Email Sequence',
        content: `Act as a Lead B2B Copywriter. Write a 3-step cold email outreach sequence for {{product_name}} targeting {{target_persona}}.

Core Benefit: {{core_benefit}}
Main Pain Point: {{pain_point}}

Step 1: Short, personalized curiosity hook (<100 words).
Step 2: Social proof & case study result.
Step 3: Low-friction CTA invite for a brief 10-minute demo.`,
        notes: 'Has generated a 32% open rate and 8% reply rate in past campaigns.',
        savedAt: '2026-08-11T12:00:00.000Z',
        changeSummary: 'Initial creation'
      }
    ]
  },
  {
    id: 'prompt-3',
    title: 'SEO Blog Post Outline Generator',
    collectionId: 'work',
    category: 'Creative Writing',
    tags: ['SEO', 'Blog', 'Content', 'Marketing'],
    content: `Create an exhaustive SEO blog post outline for the topic: "{{topic}}".

Primary Keyword: {{keyword}}
Target Audience: {{audience}}

Include:
- 3 Catchy H1 Headlines containing the primary keyword
- Introduction Hook using PAS (Problem-Agitate-Solve)
- Section-by-section H2 and H3 breakdown with key points to cover
- People Also Ask (PAA) FAQ section with answer summaries
- Actionable Conclusion and CTA`,
    notes: 'Outlines generated with this prompt rank well for long-tail keywords.',
    isFavorite: false,
    createdAt: '2026-08-12T14:30:00.000Z',
    updatedAt: '2026-08-12T14:30:00.000Z',
    variables: ['topic', 'keyword', 'audience'],
    currentVersion: 1,
    copyCount: 9,
    versions: [
      {
        id: 'v1-p3',
        versionNumber: 1,
        title: 'SEO Blog Post Outline Generator',
        content: `Create an exhaustive SEO blog post outline for the topic: "{{topic}}".

Primary Keyword: {{keyword}}
Target Audience: {{audience}}

Include:
- 3 Catchy H1 Headlines containing the primary keyword
- Introduction Hook using PAS (Problem-Agitate-Solve)
- Section-by-section H2 and H3 breakdown with key points to cover
- People Also Ask (PAA) FAQ section with answer summaries
- Actionable Conclusion and CTA`,
        notes: 'Outlines generated with this prompt rank well for long-tail keywords.',
        savedAt: '2026-08-12T14:30:00.000Z',
        changeSummary: 'Initial creation'
      }
    ]
  },
  {
    id: 'prompt-4',
    title: 'Viral YouTube Video Title & Hook Architect',
    collectionId: 'marketing',
    category: 'Creative Writing',
    tags: ['YouTube', 'Video', 'Viral Hook', 'CTR'],
    content: `You are a YouTube Algorithm Specialist. Create 10 clickworthy titles and 3 opening 30-second script hooks for a video titled "{{video_concept}}".

Audience: {{target_audience}}

Requirements:
- Titles: Mix of Curiosity Gap, High Stakes, and How-To formats (<60 characters).
- Hooks: 1st 10 seconds must include a visual pattern interrupt statement.`,
    notes: 'Great for boosting click-through rate (CTR) and first 30s viewer retention.',
    isFavorite: true,
    createdAt: '2026-08-08T09:00:00.000Z',
    updatedAt: '2026-08-15T08:00:00.000Z',
    variables: ['video_concept', 'target_audience'],
    currentVersion: 1,
    copyCount: 18,
    versions: [
      {
        id: 'v1-p4',
        versionNumber: 1,
        title: 'Viral YouTube Video Title & Hook Architect',
        content: `You are a YouTube Algorithm Specialist. Create 10 clickworthy titles and 3 opening 30-second script hooks for a video titled "{{video_concept}}".

Audience: {{target_audience}}

Requirements:
- Titles: Mix of Curiosity Gap, High Stakes, and How-To formats (<60 characters).
- Hooks: 1st 10 seconds must include a visual pattern interrupt statement.`,
        notes: 'Great for boosting click-through rate (CTR) and first 30s viewer retention.',
        savedAt: '2026-08-08T09:00:00.000Z',
        changeSummary: 'Initial creation'
      }
    ]
  },
  {
    id: 'prompt-5',
    title: 'System Prompt Architect for Custom AI Agents',
    collectionId: 'coding',
    category: 'System Prompt',
    tags: ['System Prompt', 'ChatGPT', 'Claude', 'Agent'],
    content: `You are a Lead Prompt Engineer. Build a production-grade system prompt for an AI agent role: "{{role_name}}".

Agent Goal: {{agent_goal}}
Domain Constraints: {{constraints}}

Output Format:
# Identity & Tone
# Core Rules & Directives
# Input / Output Schema
# Few-Shot Examples (2 input/output pairs)
# Error Handling & Edge Cases`,
    notes: 'Use this for constructing reliable system prompts for LLM applications.',
    isFavorite: false,
    createdAt: '2026-08-09T16:00:00.000Z',
    updatedAt: '2026-08-14T11:20:00.000Z',
    variables: ['role_name', 'agent_goal', 'constraints'],
    currentVersion: 1,
    copyCount: 7,
    versions: [
      {
        id: 'v1-p5',
        versionNumber: 1,
        title: 'System Prompt Architect for Custom AI Agents',
        content: `You are a Lead Prompt Engineer. Build a production-grade system prompt for an AI agent role: "{{role_name}}".

Agent Goal: {{agent_goal}}
Domain Constraints: {{constraints}}

Output Format:
# Identity & Tone
# Core Rules & Directives
# Input / Output Schema
# Few-Shot Examples (2 input/output pairs)
# Error Handling & Edge Cases`,
        notes: 'Use this for constructing reliable system prompts for LLM applications.',
        savedAt: '2026-08-09T16:00:00.000Z',
        changeSummary: 'Initial creation'
      }
    ]
  },
  {
    id: 'prompt-6',
    title: 'Daily Productivity & Task Prioritization Planner',
    collectionId: 'personal',
    category: 'Productivity',
    tags: ['Productivity', 'Planner', 'Time Management'],
    content: `Act as an Executive Performance Coach. Help me structure my workday for maximum focus.

My Goals for Today:
{{today_tasks}}

Available Time: {{working_hours}}

Provide:
1. EisenHower Matrix categorization (Urgent/Important)
2. Time-blocked schedule breakdown
3. Top 3 "Must-Win" objectives for the day`,
    notes: 'Generates a focused time-boxed daily schedule.',
    isFavorite: false,
    createdAt: '2026-08-13T08:00:00.000Z',
    updatedAt: '2026-08-13T08:00:00.000Z',
    variables: ['today_tasks', 'working_hours'],
    currentVersion: 1,
    copyCount: 5,
    versions: [
      {
        id: 'v1-p6',
        versionNumber: 1,
        title: 'Daily Productivity & Task Prioritization Planner',
        content: `Act as an Executive Performance Coach. Help me structure my workday for maximum focus.

My Goals for Today:
{{today_tasks}}

Available Time: {{working_hours}}

Provide:
1. EisenHower Matrix categorization (Urgent/Important)
2. Time-blocked schedule breakdown
3. Top 3 "Must-Win" objectives for the day`,
        notes: 'Generates a focused time-boxed daily schedule.',
        savedAt: '2026-08-13T08:00:00.000Z',
        changeSummary: 'Initial creation'
      }
    ]
  }
];
