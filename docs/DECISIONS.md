# Decision Record

## Source Material

The site is based on `AGENTS.md` and private resume/profile source material kept out of git. The brief defines the product goal, technical stack, testing expectations, and coding standards. The resume provides concrete career, education, skill, location, and contact details.

## Framework

Next.js was selected because it is explicitly required. The app uses the App Router with TypeScript because that is the current idiomatic Next.js setup and keeps the MVP simple.

## Design Direction

The visual system uses a dark professional palette, glass-like cards, strong typography, and a concise single-page layout. This keeps the site polished without adding extra product features beyond the requested about and career journey content.

## Content Structure

Profile data lives in `app/content.ts` so the page and tests share one source of truth. The page includes hero, about, career journey, backend-focused skills, education, interests, contact, and AI Brandon sections.

## Testing Approach

Vitest covers profile content and rendered page structure. Playwright covers the running website as a user would see it, including key copy and contact links. This gives confidence without overbuilding the test suite for a small MVP.
