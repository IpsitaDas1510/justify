from flask import Blueprint, request, jsonify
from services.cases_service import (
    create_case,
    list_cases,
    get_case,
    update_case,
    delete_case,
)

cases_bp = Blueprint("cases", __name__)

@cases_bp.post("/cases")
def create_case_route():
    payload = request.get_json(silent=True) or {}
    title = (payload.get("title") or "").strip()
    case_text = (payload.get("case_text") or "").strip()

    if not title or not case_text:
        return jsonify({"error": "title and case_text are required"}), 400

    return jsonify(create_case(title, case_text))


@cases_bp.get("/cases")
def list_cases_route():
    return jsonify(list_cases())


@cases_bp.get("/cases/<int:case_id>")
def get_case_route(case_id):
    data = get_case(case_id)
    if data is None:
        return jsonify({"error": "case not found"}), 404
    return jsonify(data)


@cases_bp.route("/cases/<int:case_id>", methods=["PUT"])
def update_case_route(case_id):
    payload = request.get_json(silent=True) or {}
    status = payload.get("status")
    notes = payload.get("notes")

    code, data = update_case(case_id, status, notes)

    if code == "no_fields":
        return jsonify({"error": "no fields to update"}), 400
    if code == "not_found":
        return jsonify({"error": "case not found"}), 404

    return jsonify(data)


@cases_bp.route("/cases/<int:case_id>", methods=["DELETE"])
def delete_case_route(case_id):
    data = delete_case(case_id)
    if data is None:
        return jsonify({"error": "case not found"}), 404
    return jsonify(data)