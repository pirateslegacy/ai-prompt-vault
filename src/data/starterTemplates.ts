import type { PromptTemplate } from '../types/prompt';

export const STARTER_TEMPLATES: PromptTemplate[] = [
  // --- CODING PACK (10) ---
  {
    id: 'tmpl-code-1',
    title: 'Clean Code Refactoring Architect',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Coding', 'Refactoring', 'Clean Code', 'TypeScript'],
    content: `You are a Senior Software Engineer specializing in {{language}}.
Review the following code snippet and refactor it to enhance readability, performance, and adherence to clean code principles:

Code Snippet:
\`\`\`{{language}}
{{code_snippet}}
\`\`\`

Requirements:
1. Replace bad smells and nested loops with modern idiom structures.
2. Maintain full functionality and handle edge cases gracefully.
3. Provide a line-by-line summary of refactoring improvements made.`,
    notes: 'Ideal for upgrading legacy code blocks to modern standards.',
    variables: ['language', 'code_snippet'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Refactors raw code for readability, performance, and modern best practices.'
  },
  {
    id: 'tmpl-code-2',
    title: 'Unit Test Generator Suite',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Coding', 'Unit Tests', 'Jest', 'PyTest'],
    content: `Act as a Principal QA Engineer. Write comprehensive unit test cases using {{testing_framework}} for the code provided below:

Code:
\`\`\`
{{target_code}}
\`\`\`

Coverage Checklist:
- Happy path execution
- Boundary limits and edge cases
- Error throwing and exception handling
- Mock external dependencies where appropriate`,
    notes: 'Generates robust unit tests with full edge case coverage.',
    variables: ['testing_framework', 'target_code'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Generates complete unit tests with happy paths, edge cases, and mocks.'
  },
  {
    id: 'tmpl-code-3',
    title: 'Security Code Auditor & Vulnerability Scanner',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Coding', 'Security', 'Audit', 'OWASP'],
    content: `You are a Lead Cybersecurity Specialist auditing source code for OWASP Top 10 vulnerabilities.
Analyze the following code for security risks:

Code:
\`\`\`{{language}}
{{code_to_audit}}
\`\`\`

Format Report:
1. Vulnerability Findings (Severity: High / Medium / Low)
2. Attack Vector Analysis
3. Recommended Secure Code Fix`,
    notes: 'Scans for SQL injection, XSS, insecure headers, and memory leaks.',
    variables: ['language', 'code_to_audit'],
    difficulty: 'Advanced',
    rating: 5.0,
    description: 'Identifies OWASP vulnerabilities and provides hardened code fixes.'
  },
  {
    id: 'tmpl-code-4',
    title: 'SQL Query Performance Optimizer',
    pack: 'Coding',
    category: 'Data Analysis',
    tags: ['SQL', 'Database', 'Performance', 'Index'],
    content: `Act as a Senior Database Administrator. Optimize the following SQL query for {{database_engine}}:

Original SQL Query:
\`\`\`sql
{{sql_query}}
\`\`\`

Context & Schema Info:
{{schema_details}}

Task:
1. Rewrite query to minimize full table scans.
2. Recommend indexes or partitioning strategies.
3. Explain execution plan improvements.`,
    notes: 'Improves slow SELECT queries and index strategies.',
    variables: ['database_engine', 'sql_query', 'schema_details'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Optimizes slow SQL queries and recommends index execution strategies.'
  },
  {
    id: 'tmpl-code-5',
    title: 'Regex Pattern Generator & Explainer',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Regex', 'Coding', 'Validation'],
    content: `Create a regular expression in {{regex_flavour}} that accomplishes the following task:

Matching Goal: {{goal_description}}

Format:
1. The Exact Regex Pattern
2. Break-down explanation of each regex token
3. Example test strings that MATCH
4. Example test strings that FAIL`,
    notes: 'Generates regex patterns with breakdown explanations.',
    variables: ['regex_flavour', 'goal_description'],
    difficulty: 'Beginner',
    rating: 4.6,
    description: 'Constructs custom regex patterns with step-by-step token explanations.'
  },
  {
    id: 'tmpl-code-6',
    title: 'REST API OpenAPI / Swagger Spec Generator',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['API', 'OpenAPI', 'Swagger', 'Documentation'],
    content: `Act as an API Architect. Convert the following API endpoint requirements into a valid OpenAPI 3.0 YAML specification:

Endpoint Goal: {{endpoint_goal}}
HTTP Method: {{http_method}}
Request Payload Fields: {{request_fields}}
Response Output Fields: {{response_fields}}`,
    notes: 'Outputs clean OpenAPI 3.0 spec YAML.',
    variables: ['endpoint_goal', 'http_method', 'request_fields', 'response_fields'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Converts endpoint specs into OpenAPI 3.0 YAML ready for documentation.'
  },
  {
    id: 'tmpl-code-7',
    title: 'Git Conventional Commit Message Generator',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Git', 'Workflow', 'Productivity'],
    content: `Review the following git diff output and write a clear Conventional Commit message:

Diff Summary:
\`\`\`
{{git_diff}}
\`\`\`

Format strictly as:
<type>(<scope>): <short description>

[optional body detailing rationale]`,
    notes: 'Creates standardized commit messages from git diffs.',
    variables: ['git_diff'],
    difficulty: 'Beginner',
    rating: 4.9,
    description: 'Generates clear Conventional Commit messages directly from code diffs.'
  },
  {
    id: 'tmpl-code-8',
    title: 'Production Dockerfile & Compose Builder',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Docker', 'DevOps', 'Deployment'],
    content: `Create a multi-stage, hardened Dockerfile for a {{tech_stack}} application.

Key Constraints:
- Use lightweight minimal base image (e.g. Alpine / Distroless)
- Run as non-root user
- Layer caching optimization
- Environment variables: {{env_variables}}`,
    notes: 'Builds secure, multi-stage production Dockerfiles.',
    variables: ['tech_stack', 'env_variables'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Generates multi-stage production Dockerfiles with security hardening.'
  },
  {
    id: 'tmpl-code-9',
    title: 'Runtime Error Diagnostic & Stack Trace Solver',
    pack: 'Coding',
    category: 'Code Generation',
    tags: ['Debugging', 'Error', 'Stack Trace'],
    content: `I encountered the following runtime error:

Error Message & Stack Trace:
\`\`\`
{{error_stack_trace}}
\`\`\`

Application Context: {{context_info}}

Please diagnose:
1. Root Cause of the exception
2. Step-by-step fix instructions
3. Corrected code snippet`,
    notes: 'Traces stack trace errors to root cause fixes.',
    variables: ['error_stack_trace', 'context_info'],
    difficulty: 'Beginner',
    rating: 4.9,
    description: 'Diagnoses error messages and stack traces with step-by-step fixes.'
  },
  {
    id: 'tmpl-code-10',
    title: 'System Architecture Design Spec (C4 Model)',
    pack: 'Coding',
    category: 'System Prompt',
    tags: ['Architecture', 'System Design', 'C4 Model'],
    content: `Act as a Staff Solutions Architect. Create a high-level system design document for {{system_name}}.

Key System Goal: {{system_goal}}
Expected Traffic Load: {{expected_load}}

Provide:
1. Component Architecture Breakdown
2. Database selection & Data Flow diagram in Mermaid syntax
3. Caching, Load Balancing, and Reliability Strategy`,
    notes: 'Generates full system design docs with Mermaid diagrams.',
    variables: ['system_name', 'system_goal', 'expected_load'],
    difficulty: 'Advanced',
    rating: 5.0,
    description: 'Creates C4 system architecture specs with Mermaid flow diagrams.'
  },

  // --- MARKETING PACK (11) ---
  {
    id: 'tmpl-mkt-1',
    title: 'High-Converting Cold Email Sequence (4-Step)',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['Cold Email', 'Sales', 'B2B', 'Outreach'],
    content: `You are an elite B2B Copywriter. Create a 4-step cold email cadence for selling {{product_service}} to {{target_persona}}.

Value Proposition: {{value_prop}}
Main Pain Point Solved: {{pain_point}}

Step 1: Initial Curiosity Hook
Step 2: Social Proof & Case Study
Step 3: Direct Value Offer
Step 4: Soft Breakup / Low-friction CTA`,
    notes: 'Proven cold email sequence format with low-friction CTAs.',
    variables: ['product_service', 'target_persona', 'value_prop', 'pain_point'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Crafts a 4-step B2B cold email sequence optimized for reply rates.'
  },
  {
    id: 'tmpl-mkt-2',
    title: 'SaaS Landing Page Hero Section Copywriter',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['Landing Page', 'SaaS', 'Conversion'],
    content: `Act as a Conversion Rate Optimization (CRO) Lead. Write 3 alternative hero section copy variations for a product named {{product_name}}.

Target Audience: {{target_audience}}
Core Benefit: {{core_benefit}}

For each variation provide:
- Catchy H1 Headline (max 8 words)
- Subheadline (max 2 sentences)
- Primary CTA Button text
- Secondary Social Proof badge copy`,
    notes: 'Generates high-converting SaaS landing page headlines.',
    variables: ['product_name', 'target_audience', 'core_benefit'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Generates 3 conversion-focused hero headlines and subheadlines.'
  },
  {
    id: 'tmpl-mkt-3',
    title: 'Product Hunt Launch Announcement Post',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['Product Hunt', 'Launch', 'Marketing'],
    content: `Draft a compelling Product Hunt Maker Comment & Launch Post for {{product_name}}.

Product Description: {{product_description}}
Key Features: {{key_features}}
Launch Discount / Freebie: {{offer}}

Include storytelling intro, why we built it, key features list, and maker call-to-action.`,
    notes: 'Tailored for maximum upvotes and maker engagement on Product Hunt.',
    variables: ['product_name', 'product_description', 'key_features', 'offer'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Drafts engaging Product Hunt launch post and maker introduction.'
  },
  {
    id: 'tmpl-mkt-4',
    title: 'Google & Facebook Ads Copy Generator',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['Google Ads', 'PPC', 'Facebook Ads'],
    content: `Act as a Senior Performance Marketer. Create high-CTR ad text options for {{product_name}}.

Offer: {{offer_details}}
Target Keyword: {{target_keyword}}

Generate:
- 5 Google Search Ad Headlines (30 chars max)
- 3 Google Search Ad Descriptions (90 chars max)
- 2 Facebook/Instagram Ad Primary Text variations (with emojis)`,
    notes: 'Generates character-counted PPC ad variations.',
    variables: ['product_name', 'offer_details', 'target_keyword'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Generates character-compliant search and social media ad copy.'
  },
  {
    id: 'tmpl-mkt-5',
    title: 'LinkedIn Thought Leadership Post (AIDA Framework)',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['LinkedIn', 'Social Media', 'Viral'],
    content: `Write a viral-style LinkedIn text post using the Attention-Interest-Desire-Action (AIDA) structure.

Topic: {{industry_topic}}
Key Insight or Hot Take: {{hot_take}}
Target Audience: {{audience}}

Ensure short 1-line sentences, whitespace for readability, and an engaging question ending.`,
    notes: 'Formatted specifically for high LinkedIn dwell time and comments.',
    variables: ['industry_topic', 'hot_take', 'audience'],
    difficulty: 'Beginner',
    rating: 4.9,
    description: 'Drafts viral LinkedIn thought leadership posts using AIDA framework.'
  },
  {
    id: 'tmpl-mkt-6',
    title: 'Buyer Persona Profile Builder',
    pack: 'Marketing',
    category: 'Brainstorming',
    tags: ['Persona', 'Customer Research', 'Strategy'],
    content: `Act as a Chief Marketing Officer. Build a detailed Ideal Customer Profile (ICP) buyer persona for {{product_type}}.

Details to generate:
1. Demographics & Job Title
2. Key Goals & KPIs
3. Top 3 Pain Points & Frustrations
4. Objections to buying
5. Preferred Channels & Influencers`,
    notes: 'Comprehensive persona document for strategic alignment.',
    variables: ['product_type'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Generates detailed Ideal Customer Profile (ICP) personas.'
  },
  {
    id: 'tmpl-mkt-7',
    title: 'Email Newsletter Subject Line Generator (10 Hooks)',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['Email', 'Subject Line', 'Open Rate'],
    content: `Write 10 captivating email subject lines for a newsletter issue about {{newsletter_topic}}.

Include styles:
- Curiosity Gap
- Urgency / FOMO
- Numbers & Lists
- Direct Benefit
- How-to style`,
    notes: 'Generates high-open-rate subject lines.',
    variables: ['newsletter_topic'],
    difficulty: 'Beginner',
    rating: 4.6,
    description: 'Generates 10 subject lines engineered for maximum email open rates.'
  },
  {
    id: 'tmpl-mkt-8',
    title: 'SaaS Pricing Tier & Value Proposition Strategy',
    pack: 'Marketing',
    category: 'Brainstorming',
    tags: ['Pricing', 'SaaS', 'Monetization'],
    content: `Design a 3-Tier Pricing Structure (Free/Starter, Pro, Enterprise) for a SaaS product in the {{niche}} industry.

Product Core Capabilities: {{capabilities}}

Specify:
- Tier Names & Monthly/Annual Pricing Recommendation
- Feature Matrix allocation
- Target buyer per tier
- Upsell trigger mechanism`,
    notes: 'Strategic tiering for SaaS products.',
    variables: ['niche', 'capabilities'],
    difficulty: 'Advanced',
    rating: 4.8,
    description: 'Designs 3-tier SaaS pricing packages and upsell triggers.'
  },
  {
    id: 'tmpl-mkt-9',
    title: 'Customer Case Study Storyteller Framework',
    pack: 'Marketing',
    category: 'Copywriting',
    tags: ['Case Study', 'Social Proof', 'Content'],
    content: `Transform raw customer metrics into a compelling case study narrative.

Customer Name/Industry: {{customer_name}}
Before State (Pain): {{before_state}}
Solution Applied: {{solution_applied}}
Key Metrics Achieved: {{metrics_achieved}}

Structure as: Challenge -> Strategy -> Result -> Customer Quote`,
    notes: 'Formats case study metrics into a polished story.',
    variables: ['customer_name', 'before_state', 'solution_applied', 'metrics_achieved'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Turns customer transformation metrics into persuasive case studies.'
  },
  {
    id: 'tmpl-mkt-10',
    title: 'Competitor Differentiation Matrix & Pitch',
    pack: 'Marketing',
    category: 'Brainstorming',
    tags: ['Competitor', 'Positioning', 'Sales Pitch'],
    content: `Our Product: {{our_product}}
Main Competitors: {{competitor_names}}

Task:
1. List 3 key areas where competitors fall short.
2. Formulate our "Why Choose Us" positioning statement.
3. Write a 30-second elevator pitch highlighting our unique moat.`,
    notes: 'Sharpens competitive positioning and sales objections handling.',
    variables: ['our_product', 'competitor_names'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Builds competitive differentiation messaging and 30-second pitches.'
  },
  {
    id: 'tmpl-mkt-11',
    title: 'SEO Content Pillar & Cluster Strategy Generator',
    pack: 'Marketing',
    category: 'Data Analysis',
    tags: ['SEO', 'Content Strategy', 'Keyword'],
    content: `Act as a Head of Organic Growth. Build an SEO Pillar & Cluster Content Strategy for {{main_keyword}}.

Output:
- 1 Pillar Page Title & Outline
- 8 Supporting Sub-topic Cluster Articles
- Target Search Intent & Internal Linking map`,
    notes: 'Builds topical authority clusters for organic search rankings.',
    variables: ['main_keyword'],
    difficulty: 'Advanced',
    rating: 5.0,
    description: 'Generates SEO topical cluster strategies for high Google rankings.'
  },

  // --- WRITING PACK (11) ---
  {
    id: 'tmpl-wrt-1',
    title: 'Comprehensive SEO Blog Post Outline Architect',
    pack: 'Writing',
    category: 'Creative Writing',
    tags: ['Blog', 'SEO', 'Outline', 'Writing'],
    content: `Act as a Managing Editor for a top tech publication. Create a detailed SEO blog post outline for the topic: "{{blog_topic}}".

Primary Keyword: {{primary_keyword}}
Target Word Count: {{word_count}} words

Requirements:
- Catchy H1 Title options (with primary keyword)
- Introduction Hook (PAS framework: Problem-Agitate-Solve)
- H2 and H3 section headings with key bullet points to cover under each
- FAQ section targeting People Also Ask questions
- Conclusion with actionable CTA`,
    notes: 'Structure ensures articles pass SEO criteria and hold reader interest.',
    variables: ['blog_topic', 'primary_keyword', 'word_count'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Creates structured SEO blog post outlines with H2/H3 headings and FAQs.'
  },
  {
    id: 'tmpl-wrt-2',
    title: 'Viral Twitter / X Thread Master Writer',
    pack: 'Writing',
    category: 'Creative Writing',
    tags: ['Twitter', 'X', 'Thread', 'Viral'],
    content: `Write an engaging 7-tweet thread unpacking the following topic: {{thread_topic}}.

Key Takeaway: {{key_takeaway}}

Guidelines:
- Tweet 1: Hook that triggers curiosity or challenges common belief (include 🧵 icon)
- Tweets 2-6: Value-packed insights, step-by-step breakdown or framework
- Tweet 7: Summary + Retweet & Follow CTA`,
    notes: 'Optimized for high retweets, bookmarks, and follower growth.',
    variables: ['thread_topic', 'key_takeaway'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Writes a 7-tweet viral thread with hook, insights, and engagement CTA.'
  },
  {
    id: 'tmpl-wrt-3',
    title: 'Professional Tone & Clarity Polisher',
    pack: 'Writing',
    category: 'Copywriting',
    tags: ['Writing', 'Editing', 'Polishing', 'Grammar'],
    content: `You are an expert Copy Editor. Rewrite the following text to sound highly professional, clear, and persuasive without changing the core meaning:

Raw Draft:
"""
{{raw_text}}
"""

Requested Tone: {{desired_tone}} (e.g. Executive, Friendly Professional, Authoritative)

Output:
1. Polished Final Version
2. Summary of 3 key tone/syntax refinements made`,
    notes: 'Eliminates fluff, passive voice, and grammatical awkwardness.',
    variables: ['raw_text', 'desired_tone'],
    difficulty: 'Beginner',
    rating: 4.9,
    description: 'Refines rough drafts for professional clarity, tone, and active voice.'
  },
  {
    id: 'tmpl-wrt-4',
    title: 'Engaging Storyteller Scene & Hook Creator',
    pack: 'Writing',
    category: 'Creative Writing',
    tags: ['Creative Writing', 'Storytelling', 'Fiction'],
    content: `Act as a Bestselling Fiction Author. Write a opening scene hook for a story about {{concept}}.

Protagonist: {{protagonist_name}}
Setting: {{setting_description}}

Focus on sensory details, immediate tension, and immersive world-building.`,
    notes: 'Captivates readers right from the first paragraph.',
    variables: ['concept', 'protagonist_name', 'setting_description'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Creates vivid, high-tension opening scenes and story hooks.'
  },
  {
    id: 'tmpl-wrt-5',
    title: 'Executive Summary Summarizer (TL;DR)',
    pack: 'Writing',
    category: 'Data Analysis',
    tags: ['Summary', 'Executive', 'TLDR'],
    content: `Summarize the document below into an Executive Briefing for C-suite leaders:

Document Text:
"""
{{long_document}}
"""

Format:
- 1-Sentence High-Level TL;DR
- 3 Key Takeaways & Strategic Implications
- Action Items & Risk Factors`,
    notes: 'Distills complex documents into crisp executive briefs.',
    variables: ['long_document'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Distills long reports into 1-page C-suite executive briefings.'
  },
  {
    id: 'tmpl-wrt-6',
    title: 'Analogy & Metaphor Explainer Engine',
    pack: 'Writing',
    category: 'Creative Writing',
    tags: ['Analogy', 'Explainer', 'Metaphor'],
    content: `Explain the complex concept "{{complex_concept}}" using 3 intuitive analogies suitable for {{target_audience}}.

Structure:
- Analogy 1: Everyday Object metaphor
- Analogy 2: Visual Story metaphor
- Analogy 3: Interactive Mental Model`,
    notes: 'Helps readers instantly grasp abstract or technical subjects.',
    variables: ['complex_concept', 'target_audience'],
    difficulty: 'Beginner',
    rating: 4.9,
    description: 'Explains complex abstract topics using vivid everyday analogies.'
  },
  {
    id: 'tmpl-wrt-7',
    title: 'Speech & Presentation Opening Hook Writer',
    pack: 'Writing',
    category: 'Creative Writing',
    tags: ['Speech', 'Public Speaking', 'Presentation'],
    content: `Write 3 alternative 60-second speech intros for a presentation on {{presentation_topic}}.

Audience: {{audience_profile}}

Styles:
- Style 1: Provocative Statistic / Question
- Style 2: Personal Story Narrative
- Style 3: Bold Future Vision Statement`,
    notes: 'Ensures immediate audience attention at conferences or webinars.',
    variables: ['presentation_topic', 'audience_profile'],
    difficulty: 'Intermediate',
    rating: 4.7,
    description: 'Crafts 60-second captivating speech intros for presentations.'
  },
  {
    id: 'tmpl-wrt-8',
    title: 'Grammar & Style Guidelines Enforcer',
    pack: 'Writing',
    category: 'Copywriting',
    tags: ['Grammar', 'Proofreading', 'Style Guide'],
    content: `Proofread and correct the text below according to {{style_guide}} (e.g. AP Style, Chicago Manual of Style):

Text:
"""
{{draft_content}}
"""

Highlight:
1. Corrected Errors (Spelling, Punctuation, Grammar)
2. Style Guide Conformity Changes`,
    notes: 'Ensures strict style guide compliance.',
    variables: ['style_guide', 'draft_content'],
    difficulty: 'Beginner',
    rating: 4.6,
    description: 'Proofreads text against AP, Chicago, or custom brand style guides.'
  },
  {
    id: 'tmpl-wrt-9',
    title: 'Persuasive Recommendation & Business Proposal',
    pack: 'Writing',
    category: 'Copywriting',
    tags: ['Proposal', 'Business', 'Persuasion'],
    content: `Write a 1-page business proposal recommending {{proposed_solution}} to solve {{client_problem}}.

Expected ROI/Outcome: {{expected_outcome}}
Estimated Timeline: {{timeline}}

Sections: Executive Summary, Problem Statement, Solution Architecture, Expected ROI, Next Steps.`,
    notes: 'Standardized proposal structure for client pitches.',
    variables: ['proposed_solution', 'client_problem', 'expected_outcome', 'timeline'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Generates structured 1-page business proposals with ROI projections.'
  },
  {
    id: 'tmpl-wrt-10',
    title: 'Newsletter Intro & Editorial Opener',
    pack: 'Writing',
    category: 'Creative Writing',
    tags: ['Newsletter', 'Editorial', 'Hook'],
    content: `Write an intimate, personal newsletter opener linking a personal story about {{story_event}} to the broader lesson of {{broader_lesson}}.

Tone: Conversational, thoughtful, inspiring.`,
    notes: 'Creates strong personal connections in regular newsletters.',
    variables: ['story_event', 'broader_lesson'],
    difficulty: 'Beginner',
    rating: 4.7,
    description: 'Writes engaging editorial openers connecting personal stories to insights.'
  },
  {
    id: 'tmpl-wrt-11',
    title: 'Creative Product Review & Comparison Article',
    pack: 'Writing',
    category: 'Copywriting',
    tags: ['Product Review', 'Comparison', 'Affiliate'],
    content: `Write an unbiased in-depth review comparing {{product_a}} vs {{product_b}}.

Target User Needs: {{user_needs}}

Sections:
1. Quick Verdict Table
2. Feature Breakdown
3. Pros & Cons per product
4. Final Winner Recommendation`,
    notes: 'Well-organized affiliate and product comparison guide.',
    variables: ['product_a', 'product_b', 'user_needs'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Drafts comprehensive product comparison articles with Pros/Cons tables.'
  },

  // --- RESEARCH PACK (10) ---
  {
    id: 'tmpl-rsh-1',
    title: 'Academic Paper & Literature Review Summarizer',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['Research', 'Academic', 'Literature Review', 'Paper'],
    content: `Act as a Senior Research Fellow. Analyze the following academic text or abstract:

Text:
"""
{{academic_text}}
"""

Extract and Synthesize:
1. Core Research Question / Hypothesis
2. Methodology & Sample Size
3. Key Empirical Findings
4. Study Limitations & Future Research Avenues`,
    notes: 'Extracts critical methodology and findings from academic literature.',
    variables: ['academic_text'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Synthesizes academic papers into structured methodology and findings briefs.'
  },
  {
    id: 'tmpl-rsh-2',
    title: 'Competitive Market Landscape Analysis Framework',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['Research', 'Market Analysis', 'Competition', 'SWOT'],
    content: `Conduct a SWOT and Market Matrix Analysis for the {{industry_sector}} industry.

Target Company: {{company_name}}

Deliver:
1. Strengths, Weaknesses, Opportunities, Threats (SWOT Matrix)
2. Top 3 Competitor Benchmarks
3. Unmet Market Demand Gap`,
    notes: 'Establishes structured market position intelligence.',
    variables: ['industry_sector', 'company_name'],
    difficulty: 'Advanced',
    rating: 5.0,
    description: 'Conducts market landscape and SWOT analysis for any company or industry.'
  },
  {
    id: 'tmpl-rsh-3',
    title: 'Counter-Argument & Socratic Devil’s Advocate',
    pack: 'Research',
    category: 'Brainstorming',
    tags: ['Logic', 'Critical Thinking', 'Debate', 'Argument'],
    content: `Act as a Socratic Devil's Advocate. Challenge the following thesis statement or argument:

Thesis Statement:
"{{thesis_statement}}"

Provide:
1. 3 strongest counter-arguments
2. Underlying unstated assumptions in the thesis
3. Key empirical evidence needed to strengthen the thesis`,
    notes: 'Refines arguments and stress-tests hypotheses before publishing.',
    variables: ['thesis_statement'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Stress-tests arguments and thesis statements with strong counter-points.'
  },
  {
    id: 'tmpl-rsh-4',
    title: 'Structured JSON / CSV Data Extraction Prompt',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['JSON', 'Data Extraction', 'Schema', 'Parsing'],
    content: `Extract structured entity data from the following unformatted text into valid JSON syntax:

Source Text:
"""
{{source_text}}
"""

Required JSON Schema Keys:
{{required_keys}}

Respond strictly with valid JSON without conversational preamble.`,
    notes: 'Guarantees parseable JSON output from raw text inputs.',
    variables: ['source_text', 'required_keys'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Parses raw unstructured text into strictly valid JSON schema formats.'
  },
  {
    id: 'tmpl-rsh-5',
    title: 'Fact-Checking & Source Verification Questionnaire',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['Fact Check', 'Verification', 'Journalism'],
    content: `Evaluate the factual claims made in the following statement:

Claim:
"{{claim_statement}}"

Generate:
1. Verifiable factual sub-claims
2. Recommended primary statistical data sources (e.g. WHO, Pew, Census)
3. Potential bias indicators or misleading framing`,
    notes: 'Journalistic framework for verifying statistical and public claims.',
    variables: ['claim_statement'],
    difficulty: 'Beginner',
    rating: 4.7,
    description: 'Breaks down claims into verifiable sub-facts and recommended data sources.'
  },
  {
    id: 'tmpl-rsh-6',
    title: 'User Interview Question Protocol Generator',
    pack: 'Research',
    category: 'Brainstorming',
    tags: ['User Interview', 'UX Research', 'Qualitative'],
    content: `Act as a Senior UX Researcher. Design a 30-minute qualitative user interview protocol for researching {{user_problem}}.

Target Participant: {{participant_profile}}

Structure:
- Warm-up & Context (5 mins)
- Core Experience & Pain Points (15 mins)
- Feature Solution Reactions (8 mins)
- Wrap-up & Follow-ups (2 mins)`,
    notes: 'Avoids leading questions and elicits honest user feedback.',
    variables: ['user_problem', 'participant_profile'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Creates non-leading qualitative user interview question protocols.'
  },
  {
    id: 'tmpl-rsh-7',
    title: 'Executive Industry Research Briefing',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['Industry Report', 'Research', 'Briefing'],
    content: `Create an Industry Overview Briefing on {{emerging_tech_industry}}.

Key Pillars to Cover:
1. Current Market Size & Growth Forecast
2. Main Key Players & Ecosystem Map
3. Regulatory & Technological Tailwinds
4. Key Strategic Risks for 2026-2030`,
    notes: 'Provides high-level intelligence for strategy teams.',
    variables: ['emerging_tech_industry'],
    difficulty: 'Advanced',
    rating: 4.9,
    description: 'Generates comprehensive industry research briefings on emerging tech.'
  },
  {
    id: 'tmpl-rsh-8',
    title: 'Survey Questionnaire Design (Likert & Open-Ended)',
    pack: 'Research',
    category: 'Brainstorming',
    tags: ['Survey', 'Feedback', 'Questions'],
    content: `Design a 10-question customer feedback survey for {{service_product}}.

Goal: Measure customer satisfaction and identify churn risk factors.

Include:
- 5 Likert Scale (1-5) Questions
- 3 Multiple Choice Feature Rating Questions
- 2 Open-ended Qualitative Feedback Questions`,
    notes: 'Balanced survey design for actionable feedback.',
    variables: ['service_product'],
    difficulty: 'Beginner',
    rating: 4.7,
    description: 'Designs balanced 10-question surveys combining Likert and open feedback.'
  },
  {
    id: 'tmpl-rsh-9',
    title: 'Root Cause Failure Analysis (5 Whys Framework)',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['Root Cause', '5 Whys', 'Problem Solving'],
    content: `Apply the 5 Whys Problem Solving framework to investigate the incident described below:

Problem Event: {{incident_description}}

Step-by-step:
1. Why #1 -> Initial Cause
2. Why #2 -> Upstream System Cause
3. Why #3 -> Process Cause
4. Why #4 -> Organizational Cause
5. Why #5 -> Root Systemic Cause
Final Corrective Action Plan.`,
    notes: 'Drives thorough post-mortem root cause analysis.',
    variables: ['incident_description'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Applies the 5 Whys framework to discover root causes of operational incidents.'
  },
  {
    id: 'tmpl-rsh-10',
    title: 'Synthesize Multi-Source Notes into Single Matrix',
    pack: 'Research',
    category: 'Data Analysis',
    tags: ['Synthesis', 'Notes', 'Research Matrix'],
    content: `Combine and reconcile notes from 3 distinct sources regarding {{topic_name}}:

Source 1 Notes:
{{notes_source_1}}

Source 2 Notes:
{{notes_source_2}}

Task:
- Identify Agreed Facts across all sources
- Highlight Conflicts or Discrepancies
- Consolidated Master Summary Matrix`,
    notes: 'Merges disparate research notes into a unified matrix.',
    variables: ['topic_name', 'notes_source_1', 'notes_source_2'],
    difficulty: 'Advanced',
    rating: 4.9,
    description: 'Synthesizes notes from multiple sources into a single reconciled report.'
  },

  // --- YOUTUBE PACK (10) ---
  {
    id: 'tmpl-yt-1',
    title: 'High-Retention YouTube Video Script Hook (First 30 Seconds)',
    pack: 'YouTube',
    category: 'Creative Writing',
    tags: ['YouTube', 'Video Hook', 'Script', 'Retention'],
    content: `Act as a Top YouTube Scriptwriter (like MrBeast or Ali Abdaal). Write 3 high-retention 30-second script hooks for a video titled "{{video_title}}".

Target Viewers: {{target_viewers}}

Hook Styles:
1. Visual Pattern Interrupt + Bold Staking Statement
2. Story Cliffhanger Hook
3. Mind-Blowing Stat / Curiosity Question Hook

Ensure immediate energy and payoff promise within 10 seconds!`,
    notes: 'Prevents initial video drop-off in the crucial first 30 seconds.',
    variables: ['video_title', 'target_viewers'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Writes 3 high-retention 30-second video script hooks to stop scroll.'
  },
  {
    id: 'tmpl-yt-2',
    title: 'Complete 10-Minute YouTube Video Script Outline',
    pack: 'YouTube',
    category: 'Creative Writing',
    tags: ['YouTube Script', 'Outline', 'Video'],
    content: `Create a full timestamped script outline for a 10-minute YouTube video on: "{{video_topic}}".

Core Premise: {{core_premise}}

Outline Breakdown:
- 0:00 - 0:45 | Hook & Open Loop
- 0:45 - 2:30 | Point 1 (The Common Mistake)
- 2:30 - 5:00 | Point 2 (The Secret Framework)
- 5:00 - 7:30 | Point 3 (Real-World Case Study)
- 7:30 - 9:15 | Actionable Step-by-Step Guide
- 9:15 - 10:00| End Screen Organic Teaser (Subscribe CTA)`,
    notes: 'Paced script outline designed for 50%+ average view duration.',
    variables: ['video_topic', 'core_premise'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Generates timestamped 10-minute video script outlines optimized for watch time.'
  },
  {
    id: 'tmpl-yt-3',
    title: 'Clickworthy Title & High CTR Concept Generator (15 Titles)',
    pack: 'YouTube',
    category: 'Copywriting',
    tags: ['YouTube Title', 'CTR', 'Clickbait'],
    content: `Generate 15 high-CTR YouTube video titles for a video about {{video_concept}}.

Categorize into:
- 3 Negative Framing / Warning Titles ("Don't Do This...")
- 3 Curiosity Gap Titles ("I Tried X for 30 Days...")
- 3 Authority / Masterclass Titles ("The Ultimate Guide to...")
- 3 Extreme Comparison Titles ("$10 vs $10,000...")
- 3 Story / Personal Journey Titles`,
    notes: 'Proven YouTube title formulas for high click-through rates.',
    variables: ['video_concept'],
    difficulty: 'Beginner',
    rating: 4.9,
    description: 'Generates 15 clickworthy YouTube titles split across 5 viral framing styles.'
  },
  {
    id: 'tmpl-yt-4',
    title: 'Thumbnail Visual Concept & Text Prompt Builder',
    pack: 'YouTube',
    category: 'Creative Writing',
    tags: ['Thumbnail', 'Design Concept', 'YouTube'],
    content: `Act as a YouTube Creative Director. Design 3 thumbnail visual concepts for a video titled "{{video_title}}".

For each concept specify:
1. Main Focal Subject & Emotion (e.g. Shocked face pointing right)
2. Background Element & Color Contrast (e.g. Neon yellow / Deep navy)
3. Overlay Text (max 3 words - complementary to title, not repeating it)`,
    notes: 'Pairs visual thumbnail concepts with titles to maximize CTR.',
    variables: ['video_title'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Designs 3 high-contrast thumbnail visual concepts with 3-word overlay text.'
  },
  {
    id: 'tmpl-yt-5',
    title: 'SEO Optimized YouTube Description & Timestamps',
    pack: 'YouTube',
    category: 'Copywriting',
    tags: ['YouTube SEO', 'Description', 'Timestamps'],
    content: `Write an SEO-optimized YouTube video description for:

Title: {{video_title}}
Summary of Video: {{video_summary}}
Links & Resources: {{resources_list}}

Include:
- 2-sentence Keyword-Rich Intro
- Clean Chapter Timestamps layout
- Resources / Tools mentioned section
- 3 Relevant Hashtags`,
    notes: 'Optimizes video descriptions for YouTube search indexing.',
    variables: ['video_title', 'video_summary', 'resources_list'],
    difficulty: 'Beginner',
    rating: 4.7,
    description: 'Drafts SEO-friendly descriptions with timestamp chapters and hashtags.'
  },
  {
    id: 'tmpl-yt-6',
    title: 'YouTube Shorts / TikTok / Reels Script Adapter (60s)',
    pack: 'YouTube',
    category: 'Creative Writing',
    tags: ['Shorts', 'TikTok', 'Reels', 'Vertical Video'],
    content: `Adapt the long-form concept "{{concept}}" into a fast-paced 60-second vertical YouTube Short script.

Visual Column | Audio Script Column
0-3s: Immediate Visual Hook | Speech Hook
3-20s: Rapid Problem Setup | Explanation
20-50s: Quick 3 Tips Burst | Voiceover
50-60s: Loop-back Ending | Subscribe Trigger`,
    notes: 'Formatted as side-by-side visual and audio cues for vertical video.',
    variables: ['concept'],
    difficulty: 'Intermediate',
    rating: 4.8,
    description: 'Adapts topics into 60-second vertical YouTube Shorts scripts with visual cues.'
  },
  {
    id: 'tmpl-yt-7',
    title: 'Channel About Section & Value Proposition',
    pack: 'YouTube',
    category: 'Copywriting',
    tags: ['Channel', 'Branding', 'Bio'],
    content: `Write a compelling YouTube Channel About section for a creator in the {{channel_niche}} space.

Target Audience: {{target_audience}}
Upload Schedule: {{upload_schedule}}

Include: Who the channel is for, what value viewers get, upload frequency, and business contact info prompt.`,
    notes: 'Converts casual channel visitors into subscribers.',
    variables: ['channel_niche', 'target_audience', 'upload_schedule'],
    difficulty: 'Beginner',
    rating: 4.6,
    description: 'Drafts clear channel branding bios that turn visitors into subscribers.'
  },
  {
    id: 'tmpl-yt-8',
    title: 'Brand Sponsorship Pitch Script & Email for Creators',
    pack: 'YouTube',
    category: 'Copywriting',
    tags: ['Sponsorship', 'Creator', 'Pitch'],
    content: `Write a professional sponsorship pitch email to {{brand_name}} from a YouTube channel with {{subscriber_count}} subscribers in the {{niche}} niche.

Average Video Views: {{avg_views}}
Why this brand fits our audience: {{fit_rationale}}

Offer: 60-second dedicated integration or mid-roll shoutout.`,
    notes: 'Direct pitch framework for monetizing YouTube channels.',
    variables: ['brand_name', 'subscriber_count', 'niche', 'avg_views', 'fit_rationale'],
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'Drafts brand outreach emails for channel sponsorship integration pitches.'
  },
  {
    id: 'tmpl-yt-9',
    title: 'YouTube Community Tab Engagement Polls & Questions',
    pack: 'YouTube',
    category: 'Brainstorming',
    tags: ['Community', 'Polls', 'Engagement'],
    content: `Create 5 engaging YouTube Community Tab posts to boost channel activity between uploads for {{channel_topic}}.

Include:
- 2 Poll Posts with 4 funny/opinionated choices
- 2 Behind-the-Scenes teaser image captions
- 1 Viewer Topic Suggestion question`,
    notes: 'Keeps YouTube algorithm audience signal high between video uploads.',
    variables: ['channel_topic'],
    difficulty: 'Beginner',
    rating: 4.7,
    description: 'Generates 5 community tab posts and interactive polls to maintain engagement.'
  },
  {
    id: 'tmpl-yt-10',
    title: 'Mid-Roll Viewer Retention & Subscribe Call-to-Action',
    pack: 'YouTube',
    category: 'Creative Writing',
    tags: ['Subscribe CTA', 'Retention', 'Mid-Roll'],
    content: `Write 3 creative 15-second organic subscribe CTAs for the 5-minute mark of a video about {{video_topic}}.

Rule: Do NOT use boring "Please subscribe". Link subscribing to receiving a specific outcome or free value trigger!`,
    notes: 'Seamlessly weaves subscribe calls without disrupting viewer flow.',
    variables: ['video_topic'],
    difficulty: 'Beginner',
    rating: 4.8,
    description: 'Creates organic 15-second mid-roll subscribe calls tied to viewer value.'
  }
];
