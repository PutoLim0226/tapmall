# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- **If the user's expression or requirements are not completely clear, always confirm via Q&A. Do not try to guess blindly.**

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Agent Execution Rules & Best Practices

### 🚨 P0: 絕對強制規則 (CRITICAL - MUST FOLLOW)
- **RTK (Reduce Token Keeper) Usage**: The user has a custom compiled CLI tool named `rtk` (located at `~/.local/bin/rtk`). It is intentionally used to prefix commands like `rtk npm run build` or `rtk git commit` to save AI token usage. **DO NOT** assume `rtk` is an LLM hallucination and **DO NOT** remove it from the rules or commands. Always preserve the `rtk` prefix when instructed by the user or when maintaining existing documentation.
- **Style Modification Rule**: If CSS modification is needed, **NEVER** use inline CSS, modify via SCSS instead. **STRICTLY PROHIBITED** to modify `main.css` directly. Furthermore, after modifying SCSS, you **MUST** execute `npx sass src/assets/scss/main.scss src/assets/css/main.css` to ensure synchronization.
- **Mandatory Testing (Mock & Playwright)**: Any bugfix or new feature **MUST** be verified with a temporary comprehensive test (e.g., using Jest / React Testing Library) **AND Playwright tests**. The test must ensure that every aspect of the modification works correctly, including UI rendering, functional logic, and preventing issues like infinite render loops. These test files must be executed locally to verify the behavior and **MUST** be deleted immediately after the test passes.
- **Git Operations Rule**: 
  - **Before Execution**: Always run `rtk git pull` to fetch the latest changes before modifying any code to prevent merge conflicts.
  - Ensure `yarn build` (or `npm run build`) passes without errors before committing.
  - Automatically execute git add, commit, and push after a successful build without asking for user permission. Use `rtk git` for git operations to save tokens. **IMPORTANT: All git commit messages MUST be written in Traditional Chinese (繁體中文).**
- **Deployment Server**: The project is deployed to the server at `http://45.32.25.8:8888/`. All deployment configurations, scripts, and instructions should target this environment.

### ⚠️ P1: 執行標準 (HIGH - STRONGLY RECOMMENDED)
- **Auto-build Verification**: After each code modification, run `yarn build` to verify there are no compilation errors, and continue fixing if there are any.
- **Code Splitting Rule**: Any file that exceeds 300 lines of code **MUST** be extracted and split into a common/sub-component structure. You can reference the approach used in `src/components/Function/Promotions` as an example.
- **Minimal & Optimal Tokens**: Always reply with the minimum and most optimal tokens. Be extremely concise.
- **Q&A Confirmation**: If the user's instructions/commands are unclear or not understood, always ask for clarification through Q&A. Do not guess.

### ℹ️ P2: 一般規範與維護 (MEDIUM - GUIDELINES)
- **Automated API Documentation Update**: When a file or API is modified/added, update `src/docs/api_data.html` to facilitate handover and future reference.

---
**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
