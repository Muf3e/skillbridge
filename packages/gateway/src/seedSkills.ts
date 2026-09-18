import { SkillManifest } from "@skillbridge/shared-types";

// Seed Skill 1: DeepSec Repo Audit
export const deepSecAuditSkill: SkillManifest = {
  id: "skill_deepsec_audit",
  name: "DeepSec Repo Audit",
  version: "1.0.0",
  description: "Enterprise static code & dependency analyzer with automated CVE, zero-day detection, and credential leak discovery.",
  authorId: "pub_cyber_labs",
  authorName: "CyberLabs AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.15 },
  capabilities: ["security", "audit", "cve", "code-review"],
  tools: [{
    name: "scan_vulnerabilities",
    description: "Analyze code snippets or package dependency lists for known CVEs and hardcoded secrets.",
    inputSchema: {
      type: "object",
      properties: {
        codeOrDependencies: { type: "string", description: "Source code or dependency manifest to inspect" },
        severityThreshold: { type: "string", description: "LOW, MEDIUM, HIGH, CRITICAL" }
      },
      required: ["codeOrDependencies"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 2: SQL Query Doctor
export const sqlDoctorSkill: SkillManifest = {
  id: "skill_sql_query_doctor",
  name: "SQL Query Doctor",
  version: "1.2.0",
  description: "Enterprise database query optimizer. Ingests slow queries and table schemas, outputs verified execution plan optimizations.",
  authorId: "pub_scale_systems",
  authorName: "Scale Systems",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.10 },
  capabilities: ["database", "sql", "performance", "indexing"],
  tools: [{
    name: "optimize_query",
    description: "Outputs an optimized rewritten SQL query with missing index recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Raw SQL query to optimize" },
        dialect: { type: "string", description: "postgresql, mysql, bigquery, or snowflake" },
        tableSchema: { type: "string", description: "DDL schema definitions if available" }
      },
      required: ["query", "dialect"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 3: Viral Hook & Script Analyzer
export const viralHookAnalyzerSkill: SkillManifest = {
  id: "skill_viral_hook_analyzer",
  name: "Viral Hook Retention Predictor",
  version: "1.0.0",
  description: "Ingests video scripts or ad copy, predicts retention drop-off in the first 5 seconds, and delivers high-converting hooks.",
  authorId: "pub_growth_foundry",
  authorName: "GrowthFoundry AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.25 },
  capabilities: ["marketing", "social-media", "video", "copywriting"],
  tools: [{
    name: "analyze_hook",
    description: "Scores hook retention likelihood (0-100) and rewrites opening lines for maximum watch time.",
    inputSchema: {
      type: "object",
      properties: {
        scriptText: { type: "string", description: "First 30-60 seconds of video script or social post" },
        targetPlatform: { type: "string", description: "TikTok, YouTube Shorts, Reels, or X" }
      },
      required: ["scriptText", "targetPlatform"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 4: Financial 10-K Forensic Scanner
export const financialForensicSkill: SkillManifest = {
  id: "skill_financial_forensics",
  name: "Financial 10-K Forensic Scanner",
  version: "1.1.0",
  description: "Forensic financial statement analysis. Uncovers off-balance sheet anomalies, margin deterioration, and footnote red flags.",
  authorId: "pub_alpha_intelligence",
  authorName: "Alpha Intelligence",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.50 },
  capabilities: ["finance", "forensics", "investing", "sec-filings"],
  tools: [{
    name: "scan_filing_anomalies",
    description: "Extracts forensic red flags and subtle accounting anomalies from earnings or filing excerpts.",
    inputSchema: {
      type: "object",
      properties: {
        filingExcerpt: { type: "string", description: "Excerpt of MD&A or financial statements" },
        tickerOrCompany: { type: "string", description: "Company symbol or name" }
      },
      required: ["filingExcerpt"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 5: Tailwind Design System Unifier
export const tailwindUnifierSkill: SkillManifest = {
  id: "skill_tailwind_unifier",
  name: "Tailwind Design System Unifier",
  version: "2.0.0",
  description: "Converts chaotic, unstructured CSS or inline styles into consistent, tokenized Tailwind CSS classes.",
  authorId: "pub_ui_craft",
  authorName: "UI Craft Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.10 },
  capabilities: ["frontend", "design-system", "tailwind", "refactoring"],
  tools: [{
    name: "unify_design_tokens",
    description: "Refactors raw CSS or dirty JSX into clean Tailwind CSS with consistent color palette and spacing.",
    inputSchema: {
      type: "object",
      properties: {
        rawCodeOrStyles: { type: "string", description: "HTML/JSX or raw CSS snippet" }
      },
      required: ["rawCodeOrStyles"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 6: K8s SRE Incident Copilot
export const k8sIncidentCopilotSkill: SkillManifest = {
  id: "skill_k8s_incident_copilot",
  name: "K8s SRE Incident & CrashLoop Copilot",
  version: "1.0.0",
  description: "Autonomous cloud diagnostic engine for Kubernetes workloads. Ingests pod events, describes CrashLoopBackOff, OOMKilled, and generates precise kubectl remedies.",
  authorId: "pub_infra_sentinel",
  authorName: "InfraSentinel AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.30 },
  capabilities: ["devops", "kubernetes", "sre", "cloud", "docker"],
  tools: [{
    name: "diagnose_pod_failure",
    description: "Diagnoses failing pod events, OOMKilled states, and network timeouts to output exact remediation manifests.",
    inputSchema: {
      type: "object",
      properties: {
        podStatusOrEvents: { type: "string", description: "kubectl describe pod output or cluster event logs" },
        namespace: { type: "string", description: "Kubernetes namespace" }
      },
      required: ["podStatusOrEvents"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 7: Legal NDA Risk Scorer
export const legalNdaScorerSkill: SkillManifest = {
  id: "skill_legal_nda_scorer",
  name: "Commercial NDA Risk & Clause Scorer",
  version: "1.0.0",
  description: "Automated contract review intelligence for founders and counsel. Scans mutual and unilateral NDAs for non-standard indemnities, perpetual non-competes, and non-solicitation traps.",
  authorId: "pub_lex_protocol",
  authorName: "LexProtocol AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.45 },
  capabilities: ["legal", "contracts", "nda", "compliance", "startups"],
  tools: [{
    name: "audit_nda_clauses",
    description: "Audits contract clauses against standard NVCA/Y-Combinator templates and outputs non-standard liability alerts.",
    inputSchema: {
      type: "object",
      properties: {
        contractText: { type: "string", description: "Full or partial NDA text clauses" },
        governingStateOrCountry: { type: "string", description: "Jurisdiction (e.g. Delaware, UK, California)" }
      },
      required: ["contractText"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 8: Biotech Clinical Trial Synthesizer
export const clinicalTrialSynthesizerSkill: SkillManifest = {
  id: "skill_clinical_trial_synthesizer",
  name: "Biotech Clinical Trial & PubMed Synthesizer",
  version: "1.0.0",
  description: "Extracts trial cohorts, primary end-point efficacy, adverse event percentages, and statistical hazard ratios from medical literature and clinical trial disclosures.",
  authorId: "pub_bio_nexus",
  authorName: "BioNexus Intelligence",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.60 },
  capabilities: ["biotech", "pharma", "clinical-trials", "pubmed", "science"],
  tools: [{
    name: "synthesize_trial_evidence",
    description: "Extracts primary endpoints, hazard ratios, and adverse effect statistics from study disclosures.",
    inputSchema: {
      type: "object",
      properties: {
        abstractOrNctData: { type: "string", description: "PubMed abstract or ClinicalTrials.gov study protocol excerpt" },
        targetDrugOrTherapy: { type: "string", description: "Intervention or drug molecule name" }
      },
      required: ["abstractOrNctData"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 9: Smart Contract Gas & Security Auditor
export const smartContractAuditorSkill: SkillManifest = {
  id: "skill_smart_contract_auditor",
  name: "Smart Contract Gas & Security Auditor",
  version: "1.0.0",
  description: "Automated bytecode & Solidity static audit engine. Uncovers reentrancy vulnerabilities, flash-loan vulnerabilities, and high-cost storage slot gas optimizations.",
  authorId: "pub_audit_chain",
  authorName: "AuditChain Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.75 },
  capabilities: ["web3", "solidity", "evm", "smart-contracts", "security"],
  tools: [{
    name: "audit_solidity_contract",
    description: "Scans Solidity source code for reentrancy, integer overflows, unchecked transfers, and storage packing gas savings.",
    inputSchema: {
      type: "object",
      properties: {
        soliditySource: { type: "string", description: "Solidity source code (.sol)" },
        evmVersion: { type: "string", description: "Cancun, Shanghai, or London" }
      },
      required: ["soliditySource"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 10: LLMOps Cost & Token Latency Profiler
export const llmOpsProfilerSkill: SkillManifest = {
  id: "skill_llmops_cost_profiler",
  name: "LLMOps Cost & Token Latency Profiler",
  version: "1.0.0",
  description: "High-demand AI infrastructure analyzer. Diagnoses token inflation, redundant system prompts, inefficient JSON schema definitions, and model switching opportunities (e.g. Sonnet to Haiku / GPT-4o to Mini).",
  authorId: "pub_token_metrics",
  authorName: "TokenMetrics AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.20 },
  capabilities: ["llmops", "tokens", "cost-reduction", "ai-infrastructure", "engineering"],
  tools: [{
    name: "profile_llm_pipeline",
    description: "Analyzes system prompts, context payloads, and tool call schemas to output precise token reduction and latency cuts.",
    inputSchema: {
      type: "object",
      properties: {
        promptOrSchemaPayload: { type: "string", description: "System prompt or tool schema JSON" },
        currentMonthlySpendUsd: { type: "number", description: "Estimated monthly inference spend" }
      },
      required: ["promptOrSchemaPayload"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 11: Competitive Intelligence & SEO Reverse Engineer
export const seoCompIntelSkill: SkillManifest = {
  id: "skill_seo_competitive_intel",
  name: "SEO Semantic Gap & Competitor Reverse Engineer",
  version: "1.0.0",
  description: "Reverse engineers search visibility, extracts competitor content clusters, finds unranked question keywords, and outputs structured schema markup.",
  authorId: "pub_rank_surge",
  authorName: "RankSurge AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.25 },
  capabilities: ["marketing", "seo", "growth", "content", "intelligence"],
  tools: [{
    name: "analyze_keyword_gap",
    description: "Uncovers high-intent organic ranking gaps against competing domains and produces targeted FAQ JSON-LD schemas.",
    inputSchema: {
      type: "object",
      properties: {
        targetDomainOrUrl: { type: "string", description: "Your target domain or URL" },
        competitorUrl: { type: "string", description: "Competitor URL to benchmark against" }
      },
      required: ["targetDomainOrUrl", "competitorUrl"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// NEW SKILL 12: Autonomous Git Conflict & PR Merge Resolver
export const gitConflictResolverSkill: SkillManifest = {
  id: "skill_git_conflict_resolver",
  name: "Git Semantic Conflict & PR Merge Resolver",
  version: "1.0.0",
  description: "Autonomous code integration engine for engineering teams. Resolves complex three-way git merge conflicts, detects semantic regressions, and verifies that resolved code builds cleanly.",
  authorId: "pub_merge_flow",
  authorName: "MergeFlow Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.20 },
  capabilities: ["engineering", "git", "merge", "code-review", "developer-tools"],
  tools: [{
    name: "resolve_merge_conflict",
    description: "Ingests conflicting git diff hunks (HEAD vs Incoming vs Common Base) and outputs an authoritative, syntax-clean resolution.",
    inputSchema: {
      type: "object",
      properties: {
        conflictHunk: { type: "string", description: "Raw git conflict hunk with <<<<<<<, =======, >>>>>>> markers" },
        fileLanguage: { type: "string", description: "typescript, python, go, or rust" }
      },
      required: ["conflictHunk"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 13: RAG Chunk Optimizer & Vector Compressor
export const ragChunkOptimizerSkill: SkillManifest = {
  id: "skill_rag_chunk_optimizer",
  name: "RAG Chunk Optimizer & Vector Compressor",
  version: "1.0.0",
  description: "Enterprise context pre-processor for Agent Memory & RAG pipelines. Eliminates semantic noise, detects topic shift boundaries, and reduces embedding token footprint by 55%.",
  authorId: "pub_vector_craft",
  authorName: "VectorCraft AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.35 },
  capabilities: ["rag", "vector-db", "embeddings", "context-compression", "ai-ops"],
  tools: [{
    name: "optimize_chunks",
    description: "Ingests unstructured documentation or scraped text, strips conversational boilerplate, and outputs high-density semantic chunks with dense embedding metadata.",
    inputSchema: {
      type: "object",
      properties: {
        rawDocument: { type: "string", description: "Raw text, PDF text, or markdown document" },
        targetChunkSizeTokens: { type: "number", description: "Target tokens per chunk (default 256)" },
        enableNoiseDeduplication: { type: "boolean", description: "Whether to strip repetitive headers and boilerplate" }
      },
      required: ["rawDocument"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 14: Autonomous API Mock Forge & Contract Fuzzer
export const apiMockForgeSkill: SkillManifest = {
  id: "skill_api_mock_forge",
  name: "Autonomous API Mock Forge & Contract Fuzzer",
  version: "1.0.0",
  description: "Enterprise contract fuzzing and synthetic mock engine. Ingests OpenAPI specs or route endpoints, produces realistic mock responses, edge-case injections, and boundary tests.",
  authorId: "pub_forge_api",
  authorName: "ForgeAPI Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.25 },
  capabilities: ["testing", "api", "openapi", "mocking", "fuzzing", "qa"],
  tools: [{
    name: "forge_mock_and_fuzz",
    description: "Generates high-fidelity mock payloads, negative edge cases (null bytes, integer overflows, schema violations), and assertion suites.",
    inputSchema: {
      type: "object",
      properties: {
        endpointSchema: { type: "string", description: "OpenAPI JSON/YAML snippet or typescript interface" },
        fuzzingProfile: { type: "string", description: "STANDARD, BOUNDARY_EDGE_CASES, SECURITY_INJECTION" }
      },
      required: ["endpointSchema"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 15: Multi-Agent Swarm Consensus & Code Fuzzer
export const multiAgentConsensusSkill: SkillManifest = {
  id: "skill_multi_agent_consensus",
  name: "Multi-Agent Swarm Orchestrator & Consensus Engine",
  version: "1.0.0",
  description: "Adversarial 3-agent consensus audit for mission-critical PRs. Simulates Whitehat Security, Cost/Perf, and Architecture agents debating code changes, outputting Byzantine consensus verdicts.",
  authorId: "pub_swarm_zero",
  authorName: "SwarmZero AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 1.00 },
  capabilities: ["multi-agent", "adversarial", "consensus", "swarm", "governance"],
  tools: [{
    name: "evaluate_consensus",
    description: "Orchestrates a 3-agent adversarial review panel (Security, Cost/Perf, Architecture) and yields formal consensus score and recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        taskOrCode: { type: "string", description: "Pull request diff, smart contract code, or architectural decision record to audit" },
        consensusThreshold: { type: "number", description: "Minimum agreement threshold between 0.5 and 1.0 (default 0.75)" }
      },
      required: ["taskOrCode"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 16: Zero-Downtime Database Migration & Schema Resharder
export const zeroDowntimeMigratorSkill: SkillManifest = {
  id: "skill_zero_downtime_migrator",
  name: "Zero-Downtime Database Migration & Schema Resharder",
  version: "1.0.0",
  description: "Enterprise database migration planner. Analyzes DDL/SQL changes, detects table-locking bottlenecks, generates safe Expand/Contract migrations, and provides online zero-downtime rollbacks.",
  authorId: "pub_prismascale",
  authorName: "PrismaScale Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.50 },
  capabilities: ["database", "migration", "zero-downtime", "postgres", "mysql", "resharding"],
  tools: [{
    name: "plan_safe_migration",
    description: "Evaluates raw SQL or ORM schema alterations for exclusive lock hazards and outputs a safe phased zero-downtime execution plan.",
    inputSchema: {
      type: "object",
      properties: {
        schemaDiffOrSql: { type: "string", description: "ALTER TABLE or CREATE INDEX statements to analyze" },
        databaseEngine: { type: "string", description: "POSTGRESQL, MYSQL, COCKROACHDB" }
      },
      required: ["schemaDiffOrSql"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 17: Chaos Engineering & Synthetic Load Fuzzer
export const chaosLoadTesterSkill: SkillManifest = {
  id: "skill_chaos_load_tester",
  name: "Chaos Engineering & Synthetic Load Fuzzer",
  version: "1.0.0",
  description: "Enterprise SRE fault injection and synthetic stress simulator. Simulates cascading network partitions, upstream API latency degradation, and exports executable k6/Locust scenarios.",
  authorId: "pub_chaosscale",
  authorName: "ChaosScale SRE Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.40 },
  capabilities: ["chaos-engineering", "load-testing", "sre", "resilience", "k6", "locust"],
  tools: [{
    name: "simulate_traffic_chaos",
    description: "Generates stress curves and resilience reports under injected fault patterns (e.g. latency jitter, 502/504 cascade, memory saturation).",
    inputSchema: {
      type: "object",
      properties: {
        targetService: { type: "string", description: "Target service name or API endpoint URL" },
        peakRps: { type: "number", description: "Peak requests per second to simulate (e.g. 15000)" },
        chaosScenario: { type: "string", description: "LATENCY_SPIKE, CASCADING_TIMEOUT, CONNECTION_POOL_EXHAUSTION, RANDOM_503" }
      },
      required: ["targetService"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const contextDistillerSkill: SkillManifest = {
  id: "skill_context_token_compressor",
  name: "Context Distiller & Token Reducer",
  description: "Enterprise context compressor. Reduces massive codebases, stacktraces, and prompt histories by 65-80% using AST distillation, entropy deduplication, and syntax-preserving semantic compaction.",
  authorId: "pub_distillops",
  authorName: "DistillOps AI",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.35 },
  capabilities: ["context-compression", "token-optimizer", "ast-distillation", "prompt-compression", "llm-cost-cutting"],
  tools: [{
    name: "distill_context_payload",
    description: "Compresses raw code or prompt context while preserving functional contracts, API signatures, and core reasoning markers.",
    inputSchema: {
      type: "object",
      properties: {
        rawContext: { type: "string", description: "Raw code snippet, file bundle, or multi-turn prompt history to distill" },
        targetCompressionPct: { type: "number", description: "Target compression percentage (e.g. 70)" },
        preserveSyntax: { type: "boolean", description: "Preserve valid programming language syntax (default true)" },
        language: { type: "string", description: "Programming or markup language (e.g. typescript, python, json, markdown)" }
      },
      required: ["rawContext"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const stealthBrowserSkill: SkillManifest = {
  id: "skill_stealth_browser_extractor",
  name: "Stealth Headless Browser & Markdown Harvester",
  description: "Enterprise headless browser microVM with anti-bot bypass. Executes dynamic SPA JS rendering, extracts DOM interaction hierarchies, and delivers ultra-clean token-dense markdown.",
  authorId: "pub_crawlviking",
  authorName: "CrawlViking AI Labs",
  pricing: { model: "pay_per_run", costPerRunUsd: 0.45 },
  capabilities: ["web-crawling", "headless-browser", "markdown-extraction", "spa-rendering", "anti-bot"],
  tools: [{
    name: "extract_page_content",
    description: "Renders live URL via stealth microVM browser, evaluates client-side JavaScript, and extracts structured LLM-ready markdown.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "Target web page URL (e.g. https://docs.github.com/en)" },
        waitForSelector: { type: "string", description: "Optional CSS selector to wait for before extracting content" },
        stripBoilerplate: { type: "boolean", description: "Strip navbars, footers, cookie notices, and ads (default true)" },
        extractInteractiveElements: { type: "boolean", description: "Include clickable buttons, links, and input forms in output" }
      },
      required: ["url"]
    }
  }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const ALL_SEED_SKILLS: SkillManifest[] = [
  deepSecAuditSkill,
  sqlDoctorSkill,
  viralHookAnalyzerSkill,
  financialForensicSkill,
  tailwindUnifierSkill,
  k8sIncidentCopilotSkill,
  legalNdaScorerSkill,
  clinicalTrialSynthesizerSkill,
  smartContractAuditorSkill,
  llmOpsProfilerSkill,
  seoCompIntelSkill,
  gitConflictResolverSkill,
  ragChunkOptimizerSkill,
  apiMockForgeSkill,
  multiAgentConsensusSkill,
  zeroDowntimeMigratorSkill,
  chaosLoadTesterSkill,
  contextDistillerSkill,
  stealthBrowserSkill
];




