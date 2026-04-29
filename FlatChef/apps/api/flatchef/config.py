from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Database
    database_url: str = "postgresql+asyncpg://localhost/flatchef"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # Security
    app_secret_key: str = "change-me-32-bytes-hex-placeholder"  # noqa: S105 — dev placeholder, overridden by env

    # Anthropic
    anthropic_api_key: str = ""

    # Swiggy MCP
    swiggy_mcp_client_id: str = ""
    swiggy_mcp_client_secret: str = ""
    swiggy_oauth_redirect_uri: str = "https://api.flatchef.app/oauth/swiggy/callback"
    swiggy_mcp_base_url: str = "https://mcp.swiggy.com/im"

    # Telegram
    telegram_bot_token: str = ""
    telegram_webhook_secret: str = ""

    # Bhashini STT
    bhashini_api_key: str = ""
    bhashini_user_id: str = ""

    # OpenAI (Whisper fallback)
    openai_api_key: str = ""

    # Observability
    log_level: str = "INFO"
    environment: str = "development"
    honeycomb_api_key: str = ""


settings = Settings()
