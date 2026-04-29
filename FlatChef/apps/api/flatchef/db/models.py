"""SQLAlchemy ORM models for all FlatChef tables (project.md §4).

Table creation order respects FK dependencies:
  households → users → cart_approvals → weekly_menus → meal_overrides
  → inventory_items → orders → inventory_events → voice_messages → mcp_call_log
"""

import uuid
from datetime import date, datetime, time
from decimal import Decimal
from typing import Any

from sqlalchemy import (
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    LargeBinary,
    Numeric,
    SmallInteger,
    Text,
    Time,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class _Model(Base):
    """Abstract base: id (UUID PK) + created_at + updated_at for all tables."""

    __abstract__ = True

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, server_default=text("gen_random_uuid()")
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Household(_Model):
    __tablename__ = "households"
    __table_args__ = (
        CheckConstraint("language_code IN ('en','hi','te')", name="ck_households_language_code"),
    )

    name: Mapped[str] = mapped_column(Text)
    swiggy_address_id: Mapped[str | None] = mapped_column(Text)
    timezone: Mapped[str] = mapped_column(Text, server_default=text("'Asia/Kolkata'"))
    daily_diff_time: Mapped[time] = mapped_column(Time, server_default=text("'07:00'"))
    language_code: Mapped[str] = mapped_column(Text, server_default=text("'en'"))


class User(_Model):
    __tablename__ = "users"
    __table_args__ = (CheckConstraint("role IN ('resident','cook')", name="ck_users_role"),)

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    role: Mapped[str] = mapped_column(Text)
    name: Mapped[str] = mapped_column(Text)
    phone: Mapped[str | None] = mapped_column(Text, unique=True)
    telegram_chat_id: Mapped[str | None] = mapped_column(Text, unique=True)
    email: Mapped[str | None] = mapped_column(Text, unique=True)
    swiggy_oauth_token_encrypted: Mapped[bytes | None] = mapped_column(LargeBinary)
    swiggy_refresh_token_encrypted: Mapped[bytes | None] = mapped_column(LargeBinary)
    swiggy_token_expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class CartApproval(_Model):
    """Staged Instamart cart awaiting resident approval.

    Defined before MealOverride because meal_overrides.cart_approval_id FK
    references this table.
    """

    __tablename__ = "cart_approvals"
    __table_args__ = (
        CheckConstraint(
            "status IN ('pending','approved','rejected','expired','checked_out','failed')",
            name="ck_cart_approvals_status",
        ),
    )

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    dish_name: Mapped[str] = mapped_column(Text)
    target_meal_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    cart_payload: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False)
    total_amount: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    status: Mapped[str] = mapped_column(Text, server_default=text("'pending'"))
    swiggy_order_id: Mapped[str | None] = mapped_column(Text)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    correlation_id: Mapped[uuid.UUID] = mapped_column()


class WeeklyMenu(_Model):
    __tablename__ = "weekly_menus"
    __table_args__ = (
        CheckConstraint("day_of_week BETWEEN 0 AND 6", name="ck_weekly_menus_day_of_week"),
        CheckConstraint(
            "meal_type IN ('breakfast','lunch','dinner')", name="ck_weekly_menus_meal_type"
        ),
        UniqueConstraint("household_id", "day_of_week", "meal_type", name="uq_weekly_menus_slot"),
    )

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    day_of_week: Mapped[int] = mapped_column(SmallInteger)
    meal_type: Mapped[str] = mapped_column(Text)
    dish_name: Mapped[str] = mapped_column(Text)
    servings: Mapped[int] = mapped_column(server_default=text("4"))
    notes: Mapped[str | None] = mapped_column(Text)


