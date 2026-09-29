# KCROC Chatbot Reactivation Update

## Changed files

- `app/frontend/api/chat.ts` — replaced the Gemini call with a server-side OpenAI Responses API request; added `OPENAI_API_KEY`, configurable model, `store: false`, safe provider-error handling, and an in-memory rate-limit fallback when Upstash is unavailable.
- `app/frontend/src/knowledge/context.ts` — made the system-prompt comment provider-neutral.
- `app/frontend/.env.example` — documents the required OpenAI key, optional model, and optional Upstash settings.
- `.gitignore` — ignores local environment-secret files.
- `CHATBOT_SETUP.md` — deployment instructions for the server-side OpenAI key and optional rate limiting.

## New chat backend

Browser: `POST /api/chat` → Vercel server function → OpenAI `POST /v1/responses`

The OpenAI key is never placed in the browser bundle or repository.

## Validation

TypeScript/TSX transpilation checks passed for the modified chatbot files. A full dependency-backed production build was not run because this working directory does not contain installed project dependencies.
