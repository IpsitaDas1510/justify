# backend/db/cases_sql.py

# ---------- INSERT ----------
INSERT_CASE = """
insert into public.cases
(title, case_text, predicted_category, scores, status, notes)
values (%s, %s, %s, %s, 'new', null)
returning id, created_at, title, case_text,
          predicted_category, scores, status, notes
"""


# ---------- LIST ----------
LIST_CASES = """
select id, created_at, title, predicted_category, status
from public.cases
order by created_at desc
limit 50
"""


# ---------- GET BY ID ----------
GET_CASE = """
select id, created_at, title, case_text,
       predicted_category, scores, status, notes
from public.cases
where id = %s
"""


# ---------- UPDATE (dynamic SET clause) ----------
UPDATE_CASE_TEMPLATE = """
update public.cases
set {fields}
where id = %s
returning id, created_at, title, case_text,
          predicted_category, scores, status, notes
"""


# ---------- DELETE ----------
DELETE_CASE = """
delete from public.cases
where id = %s
returning id
"""