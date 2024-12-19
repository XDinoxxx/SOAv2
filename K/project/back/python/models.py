from db import db

class Account(db.Model):
    __tablename__ = 'account'
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    balance = db.Column(db.Float, nullable=False)
    name = db.Column(db.String, nullable=False)
    surname = db.Column(db.String, nullable=False)
    number_account = db.Column(db.String, nullable=False)

class Transaction(db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    account_id = db.Column(db.Integer, nullable=False)
    number_account = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)