"""Structural tests for all SQLAlchemy ORM models.

Verifies column names, check constraints, unique constraints, and indexes
without requiring a live database connection.  Each test class maps 1-to-1
with a table in project.md §4.
"""

from sqlalchemy import Table

from flatchef.db.models import (
    CartApproval,
    Household,
    InventoryEvent,
    InventoryItem,
    MCPCallLog,
    MealOverride,
    Order,
    User,
    VoiceMessage,
    WeeklyMenu,
)

_TIMESTAMP_COLS = {"id", "created_at", "updated_at"}


def _cols(model: type) -> set[str]:  # type: ignore[type-arg]
    tbl: Table = model.__table__  # type: ignore[attr-defined]  # SQLAlchemy mapped class
    return set(tbl.columns.keys())


def _constraint_names(model: type) -> set[str]:  # type: ignore[type-arg]
    tbl: Table = model.__table__  # type: ignore[attr-defined]
    return {c.name for c in tbl.constraints if c.name}


def _index_names(model: type) -> set[str]:  # type: ignore[type-arg]
    tbl: Table = model.__table__  # type: ignore[attr-defined]
    return {i.name for i in tbl.indexes if i.name}


class TestHousehold:
    def test_columns(self) -> None:
        assert _cols(Household) == _TIMESTAMP_COLS | {
            "name",
            "swiggy_address_id",
            "timezone",
            "daily_diff_time",
            "language_code",
        }

    def test_language_code_constraint(self) -> None:
        assert "ck_households_language_code" in _constraint_names(Household)


class TestUser:
    def test_columns(self) -> None:
        assert _cols(User) == _TIMESTAMP_COLS | {
            "household_id",
            "role",
            "name",
            "phone",
            "telegram_chat_id",
            "email",
            "swiggy_oauth_token_encrypted",
            "swiggy_refresh_token_encrypted",
            "swiggy_token_expires_at",
        }

    def test_role_constraint(self) -> None:
        assert "ck_users_role" in _constraint_names(User)


class TestCartApproval:
    def test_columns(self) -> None:
        assert _cols(CartApproval) == _TIMESTAMP_COLS | {
            "household_id",
            "dish_name",
            "target_meal_at",
            "cart_payload",
            "total_amount",
            "status",
            "swiggy_order_id",
            "expires_at",
            "correlation_id",
        }

    def test_status_constraint(self) -> None:
        assert "ck_cart_approvals_status" in _constraint_names(CartApproval)


class TestWeeklyMenu:
    def test_columns(self) -> None:
        assert _cols(WeeklyMenu) == _TIMESTAMP_COLS | {
            "household_id",
            "day_of_week",
            "meal_type",
            "dish_name",
            "servings",
            "notes",
        }

    def test_unique_slot(self) -> None:
        assert "uq_weekly_menus_slot" in _constraint_names(WeeklyMenu)

    def test_check_constraints(self) -> None:
        names = _constraint_names(WeeklyMenu)
        assert "ck_weekly_menus_day_of_week" in names
        assert "ck_weekly_menus_meal_type" in names


class TestMealOverride:
    def test_columns(self) -> None:
        assert _cols(MealOverride) == _TIMESTAMP_COLS | {
            "household_id",
            "target_date",
            "meal_type",
            "dish_name",
            "servings",
            "source",
            "override_mode",
            "procurement_status",
            "cart_approval_id",
            "notes",
            "created_by",
        }

    def test_unique_slot(self) -> None:
        assert "uq_meal_overrides_slot" in _constraint_names(MealOverride)

    def test_check_constraints(self) -> None:
        names = _constraint_names(MealOverride)
        assert "ck_meal_overrides_meal_type" in names
        assert "ck_meal_overrides_source" in names
        assert "ck_meal_overrides_override_mode" in names
        assert "ck_meal_overrides_procurement_status" in names

    def test_index_household_date(self) -> None:
        assert "ix_meal_overrides_household_date" in _index_names(MealOverride)


class TestInventoryItem:
    def test_columns(self) -> None:
        assert _cols(InventoryItem) == _TIMESTAMP_COLS | {
            "household_id",
            "canonical_name",
            "display_name",
            "quantity",
            "unit",
            "last_purchased_at",
            "last_purchased_qty",
            "preferred_swiggy_product_id",
            "preferred_brand",
            "decay_rate_per_day",
        }

    def test_unique_canonical(self) -> None:
        assert "uq_inventory_items_canonical" in _constraint_names(InventoryItem)

    def test_unit_constraint(self) -> None:
        assert "ck_inventory_items_unit" in _constraint_names(InventoryItem)


class TestOrder:
    def test_columns(self) -> None:
        assert _cols(Order) == _TIMESTAMP_COLS | {
            "household_id",
            "cart_approval_id",
            "swiggy_order_id",
            "status",
            "total_amount",
            "placed_at",
            "delivered_at",
            "raw_tracking",
        }


class TestInventoryEvent:
    def test_columns(self) -> None:
        assert _cols(InventoryEvent) == _TIMESTAMP_COLS | {
            "household_id",
            "inventory_item_id",
            "event_type",
            "delta",
            "unit",
            "source",
            "correlation_id",
        }

    def test_event_type_constraint(self) -> None:
        assert "ck_inventory_events_event_type" in _constraint_names(InventoryEvent)


class TestVoiceMessage:
    def test_columns(self) -> None:
        assert _cols(VoiceMessage) == _TIMESTAMP_COLS | {
            "user_id",
            "telegram_file_id",
            "transcript_raw",
            "transcript_language",
            "parsed_intent",
            "processed_at",
        }


class TestMCPCallLog:
    def test_columns(self) -> None:
        assert _cols(MCPCallLog) == _TIMESTAMP_COLS | {
            "correlation_id",
            "tool_name",
            "request_payload",
            "response_payload",
            "latency_ms",
            "error",
        }

    def test_index_correlation_created(self) -> None:
        assert "ix_mcp_call_log_correlation_created" in _index_names(MCPCallLog)
