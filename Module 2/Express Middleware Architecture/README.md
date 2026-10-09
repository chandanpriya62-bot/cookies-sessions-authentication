# Express Middleware Pipeline — Observability Shield

Implement logging, request ID tracing, and performance timing middleware on a modular Express application.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## Tasks

Open the files and complete the following TODO blocks:
1. `middleware/requestId.js` — Generate and attach UUIDs to `req.id` and response headers.
2. `middleware/logger.js` — Log request info on response `'finish'`.
3. `middleware/timing.js` — Log execution duration on response `'finish'`.
4. `app.js` — Mount the global middleware in the correct order before the routers.
5. `routes/posts.js` — Mount the `auditWrite` middleware per-route on the `POST` endpoint only.

See `question.md` for the full brief and testing examples.
