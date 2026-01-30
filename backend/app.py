# from flask import Flask
# # from db import ensure_schema
# from routes import bp
# from db import get_conn

# def create_app():
#     app = Flask(__name__)
#     app.register_blueprint(bp)
#     return app

# app = create_app()
# conn = get_conn()

# # Run once on startup
# # ensure_schema()

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)



from flask import Flask
from flask_cors import CORS

# from db import ensure_schema, db_check

from controllers.health_controller import health_bp
# from controllers.predict_controller import predict_bp
# from controllers.cases_controller import cases_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # db_check()
    # ensure_schema()

    app.register_blueprint(health_bp)
    # app.register_blueprint(predict_bp)
    # app.register_blueprint(cases_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)