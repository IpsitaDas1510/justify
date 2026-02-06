from flask import Blueprint, request, jsonify
from services.predict_service import predict_category

predict_bp = Blueprint("predict", __name__)

@predict_bp.post("/predict")
def predict_route():
    payload = request.get_json(silent=True) or {}
    text = (payload.get("text") or "").strip()

    if not text:
        return jsonify({"error": "text is required"}), 400

    category, scores = predict_category(text)
    res = {"category": category}
    if scores is not None:
        res["scores"] = scores

    return jsonify(res)