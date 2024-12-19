from flask import Flask
from flask_cors import CORS
from db import db
from routes.account_route import account_route
from routes.transaction_route import transaction_route

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1703@localhost:5432/k'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)

app.register_blueprint(account_route, url_prefix='/account')
app.register_blueprint(transaction_route, url_prefix='/transaction')

CORS(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=3002)