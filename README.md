# justify

python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
# pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv python-jose requests
pip install flask joblib scikit-learn python-dotenv psycopg[binary]
pip freeze > requirements.txt



# Create the venv
python3 -m venv .venv

# Activate the venv
source .venv/bin/activate

# Upgrade pip to latest if required
python -m pip install --upgrade pip

# Install necessary modules
pip install flask joblib scikit-learn python-dotenv psycopg[binary]

# Fix interpreter issues if shows up
# For any linting errors by the IDE, choose an different interpreter option from the Fix menu and provide the current venv as an interpreter

# Freeze all the libraries with all their versions
pip freeze > requirements.txt

# to install cors
pip install flask-cors