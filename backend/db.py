# backend/db.py
import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv


# -------------------------------------------------
# Load .env from repo root (single source of truth)
# -------------------------------------------------
ROOT_ENV = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(ROOT_ENV)

# SCHEMA_SQL = """
# create table if not exists public.predictions (
#   id bigserial primary key,
#   created_at timestamptz not null default now(),
#   input_text text not null,
#   predicted_category text not null,
#   scores jsonb
# );

# create index if not exists idx_predictions_created_at
#   on public.predictions (created_at desc);

# create index if not exists idx_predictions_category
#   on public.predictions (predicted_category);
# """

def get_conn():
    user = os.getenv("SUPABASE_INSTANCE_USER")
    password = os.getenv("SUPABASE_INSTANCE_PASSWORD")
    host = os.getenv("SUPABASE_INSTANCE_HOST")
    port = os.getenv("SUPABASE_INSTANCE_PORT")
    dbname = os.getenv("SUPABASE_INSTANCE_DATABASE")
    pool_mode = os.getenv("SUPABASE_INSTANCE_POOL_MODE", "transaction")

    missing = [
        k for k, v in {
            "SUPABASE_INSTANCE_USER": user,
            "SUPABASE_INSTANCE_PASSWORD": password,
            "SUPABASE_INSTANCE_HOST": host,
            "SUPABASE_INSTANCE_PORT": port,
            "SUPABASE_INSTANCE_DATABASE": dbname,
        }.items() if not v
    ]

    if missing:
        raise RuntimeError(f"Missing DB env vars: {', '.join(missing)}")

    conn = psycopg.connect(
        host=host,
        port=int(port),
        dbname=dbname,
        user=user,
        password=password,
        sslmode="require",
        connect_timeout=10,
    )

    print(f"✅ DB connected ({pool_mode} pool) -> {host}:{port}/{dbname} as {user}")
    return conn