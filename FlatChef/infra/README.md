# Local Infrastructure

Start PostgreSQL 16 and Redis for local development:

```bash
docker compose up -d
```

Connection strings (matching `.env.example` defaults):
- Postgres: `postgresql+asyncpg://flatchef:flatchef@localhost:5432/flatchef`
- Redis: `redis://localhost:6379`
