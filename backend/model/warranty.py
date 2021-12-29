# from flask_sqlalchemy import SQLAlchemy

# from app import app

# db = SQLAlchemy(app)

# class Warranty(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     userId = db.Column(db.Integer, foreign_key=True)
#     product = db.Column(db.String(50), nullable=False)
#     purchaseDate = db.Column(db.Date, nullable=False)
#     expirationDate = db.Column(db.Date)
#     issuerTypeId = db.Column(db.Date, foreign_key=True)

#     def __repr__(self) -> str:
#         return f"Warranty: {self.userId}"

#     def __init__(self, userId, product, purchaseDate, expirationDate, issuerTypeId):
#         self.userId = userId
#         self.product = product
#         self.purchaseDate = purchaseDate
#         self.expirationDate = expirationDate
#         self.issuerTypeId = issuerTypeId