# posts-api - Domain Rules & Workflows (Starter)

A small layered Express app. Routing, controllers, validators, and repositories are done.
Your work is in `services/`: implement three stubbed methods that currently throw 501.

## Quick Start
```bash
npm install
npm start
```

## Your Tasks (see question.md for the full brief)
1. `services/postsService.js` -> `editPost`: post exists (404), author-only (403), within 24h (403).
2. `services/votesService.js` -> `castVote`: post exists (404), one vote per user (409).
3. `services/commentsService.js` -> `addComment`: post exists (404), not locked (409), then insert + increment count.

## Rules
- Rules live in the service and `throw new AppError(message, status)`; never call `res` from a service.
- In the workflow, all checks run before any write.
- Identity is `req.userId` (set from the `x-user-id` header); never trust a user id from the body.
