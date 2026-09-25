# Supabase Practice

Express backend in `userbacked`.

## Run locally

```powershell
cd userbacked
npm ci
Copy-Item .env.example .env
npm start
```

Set `PORT` in your local `.env` if needed (default: 5000).
Visit `http://localhost:5000/` to check the API.

Local `.env` files and dependencies are excluded from Git. Keep real credentials in your local environment; commit only placeholder values in `.env.example`.
