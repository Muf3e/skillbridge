import { SkillManifest } from "@skillbridge/shared-types";

// Seed Skill 1: DeepSec Repo Audit (Security & Vulnerability Scanner)
export const deepSecAuditSkill: SkillManifest = {
  id: "skill_deepsec_audit",
  name: "DeepSec Repo Audit",
  version: "1.0.0",
  description: "Enterprise static code & dependency analyzer with automated CVE, zero-day detection, and credential leak discovery.",
  authorId: "pub_cyber_labs",
  authorName: "CyberLabs AI",
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.15
  },
  capabilities: ["security", "audit", "cve", "code-review"],
  tools: [
    {
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
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Seed Skill 2: SQL Query Doctor (Database Index & Query Optimizer)
export const sqlDoctorSkill: SkillManifest = {
  id: "skill_sql_query_doctor",
  name: "SQL Query Doctor",
  version: "1.2.0",
  description: "Enterprise database query optimizer. Ingests slow queries and table schemas, outputs verified execution plan optimizations.",
  authorId: "pub_scale_systems",
  authorName: "Scale Systems",
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.10
  },
  capabilities: ["database", "sql", "performance", "indexing"],
  tools: [
    {
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
    }
  ],
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
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.25
  },
  capabilities: ["marketing", "social-media", "video", "copywriting"],
  tools: [
    {
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
    }
  ],
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
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.50
  },
  capabilities: ["finance", "forensics", "investing", "sec-filings"],
  tools: [
    {
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
    }
  ],
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
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.10
  },
  capabilities: ["frontend", "design-system", "tailwind", "refactoring"],
  tools: [
    {
      name: "unify_design_tokens",
      description: "Refactors raw CSS or dirty JSX into clean Tailwind CSS with consistent color palette and spacing.",
      inputSchema: {
        type: "object",
        properties: {
          rawCodeOrStyles: { type: "string", description: "HTML/JSX or raw CSS snippet" }
        },
        required: ["rawCodeOrStyles"]
      }
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// NEW SKILL 6: Kubernetes SRE Incident Copilot (Autonomous DevOps / Cloud)
export const k8sIncidentCopilotSkill: SkillManifest = {
  id: "skill_k8s_incident_copilot",
  name: "K8s SRE Incident & CrashLoop Copilot",
  version: "1.0.0",
  description: "Autonomous cloud diagnostic engine for Kubernetes workloads. Ingests pod events, describes CrashLoopBackOff, OOMKilled, and generates precise kubectl remedies.",
  authorId: "pub_infra_sentinel",
  authorName: "InfraSentinel AI",
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.30
  },
  capabilities: ["devops", "kubernetes", "sre", "cloud", "docker"],
  tools: [
    {
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
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// NEW SKILL 7: Legal NDA Risk & Ambiguity Scorer (Automated LegalTech)
export const legalNdaScorerSkill: SkillManifest = {
  id: "skill_legal_nda_scorer",
  name: "Commercial NDA Risk & Clause Scorer",
  version: "1.0.0",
  description: "Automated contract review intelligence for founders and counsel. Scans mutual and unilateral NDAs for non-standard indemnities, perpetual non-competes, and non-solicitation traps.",
  authorId: "pub_lex_protocol",
  authorName: "LexProtocol AI",
  pricing: {
    model: "pay_per_run",
    costPerRunUsd: 0.45
  },
  capabilities: ["legal", "contracts", "nda", "compliance", "startups"],
  tools: [
    {
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
    }
  ],
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
  legalNdaScorerSkill
];
