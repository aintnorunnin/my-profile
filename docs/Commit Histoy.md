# Commit Histoy

This document records the what and why behind each logical commit so the project history stays understandable.

## b5a1a5a - Initialize Next.js project scaffold

What changed:

- Added the Next.js project dependencies and lockfile.
- Added TypeScript, ESLint, Next.js config, and `.gitignore`.

Why:

- The website brief required Next.js and a locally runnable professional site.
- Tooling was committed separately so framework setup is easy to review apart from application behavior.

## 40d91fb - Build portfolio homepage

What changed:

- Added the App Router page, layout, profile content model, and global styling.
- Presented Brandon's about content, career journey, skills, education, contact links, and responsive visual design.

Why:

- The MVP needed a polished portfolio built from the project brief and profile source material.
- Centralizing profile content keeps page rendering simple and makes future edits safer.

## 6766966 - Add portfolio test coverage

What changed:

- Added Vitest unit tests for profile content and page rendering.
- Added Playwright tests for the live page and contact links.

Why:

- The brief requested rigorous unit and integration testing.
- Keeping tests in their own commit makes it clear which behavior is verified.

## aaf57ef - Document portfolio implementation plan

What changed:

- Added project instructions, README, implementation plan, and decision record.

Why:

- The brief requested a written plan and a record of implementation reasoning.
- Documentation was committed separately so project intent is visible without mixing it into runtime code.

## Pending - Add AI Brandon chat

What changed:

- Added a server-side chat API that calls OpenRouter with `openai/gpt-oss-120b:free`.
- Added a client-side AI Brandon chat panel to ask questions about Brandon's career.
- Added tests for API behavior, UI interaction, and the Playwright user flow.

Why:

- OpenRouter access must stay server-side so `OPENROUTER_API_KEY` is never exposed to the browser.
- AI Brandon is constrained by profile data so it can answer career questions while avoiding invented details.
- Tests mock OpenRouter instead of calling the real API, keeping verification fast, reliable, and free.
