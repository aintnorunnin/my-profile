# Project Walkthrough

This walkthrough explains the portfolio website for a beginner in frontend coding. It covers what the project does, the tools it uses, how the code is organized, and why key decisions were made.

## Table Of Contents

- [Project Summary](#project-summary)
- [Technology Overview](#technology-overview)
- [Project Structure](#project-structure)
- [How The App Works](#how-the-app-works)
- [Detailed Code Walkthrough](#detailed-code-walkthrough)
- [Testing Strategy](#testing-strategy)
- [Common Commands](#common-commands)
- [Pros And Cons](#pros-and-cons)
- [What Could Be Improved](#what-could-be-improved)
- [Beginner Learning Path](#beginner-learning-path)

## Project Summary

This is a personal portfolio website for Brandon Williams. It presents Brandon as a backend-focused software engineer while still mentioning supporting frontend skills where they are relevant.

The website includes a professional homepage, about and career journey sections, backend/platform skill groups, education, contact links, and an AI Brandon chat feature that answers questions about Brandon's career.

The main separation of responsibilities is:

- `app/content.ts` stores public career content.
- `app/page.tsx` decides where content appears.
- `app/globals.css` controls how the site looks.
- `app/api/ai-brandon/route.ts` handles server-side AI requests.
- `tests/` verifies important behavior.

## Technology Overview

### Next.js

Next.js is the framework. It handles pages, routing, builds, and API routes.

In this project:

- `/` is rendered by `app/page.tsx`.
- `/api/ai-brandon` is handled by `app/api/ai-brandon/route.ts`.
- `app/layout.tsx` provides shared page metadata and imports global CSS.

### React

React builds the UI from components. A component is a function that returns UI.

```tsx
function Greeting() {
  return <h1>Hello</h1>;
}
```

This project uses components like `Hero`, `JourneySection`, `SkillsEducationSection`, and `AIBrandonChat`.

### TypeScript

TypeScript is JavaScript with type checking. It helps catch mistakes earlier by describing what shape data should have. For example, chat messages have a `role` and `content`, so the code is clearer about what the chat expects.

### CSS

The visual design is written in `app/globals.css`. It uses plain CSS, CSS variables, and responsive media queries for a dark professional design, glass-like cards, timeline entries, skill tags, and the chat layout.

### Vitest And Playwright

Vitest checks individual pieces of code and React components. Playwright opens the site in a real browser and tests user-facing flows.

## Project Structure

```text
app/
  api/
    ai-brandon/
      route.ts
  components/
    AIBrandonChat.tsx
  content.ts
  globals.css
  layout.tsx
  page.tsx
docs/
  Commit Histoy.md
  DECISIONS.md
  PLAN.md
  walkthrough.md
tests/
  e2e/
    home.spec.ts
  ai-brandon-chat.test.tsx
  ai-brandon-route.test.ts
  content.test.ts
  home.test.tsx
```

Some config files stay at the root because tools expect them there, including `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, and `playwright.config.ts`.

## How The App Works

When someone visits the homepage:

1. Next.js loads `app/page.tsx`.
2. `page.tsx` imports content from `app/content.ts`.
3. React components render the homepage sections.
4. `app/globals.css` styles the page.
5. If a user asks AI Brandon a question, the browser sends a request to `/api/ai-brandon`.
6. The API route calls OpenRouter using `OPENROUTER_API_KEY` from `.env`.
7. OpenRouter returns an answer.
8. The chat component displays the answer.

The important security detail: the browser never sees `OPENROUTER_API_KEY`. Browser code is visible to users, so the OpenRouter call happens in a server-side API route.

## Detailed Code Walkthrough

### `app/content.ts`

This file is the main source of truth for public-facing career content.

```ts
export const profile = {
  name: "Brandon Williams",
  role: "Software Engineer",
  location: "Tokyo, Japan",
  heroTitle: "Brandon Williams builds backend services and cloud-native systems.",
  currentFocus: "Backend services, cloud infrastructure, and deployment automation.",
};
```

Keeping content here means the page, tests, and AI Brandon can all use the same career facts.

Skills are split into backend/platform skills and supporting skills:

```ts
backendSkills: ["Go", "Java", "Python", "AWS CDK", "Kubernetes", "Docker"],
supportingSkills: ["JavaScript", "Express", "HTML", "CSS", "Japanese"],
```

The grouped structure makes the backend focus clearer:

```ts
export const skillGroups = [
  {
    label: "Backend and platform",
    skills: profile.backendSkills,
  },
  {
    label: "Supporting web and language skills",
    skills: profile.supportingSkills,
  },
];
```

### `app/page.tsx`

This is the homepage. Its main component is intentionally small:

```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <JourneySection />
      <SkillsEducationSection />
      <AIBrandonChat />
    </main>
  );
}
```

Each child component handles one section of the page.

The skills section uses `map`, a common React pattern:

```tsx
{skillGroups.map((group) => (
  <div className="skill-group" key={group.label}>
    <h3>{group.label}</h3>
    <ul className="tag-list" aria-label={group.label}>
      {group.skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </div>
))}
```

In plain English: take each skill group, print its label, then print every skill inside that group.

### `app/components/AIBrandonChat.tsx`

This component runs in the browser, so it starts with:

```tsx
"use client";
```

It needs browser behavior because it tracks user input and chat state:

```tsx
const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
const [question, setQuestion] = useState("");
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

When the user submits a question, the component calls the local API:

```tsx
const response = await fetch("/api/ai-brandon", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    messages: nextMessages.filter((message) => message !== initialMessage),
  }),
});
```

The component does not call OpenRouter directly. The browser sends the question to this app's server, and the server talks to OpenRouter.

### `app/api/ai-brandon/route.ts`

This server-side route reads the OpenRouter key from the environment:

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
```

It validates and cleans messages before sending them to OpenRouter:

```ts
return messages
  .filter(
    (message): message is ChatMessage =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string",
  )
  .map((message) => ({
    role: message.role,
    content: message.content.trim().slice(0, MAX_QUESTION_LENGTH),
  }))
  .filter((message) => message.content.length > 0)
  .slice(-8);
```

The system prompt includes Brandon's profile, backend focus, frontend context, skills, education, and career history. That helps AI Brandon answer career questions without inventing unrelated facts.

### `app/globals.css`

CSS variables define reusable colors:

```css
:root {
  --background: #07111f;
  --surface: rgba(255, 255, 255, 0.08);
  --text: #f6f8fb;
  --muted: #aab7c7;
  --accent: #7dd3fc;
}
```

CSS grid creates responsive layouts:

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 32px;
}
```

On smaller screens, sections stack into one column:

```css
@media (max-width: 860px) {
  .hero,
  .two-column,
  .timeline__item,
  .grid-section,
  .chat-section,
  .chat-form__row {
    grid-template-columns: 1fr;
  }
}
```

## Testing Strategy

The project has unit/component tests and browser tests.

Content tests check the data model:

```ts
expect(profile.backendSkills).toEqual(
  expect.arrayContaining(["Go", "Java", "AWS CDK", "Kubernetes"]),
);
```

Component tests check rendered React output:

```tsx
render(<Home />);

expect(
  screen.getByRole("heading", {
    level: 1,
    name: profile.heroTitle,
  }),
).toBeInTheDocument();
```

Playwright tests check the site in a browser:

```ts
await page.goto("/");
await expect(
  page.getByRole("heading", {
    name: /Brandon Williams builds backend services and cloud-native systems/i,
  }),
).toBeVisible();
```

The AI Brandon browser test mocks the API response so tests stay fast, free, and independent from OpenRouter availability.

## Common Commands

Start the local server:

```bash
npm run dev
```

Run unit tests:

```bash
npm run test:unit
```

Run Playwright tests:

```bash
npm run test:e2e
```

Build for production:

```bash
npm run build
```

Run the full suite:

```bash
npm run test:all
```

## Pros And Cons

### Next.js

Pros:

- Handles pages and API routes in one framework.
- Keeps the OpenRouter key on the server.
- Provides a production build system.

Cons:

- Has more concepts than plain HTML, CSS, and JavaScript.
- Some config files need to stay at the project root.

### TypeScript

Pros:

- Catches many mistakes early.
- Makes data shapes clearer.
- Helps with API and chat message code.

Cons:

- Adds syntax for beginners to learn.
- Type errors can feel confusing at first.

### Global CSS

Pros:

- Simple for a small site.
- No extra styling library.
- Easy to scan in one file.

Cons:

- Can get harder to manage as the site grows.
- Class names need to be kept organized.

### Centralized Content

Pros:

- One place to update career facts.
- Shared by page, tests, and AI Brandon.
- Keeps React components cleaner.

Cons:

- Requires code changes for content edits.
- Could become large if the site grows.

### AI Brandon

Pros:

- Makes the portfolio interactive.
- Keeps the API key private.
- Uses the same career data as the site.

Cons:

- Depends on OpenRouter.
- Needs prompt care to avoid incorrect answers.
- Should get rate limiting before serious production use.

## What Could Be Improved

Possible next improvements:

- Add a backend projects section.
- Deploy the site to Vercel.
- Add rate limiting to `/api/ai-brandon`.
- Add streaming AI responses.
- Add a contact form.
- Add an optional public resume download.
- Add accessibility checks with a tool like axe.
- Add social sharing metadata.
- Split CSS into smaller files if styling grows.
- Add a projects page if the homepage gets too long.

## Beginner Learning Path

If you are learning from this project, use this order:

1. Read `app/content.ts`.
2. Read `app/page.tsx`.
3. Change one sentence in `content.ts`.
4. Run `npm run dev`.
5. Change one color in `app/globals.css`.
6. Read `app/components/AIBrandonChat.tsx`.
7. Read `tests/home.test.tsx`.
8. Run `npm run test:unit`.
9. Read `tests/e2e/home.spec.ts`.
10. Run `npm run test:e2e`.

Avoid these beginner mistakes:

- Do not put `OPENROUTER_API_KEY` in a React component.
- Do not commit `.env` or private resume PDFs.
- Do not edit generated folders like `.next` or `node_modules`.
- Do not duplicate career facts across many files.
- Do not change tests just to hide a real bug.

## Iteration Notes

This document was created and revised in multiple passes:

1. Initial draft: covered the project structure, technologies, code files, and tradeoffs.
2. Revision pass 1: improved beginner explanations and mental models.
3. Revision pass 2: expanded code review sections and code samples.
4. Revision pass 3: expanded pros, cons, and future improvement ideas.
5. Condensing pass: added a table of contents and shortened repetitive sections while preserving the main points.
