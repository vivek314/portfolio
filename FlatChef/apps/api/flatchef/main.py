from fastapi import FastAPI

from flatchef.observability.logging import configure_logging

configure_logging()

app = FastAPI(
    title="FlatChef API",
    version="0.1.0",
    description="Agentic grocery procurement for Indian households",
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
