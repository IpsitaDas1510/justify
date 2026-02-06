from ml.ml_model import predict

def predict_category(text: str):
    """
    Business logic wrapper around ML prediction.
    """
    return predict(text)