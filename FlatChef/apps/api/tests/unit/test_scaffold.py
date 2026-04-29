"""Smoke test: verifies the package imports cleanly."""


def test_import_main() -> None:
    from flatchef.main import app  # noqa: PLC0415

    assert app is not None


def test_import_config() -> None:
    from flatchef.config import settings  # noqa: PLC0415

    assert settings.environment in {"development", "staging", "production"}
