from flask import Blueprint, request, jsonify
from models import Account
from db import db

account_route = Blueprint('account', __name__)

@account_route.route('/', methods=['GET'])
def get_account():
    accounts = Account.query.all()
    return jsonify([{
        'id': account.id,
        'balance': account.balance,
        'name': account.name,
        'surname': account.surname,
        'number_account': account.number_account
    } for account in accounts])
