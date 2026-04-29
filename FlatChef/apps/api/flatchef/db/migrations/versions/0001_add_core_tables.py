"""Add all core tables (project.md §4).

Revision ID: 0001
Revises:
Create Date: 2026-04-29

Tables created (FK-dependency order):
  households, users, cart_approvals, weekly_menus, meal_overrides,
  inventory_items, orders, inventory_events, voice_messages, mcp_call_log

Also creates a set_updated_at() PL/pgSQL function and attaches a BEFORE UPDATE
trigger to every table so updated_at stays accurate even for direct SQL updates.
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_TABLES_IN_ORDER = [
    "households",
    "users",
    "cart_approvals",
    "weekly_menus",
    "meal_overrides",
    "inventory_items",
    "orders",
    "inventory_events",
    "voice_messages",
    "mcp_call_log",
]


def upgrade() -> None:
    op.create_table(
        "households",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("swiggy_address_id", sa.Text(), nullable=True),
        sa.Column("timezone", sa.Text(), server_default=sa.text("'Asia/Kolkata'"), nullable=False),
        sa.Column("daily_diff_time", sa.Time(), server_default=sa.text("'07:00'"), nullable=False),
        sa.Column("language_code", sa.Text(), server_default=sa.text("'en'"), nullable=False),
        sa.CheckConstraint("language_code IN ('en','hi','te')", name="ck_households_language_code"),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "users",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("role", sa.Text(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("phone", sa.Text(), nullable=True),
        sa.Column("telegram_chat_id", sa.Text(), nullable=True),
        sa.Column("email", sa.Text(), nullable=True),
        sa.Column("swiggy_oauth_token_encrypted", sa.LargeBinary(), nullable=True),
        sa.Column("swiggy_refresh_token_encrypted", sa.LargeBinary(), nullable=True),
        sa.Column("swiggy_token_expires_at", sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint("role IN ('resident','cook')", name="ck_users_role"),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("phone"),
        sa.UniqueConstraint("telegram_chat_id"),
        sa.UniqueConstraint("email"),
    )

    op.create_table(
        "cart_approvals",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("dish_name", sa.Text(), nullable=False),
        sa.Column("target_meal_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("cart_payload", postgresql.JSONB(), nullable=False),
        sa.Column("total_amount", sa.Numeric(10, 2), nullable=True),
        sa.Column("status", sa.Text(), server_default=sa.text("'pending'"), nullable=False),
        sa.Column("swiggy_order_id", sa.Text(), nullable=True),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("correlation_id", sa.UUID(), nullable=False),
        sa.CheckConstraint(
            "status IN ('pending','approved','rejected','expired','checked_out','failed')",
            name="ck_cart_approvals_status",
        ),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "weekly_menus",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("day_of_week", sa.SmallInteger(), nullable=False),
        sa.Column("meal_type", sa.Text(), nullable=False),
        sa.Column("dish_name", sa.Text(), nullable=False),
        sa.Column("servings", sa.Integer(), server_default=sa.text("4"), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.CheckConstraint("day_of_week BETWEEN 0 AND 6", name="ck_weekly_menus_day_of_week"),
        sa.CheckConstraint(
            "meal_type IN ('breakfast','lunch','dinner')", name="ck_weekly_menus_meal_type"
        ),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("household_id", "day_of_week", "meal_type", name="uq_weekly_menus_slot"),
    )

    op.create_table(
        "meal_overrides",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("target_date", sa.Date(), nullable=False),
        sa.Column("meal_type", sa.Text(), nullable=False),
        sa.Column("dish_name", sa.Text(), nullable=False),
        sa.Column("servings", sa.Integer(), nullable=False),
        sa.Column("source", sa.Text(), nullable=True),
        sa.Column("override_mode", sa.Text(), nullable=False),
        sa.Column(
            "procurement_status",
            sa.Text(),
            server_default=sa.text("'pending_schedule'"),
            nullable=False,
        ),
        sa.Column("cart_approval_id", sa.UUID(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_by", sa.UUID(), nullable=True),
        sa.CheckConstraint(
            "meal_type IN ('breakfast','lunch','dinner')", name="ck_meal_overrides_meal_type"
        ),
        sa.CheckConstraint(
            "source IN ('telegram','web','voice','cook_request')",
            name="ck_meal_overrides_source",
        ),
        sa.CheckConstraint(
            "override_mode IN ('replace','add')", name="ck_meal_overrides_override_mode"
        ),
        sa.CheckConstraint(
            "procurement_status IN ("
            "'pending_schedule','scheduled','procured','skipped','cancelled')",
            name="ck_meal_overrides_procurement_status",
        ),
        sa.ForeignKeyConstraint(["cart_approval_id"], ["cart_approvals.id"]),
        sa.ForeignKeyConstraint(["created_by"], ["users.id"]),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "household_id",
            "target_date",
            "meal_type",
            "dish_name",
            name="uq_meal_overrides_slot",
        ),
    )
    op.create_index(
        "ix_meal_overrides_household_date", "meal_overrides", ["household_id", "target_date"]
    )

    op.create_table(
        "inventory_items",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("canonical_name", sa.Text(), nullable=False),
        sa.Column("display_name", sa.Text(), nullable=False),
        sa.Column("quantity", sa.Numeric(10, 3), server_default=sa.text("0"), nullable=False),
        sa.Column("unit", sa.Text(), nullable=False),
        sa.Column("last_purchased_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("last_purchased_qty", sa.Numeric(10, 3), nullable=True),
        sa.Column("preferred_swiggy_product_id", sa.Text(), nullable=True),
        sa.Column("preferred_brand", sa.Text(), nullable=True),
        sa.Column("decay_rate_per_day", sa.Numeric(), nullable=True),
        sa.CheckConstraint("unit IN ('g','kg','ml','l','pcs')", name="ck_inventory_items_unit"),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("household_id", "canonical_name", name="uq_inventory_items_canonical"),
    )

    op.create_table(
        "orders",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("cart_approval_id", sa.UUID(), nullable=True),
        sa.Column("swiggy_order_id", sa.Text(), nullable=False),
        sa.Column("status", sa.Text(), nullable=True),
        sa.Column("total_amount", sa.Numeric(10, 2), nullable=True),
        sa.Column("placed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("delivered_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("raw_tracking", postgresql.JSONB(), nullable=True),
        sa.ForeignKeyConstraint(["cart_approval_id"], ["cart_approvals.id"]),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("swiggy_order_id"),
    )

    op.create_table(
        "inventory_events",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("household_id", sa.UUID(), nullable=False),
        sa.Column("inventory_item_id", sa.UUID(), nullable=True),
        sa.Column("event_type", sa.Text(), nullable=False),
        sa.Column("delta", sa.Numeric(), nullable=False),
        sa.Column("unit", sa.Text(), nullable=False),
        sa.Column("source", sa.Text(), nullable=True),
        sa.Column("correlation_id", sa.UUID(), nullable=True),
        sa.CheckConstraint(
            "event_type IN ("
            "'purchase','consumption','manual_add','manual_remove','voice_report','decay')",
            name="ck_inventory_events_event_type",
        ),
        sa.ForeignKeyConstraint(["household_id"], ["households.id"]),
        sa.ForeignKeyConstraint(["inventory_item_id"], ["inventory_items.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "voice_messages",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("user_id", sa.UUID(), nullable=False),
        sa.Column("telegram_file_id", sa.Text(), nullable=True),
        sa.Column("transcript_raw", sa.Text(), nullable=True),
        sa.Column("transcript_language", sa.Text(), nullable=True),
        sa.Column("parsed_intent", postgresql.JSONB(), nullable=True),
        sa.Column("processed_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "mcp_call_log",
        sa.Column("id", sa.UUID(), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("correlation_id", sa.UUID(), nullable=False),
        sa.Column("tool_name", sa.Text(), nullable=False),
        sa.Column("request_payload", postgresql.JSONB(), nullable=True),
        sa.Column("response_payload", postgresql.JSONB(), nullable=True),
        sa.Column("latency_ms", sa.Integer(), nullable=True),
        sa.Column("error", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_mcp_call_log_correlation_created",
        "mcp_call_log",
        ["correlation_id", "created_at"],
    )

    # Server-side trigger so updated_at stays accurate even for raw SQL updates.
    op.execute(
        """
        CREATE OR REPLACE FUNCTION set_updated_at()
        RETURNS TRIGGER LANGUAGE plpgsql AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$;
        """
    )
    for tbl in _TABLES_IN_ORDER:
        op.execute(
            f"""
            CREATE TRIGGER {tbl}_set_updated_at
                BEFORE UPDATE ON {tbl}
                FOR EACH ROW EXECUTE FUNCTION set_updated_at();
            """  # noqa: S608 — table names are hardcoded constants, not user input
        )


def downgrade() -> None:
    for tbl in reversed(_TABLES_IN_ORDER):
        op.execute(f"DROP TRIGGER IF EXISTS {tbl}_set_updated_at ON {tbl};")  # noqa: S608

    op.execute("DROP FUNCTION IF EXISTS set_updated_at();")

    op.drop_index("ix_mcp_call_log_correlation_created", table_name="mcp_call_log")
    op.drop_table("mcp_call_log")
    op.drop_table("voice_messages")
    op.drop_table("inventory_events")
    op.drop_table("orders")
    op.drop_table("inventory_items")
    op.drop_index("ix_meal_overrides_household_date", table_name="meal_overrides")
    op.drop_table("meal_overrides")
    op.drop_table("weekly_menus")
    op.drop_table("cart_approvals")
    op.drop_table("users")
    op.drop_table("households")