class MealOverride(_Model):
    """One-off meal entry overriding or augmenting weekly_menus for a specific date.

    The unique constraint on (household_id, target_date, meal_type, dish_name)
    enforces anti-pattern #17: no duplicate override rows.  Conflict resolution
    is surfaced to the user via the conflict_check node in ad_hoc_orchestrator.
    """

    __tablename__ = "meal_overrides"
    __table_args__ = (
        CheckConstraint(
            "meal_type IN ('breakfast','lunch','dinner')", name="ck_meal_overrides_meal_type"
        ),
        CheckConstraint(
            "source IN ('telegram','web','voice','cook_request')",
            name="ck_meal_overrides_source",
        ),
        CheckConstraint(
            "override_mode IN ('replace','add')", name="ck_meal_overrides_override_mode"
        ),
        CheckConstraint(
            "procurement_status IN ("
            "'pending_schedule','scheduled','procured','skipped','cancelled')",
            name="ck_meal_overrides_procurement_status",
        ),
        UniqueConstraint(
            "household_id",
            "target_date",
            "meal_type",
            "dish_name",
            name="uq_meal_overrides_slot",
        ),
        Index("ix_meal_overrides_household_date", "household_id", "target_date"),
    )

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    target_date: Mapped[date] = mapped_column(Date)
    meal_type: Mapped[str] = mapped_column(Text)
    dish_name: Mapped[str] = mapped_column(Text)
    servings: Mapped[int] = mapped_column()
    source: Mapped[str | None] = mapped_column(Text)
    override_mode: Mapped[str] = mapped_column(Text)
    procurement_status: Mapped[str] = mapped_column(Text, server_default=text("'pending_schedule'"))
    cart_approval_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("cart_approvals.id"), nullable=True
    )
    notes: Mapped[str | None] = mapped_column(Text)
    created_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id"), nullable=True)


class InventoryItem(_Model):
    __tablename__ = "inventory_items"
    __table_args__ = (
        CheckConstraint("unit IN ('g','kg','ml','l','pcs')", name="ck_inventory_items_unit"),
        UniqueConstraint("household_id", "canonical_name", name="uq_inventory_items_canonical"),
    )

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    canonical_name: Mapped[str] = mapped_column(Text)
    display_name: Mapped[str] = mapped_column(Text)
    quantity: Mapped[Decimal] = mapped_column(Numeric(10, 3), server_default=text("0"))
    unit: Mapped[str] = mapped_column(Text)
    last_purchased_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_purchased_qty: Mapped[Decimal | None] = mapped_column(Numeric(10, 3))
    preferred_swiggy_product_id: Mapped[str | None] = mapped_column(Text)
    preferred_brand: Mapped[str | None] = mapped_column(Text)
    decay_rate_per_day: Mapped[Decimal | None] = mapped_column(Numeric)


class Order(_Model):
    __tablename__ = "orders"

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    cart_approval_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("cart_approvals.id"), nullable=True
    )
    swiggy_order_id: Mapped[str] = mapped_column(Text, unique=True)
    status: Mapped[str | None] = mapped_column(Text)
    total_amount: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    placed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    delivered_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    raw_tracking: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)


class InventoryEvent(_Model):
    __tablename__ = "inventory_events"
    __table_args__ = (
        CheckConstraint(
            "event_type IN ("
            "'purchase','consumption','manual_add','manual_remove','voice_report','decay')",
            name="ck_inventory_events_event_type",
        ),
    )

    household_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("households.id"))
    inventory_item_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("inventory_items.id"), nullable=True
    )
    event_type: Mapped[str] = mapped_column(Text)
    delta: Mapped[Decimal] = mapped_column(Numeric)
    unit: Mapped[str] = mapped_column(Text)
    source: Mapped[str | None] = mapped_column(Text)
    correlation_id: Mapped[uuid.UUID | None] = mapped_column(nullable=True)


class VoiceMessage(_Model):
    __tablename__ = "voice_messages"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    telegram_file_id: Mapped[str | None] = mapped_column(Text)
    transcript_raw: Mapped[str | None] = mapped_column(Text)
    transcript_language: Mapped[str | None] = mapped_column(Text)
    parsed_intent: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class MCPCallLog(_Model):
    __tablename__ = "mcp_call_log"
    __table_args__ = (Index("ix_mcp_call_log_correlation_created", "correlation_id", "created_at"),)

    correlation_id: Mapped[uuid.UUID] = mapped_column()
    tool_name: Mapped[str] = mapped_column(Text)
    request_payload: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    response_payload: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    latency_ms: Mapped[int | None] = mapped_column()
    error: Mapped[str | None] = mapped_column(Text)
