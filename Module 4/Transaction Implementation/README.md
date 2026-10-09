# Transaction Implementation Assignment Starter

The `placeOrder` endpoint performs two writes separately with no transaction: it creates an order and decrements product stock. If the second write fails, the first has already committed, leaving inconsistent data.

## Run

```bash
npm install
cp .env.example .env
npm run prisma:validate
npm start
```

Use a disposable PostgreSQL database. Never commit `.env` or real credentials.

Wrap the multi-step write in a Prisma transaction as described in the platform question. Keep transaction logic in the repository. Do not add platform-only `question.md`, answer files, tests, or specs to this repository.
