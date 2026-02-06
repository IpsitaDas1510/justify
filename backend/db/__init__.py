from db.schema import ensure_schema
from db.connection import get_conn

def db_check():
    """
    Teaching helper: verify DB connectivity.
    """
    conn = get_conn()
    print("✅ DB connection works fine")
    conn.close()