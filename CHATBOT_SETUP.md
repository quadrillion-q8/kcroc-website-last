# KCROC chatbot setup

The website chatbot now uses the OpenAI Responses API from the Vercel server function at `app/frontend/api/chat.ts`.

## Required Vercel environment variable

Add this environment variable in the KCROC Vercel project:

- `OPENAI_API_KEY` = the private OpenAI API key

Do not put the key in React code, `ChatWidget.tsx`, Git, or a public `.env` file. OpenAI's documentation explicitly recommends keeping API keys server-side in environment variables or a secrets manager.

## Optional model setting

`OPENAI_MODEL` defaults to `gpt-5.6-luna`. Override it in Vercel when needed.

## Optional rate limiting

The chatbot will use Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are configured. When they are not available, it uses a conservative in-memory limiter so the chat does not go offline solely because Redis is missing.

## Deployment check

After saving the environment variables in Vercel, redeploy the frontend project. The browser continues to call `/api/chat`, while the server function keeps the OpenAI key private.
