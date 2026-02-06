import json

from db.connection import get_conn
from db.cases_sql import (
    INSERT_CASE,
    LIST_CASES,
    GET_CASE,
    DELETE_CASE,
    UPDATE_CASE_TEMPLATE,
)

from services.predict_service import predict_category

CASE_FULL_KEYS = [
    "id","created_at","title","case_text",
    "predicted_category","scores","status","notes"
]

CASE_LIST_KEYS = ["id","created_at","title","predicted_category","status"]


def create_case(title: str, case_text: str):
    category, scores = predict_category(case_text)

    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                INSERT_CASE,
                (title, case_text, category, json.dumps(scores) if scores else None),
            )
            row = cur.fetchone()
        conn.commit()

    return dict(zip(CASE_FULL_KEYS, row))


def list_cases():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(LIST_CASES)
            rows = cur.fetchall()

    return [dict(zip(CASE_LIST_KEYS, r)) for r in rows]


def get_case(case_id: int):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(GET_CASE, (case_id,))
            row = cur.fetchone()

    if row is None:
        return None

    return dict(zip(CASE_FULL_KEYS, row))


def update_case(case_id: int, status, notes):
    fields = []
    values = []

    if isinstance(status, str):
        fields.append("status = %s")
        values.append(status)

    # notes can be string OR null
    if isinstance(notes, str) or notes is None:
        fields.append("notes = %s")
        values.append(notes)

    if not fields:
        return ("no_fields", None)

    sql = UPDATE_CASE_TEMPLATE.format(fields=", ".join(fields))

    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (*values, case_id))
            row = cur.fetchone()
        conn.commit()

    if row is None:
        return ("not_found", None)

    return ("ok", dict(zip(CASE_FULL_KEYS, row)))


def delete_case(case_id: int):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(DELETE_CASE, (case_id,))
            row = cur.fetchone()
        conn.commit()

    if row is None:
        return None

    return {"deleted": True, "id": row[0]}