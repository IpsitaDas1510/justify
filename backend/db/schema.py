from db.connection import get_conn

SCHEMA_SQL = """
create table if not exists public.cases (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  title text not null,
  case_text text not null,
  predicted_category text not null,
  scores jsonb,
  status text not null default 'new',
  notes text
);

create index if not exists idx_cases_created_at
  on public.cases (created_at desc);

create index if not exists idx_cases_category
  on public.cases (predicted_category);

create index if not exists idx_cases_status
  on public.cases (status);
"""

def ensure_schema():
    """
    Safe to call on every startup.
    """
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(SCHEMA_SQL)
        conn.commit()
    print("✅ Schema ensured (public.cases)")