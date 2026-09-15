# Hello Premium — Real Login System (Setup Guide)

## What this is
A real Next.js + TypeScript signup/login system for Hello Premium, with
actual hashed passwords, real sessions, and a real database — not a mockup.

Users sign up and log in with their **phone number** (Nigerian format),
matching how Hello Premium's audience actually identifies themselves,
rather than usernames or email-first login.

## Setup steps (same pattern as the Let Love Connect chat app)

### 1. Create a Replit account
Go to replit.com and sign up (free) if you haven't already.

### 2. Create a new Repl
- Tap "+ Create Repl"
- Choose the **Node.js** template
- Name it `hello-premium-auth`

### 3. Upload all project files
Keep the exact folder structure:

```
package.json
tsconfig.json
lib/
  types.ts
  db.ts
  auth.ts
  api.ts
  jobs.ts
  ai.ts
app/
  layout.tsx
  page.tsx
  globals.css
  login/page.tsx
  signup/page.tsx
  dashboard/page.tsx
  security/page.tsx
  jobs/page.tsx
  assistant/page.tsx
  api/
    auth/
      signup/route.ts
      login/route.ts
      me/route.ts
    security/
      overview/route.ts
      revoke-session/route.ts
    jobs/route.ts
    assistant/
      send/route.ts
      history/route.ts
```

### 4. Set your JWT secret
In Replit's **Secrets** panel (padlock icon), add:
- Key: `JWT_SECRET`
- Value: any long random string — generate one at
  https://generate-secret.vercel.app/32

For the AI Assistant, also add:
- Key: `ANTHROPIC_API_KEY`
- Value: your API key from console.anthropic.com (Anthropic's developer
  console — separate from claude.ai, this is where you get billed API
  access). This calls Claude and will incur usage costs based on
  Anthropic's per-token pricing — check their current rates before
  launching to real users.

### 5. Install dependencies
In the Shell tab, run:
```
npm install
```

### 6. Run it
Tap **Run**, or in the Shell run:
```
npm run dev
```

### 7. Test it
Sign up with a real-looking Nigerian phone number (e.g. `0901 234 5678`)
and a password of 8+ characters. You should land on a simple dashboard
showing your name and phone number. Log out (clear cookies) and log back in
with the same number typed differently (e.g. `+234 901 234 5678`) — it
should still find your account, since phone numbers are normalized to a
consistent format regardless of how they're typed.

## What's real here
Password hashing (bcrypt), signed sessions (JWT in an httpOnly cookie),
phone number normalization and validation, duplicate-account prevention,
rate-limited login attempts, a real SQLite database that persists your
account between visits.

**Security logging** — every login attempt (success, wrong password,
unknown account, rate-limited) is recorded with IP address and device info,
visible to you on the Security page. Session tokens are stored as hashes,
never in plain text, so a database leak alone can't be replayed as a live
session. You can view and individually log out any active session from
that same page — all of this is visible to the account owner, nothing is
collected silently in the background.

**Job listings** — the Jobs page pulls real, live listings from Jobicy's
public jobs API (no API key required, used within their documented fair-use
terms). Each listing shows its source, original publish date, and links out
to the canonical listing to apply. Worth noting honestly: Jobicy is a
remote-jobs aggregator, not a Nigeria-government-jobs source — it won't
cover NYSC, Customs, Immigration, or similar postings from the original
Hello Premium spec. A Nigeria-specific government jobs source would need a
different integration, and I haven't found one with a comparably open,
well-documented public API yet.

**AI Assistant** — a real, working chat assistant powered by Claude, strictly
scoped to Hello Premium's actual services via its system prompt (banking
guidance, POS/ATM, bills, social media setup, job listings, platform
security). It refuses to act as a general-purpose assistant, never asks for
banking credentials, and every single reply includes two buttons: "Continue
chatting with AI" and "Talk to a human on WhatsApp" — the second opens a
pre-filled WhatsApp message summarizing what was discussed, which the user
reviews and sends themselves (never sent automatically). Full conversation
history is saved per user and only ever visible to that user — verified
that one user's conversation cannot be read or written to by another user,
even by guessing the conversation ID.

## What's not built yet
This still doesn't include Hello Premium's banking/POS/bills features from
the original spec — those would be the next layer on top of this
authenticated foundation.

## If something breaks
Copy the exact error text from Replit's Shell or browser console and send
it over.
