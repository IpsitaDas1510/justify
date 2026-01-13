from flask import Flask
# from db import ensure_schema
from routes import bp
from db import get_conn

def create_app():
    app = Flask(__name__)
    app.register_blueprint(bp)
    return app

app = create_app()
conn = get_conn()

# Run once on startup
# ensure_schema()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)