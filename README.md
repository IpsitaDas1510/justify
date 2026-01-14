# justify

python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
# pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv python-jose requests
pip install flask joblib scikit-learn python-dotenv psycopg[binary]
pip freeze > requirements.txt
