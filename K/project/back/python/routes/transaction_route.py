from flask import Blueprint, request, jsonify
from models import Transaction
from models import Account
from db import db

transaction_route = Blueprint('transaction', __name__)

@transaction_route.route('/', methods=['GET'])
def get_transaction():
    transactions = Transaction.query.all()
    return jsonify([{
        'id': transaction.id,
        'account_id': transaction.account_id,
        'number_account': transaction.number_account,
        'amount': transaction.amount
    } for transaction in transactions])

@transaction_route.route('/', methods=['POST'])
def post_transaction():
    data = request.get_json()

    required_fields = ['account_id', 'number_account', 'amount']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    from_account_id = data['account_id']
    to_account_num = data['number_account']
    amount = data['amount']

    if amount <= 0:
        return jsonify({'error': 'Amount must be greater than zero'}), 400
    
    from_account = Account.query.get(from_account_id)
    if not from_account or from_account.balance < amount:
        return jsonify({'error': 'Insufficient funds or invalid sender account'}), 400
    
    to_account = Account.query.filter_by(number_account=to_account_num).first()
    if not to_account:
        return jsonify({'error': 'Invalid recipient account'}), 400

    from_account.balance -= amount
    to_account.balance += amount

    new_transaction = Transaction(
        account_id=from_account_id,
        number_account=to_account_num,
        amount=amount
    )

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({
        'id': new_transaction.id,
        'account_id': new_transaction.account_id,
        'number_account': new_transaction.number_account,
        'amount': new_transaction.amount
    }), 201
