# FlatChef

Agentic grocery procurement for Indian households.

## Quick start

```bash
# 1. Start local infrastructure
docker compose -f infra/docker-compose.yml up -d

# 2. Backend (Python 3.12)
cd apps/api
pip install -e ".[dev]"
cp ../../.env.example .env   # fill in secrets
alembic upgrade head
uvicorn flatchef.main:app --reload

# 3. Frontend (Node 22)
cd apps/web
npm install
cp ../../.env.example .env.local  # fill in frontend vars
npm run dev
```

## Development

- Lint + typecheck: `ruff check . && mypy --strict flatchef/` (backend), `npm run typecheck && npm run lint` (frontend)
- Tests: `pytest` from `apps/api/`
- Pre-commit: `pre-commit install` (runs on every commit)

See [project.md](project.md.txt) for full spec, data model, and build order.
