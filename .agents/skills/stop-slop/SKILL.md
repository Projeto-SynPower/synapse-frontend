---
name: stop-slop
description: Eliminate AI prose patterns while preserving deep technical context, business rationale, and actionable precision.
metadata:
  trigger: Writing or editing technical specs, issues, PRs, or prose
---

# Stop Slop (Technical Edition)

Your objective is to draft and edit technical documents (Issues, PRs, RFCs) that are devoid of predictable AI writing patterns. You must eliminate fluff without sacrificing technical depth, business impact, or architectural context.

## 1. The Anti-Slop Hitlist
Actively suppress your default conversational patterns. 
- **Banned transitions:** "It is important to note," "In conclusion," "Ultimately," "Furthermore," "By doing this."
- **Banned adjectives/verbs:** "Robust," "Seamless," "Comprehensive," "Crucial," "Delve," "Tailored," "Leverage."
- **Banned structures:** The "Not X, but Y" binary. The "In a world where..." opening. Dramatic fragmentations.

## 2. Core Directives

*   **Protect the "Why":** Cutting filler does NOT mean cutting context. Always explain *why* a problem matters (impact on scale, performance, UX) and *why* an architectural choice was made.
*   **Actionable Precision:** Be granular. Name exact tables, columns, states, enums, and API fields. Replace generic checklists with explicit, verifiable tasks (`[ ]` / `[x]`).
*   **Active Voice:** Focus on execution. Instead of passive ambiguity ("The database will be updated"), use imperative commands ("Criar migration para a tabela `users`").
*   **Clean Null States:** If a section (like Related Tasks) has no content, use exactly `N/A`. Do not write verbose meta-explanations like "Nenhuma task encontrada."
*   **Rich Artifacts:** Do not limit "Artefatos" to file paths. Embed Mermaid diagrams (ERD, sequence), JSON schemas, or query samples whenever they clarify the architecture.

## 3. Before vs. After Examples

**Bad (Slop):** 
> "In order to optimize our data pipeline, it is crucial that we update the system. By leveraging a new table, we can ensure a seamless experience. The table will be created to handle user preferences."
**Good (Technical & Direct):** 
> "Current pipeline fails at 10k RPS due to full-table scans on `user_settings`. Create table `user_preferences_v2` with compound index in `(tenant_id, user_id)` to optimize reading."

**Bad (Slop):** 
> "[ ] Update the frontend to reflect the new API changes."
**Good (Technical & Direct):** 
> "[ ] Map new enum `DOCUMENT_STATUS` in the frontend and update badge on component `DocumentList`."

## 4. Pre-Flight Checklist & Scoring
Before outputting your final response, evaluate your draft internally against this matrix (1-10 per dimension):
1. **Context & Impact:** Is the technical/business motivation clear?
2. **Precision:** Are schema changes, endpoints, and states explicitly named?
3. **Directness:** Is it completely free of AI fluff, throat-clearing, and banned words?
4. **Visual Clarity:** Are Mermaid diagrams/schemas used effectively?
5. **Actionability:** Can a developer implement this exactly as written without asking follow-up questions?

*If your internal score is below 40/50, revise the draft before responding.*