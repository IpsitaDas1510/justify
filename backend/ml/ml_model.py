# backend/ml_model.py
import joblib

from pathlib import Path

# project root = /workspaces/justify
ROOT_DIR = Path(__file__).resolve().parents[2]

# model lives in /workspaces/justify/ml/
MODEL_PATH = ROOT_DIR / "ml" / "bbc_model.joblib"

bundle = joblib.load(MODEL_PATH)

vectorizer = bundle["vectorizer"]
model = bundle["model"]
id_to_label = bundle.get("id_to_label")

def predict(text: str):
    """
    Returns (category, scores_or_none)
    """
    X = vectorizer.transform([text])
    pred = model.predict(X)[0]

    if id_to_label is not None:
        pred = id_to_label[int(pred)]

    scores = None
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X)[0]
        classes = list(model.classes_)
        if id_to_label is not None:
            classes = [id_to_label[int(c)] for c in classes]
        scores = {str(classes[i]): float(probs[i]) for i in range(len(classes))}

    return str(pred), scores