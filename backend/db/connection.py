import os
from pathlib import Path
import psycopg
from dotenv import load_dotenv

# Load env once (repo root)
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

def get_conn():
    """
    Reusable DB connection for the whole project.
    """
    return psycopg.connect(
        host=os.environ["SUPABASE_INSTANCE_HOST"],
        port=int(os.environ["SUPABASE_INSTANCE_PORT"]),
        dbname=os.environ["SUPABASE_INSTANCE_DATABASE"],
        user=os.environ["SUPABASE_INSTANCE_USER"],
        password=os.environ["SUPABASE_INSTANCE_PASSWORD"],
        sslmode="require",
        connect_timeout=10,
    )