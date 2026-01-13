from flask import Blueprint, request, jsonify
import json

from db import get_conn
# from ml_model import predict_scores, vectorizer, model

bp = Blueprint("api", __name__)

@bp.get("/health")
def health():
    return {"status": "ok"}