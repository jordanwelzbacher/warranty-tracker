from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/warranty_tracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class IssuerType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(50))

    def __init__(self, description):
        self.description = description

    def format_issuer_type(self):
        return {
            "id": self.id,
            "description": self.description
        }


class WarrantyWithIssuerTypeDescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product = db.Column(db.String(50), nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    expiration_date = db.Column(db.Date)
    issuer = db.Column(db.String(100))
    issuer_type_id = db.Column(db.Date)
    issuer_type_description = db.Column(db.String(50))
    pop_url = db.Column(db.String(500))

    def __repr__(self) -> str:
        return f"Warranty: {self.userId}"

    def __init__(self, user_id, product, purchase_date, expiration_date, issuer, issuer_type_id, issuer_type_description, pop_url):
        self.user_id = user_id
        self.product = product
        self.purchase_date = purchase_date
        self.expiration_date = expiration_date
        self.issuer = issuer
        self.issuer_type_id = issuer_type_id
        self.issuer_type_description = issuer_type_description
        self.pop_url = pop_url

    def format_warranty(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "product": self.product,
            "purchaseDate": self.purchase_date,
            "expirationDate": self.expiration_date,
            "issuer": self.issuer,
            "issuerTypeId": self.issuer_type_id,
            "issuerTypeDescription": self.issuer_type_description,
            "popUrl": self.pop_url
        }

class Warranty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product = db.Column(db.String(50), nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    expiration_date = db.Column(db.Date)
    issuer = db.Column(db.String(100))
    issuer_type_id = db.Column(db.Date)
    pop_url = db.Column(db.String(500))

    def __repr__(self) -> str:
        return f"Warranty: {self.userId}"

    def __init__(self, user_id, product, purchase_date, expiration_date, issuer, issuer_type_id, pop_url):
        self.user_id = user_id
        self.product = product
        self.purchase_date = purchase_date
        self.expiration_date = expiration_date
        self.issuer = issuer
        self.issuer_type_id = issuer_type_id
        self.pop_url = pop_url

    def format_warranty(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "product": self.product,
            "purchaseDate": self.purchase_date,
            "expirationDate": self.expiration_date,
            "issuer": self.issuer,
            "issuerTypeId": self.issuer_type_id,
            "popUrl": self.pop_url
        }

@app.route('/warranty', methods = ['POST'])
def create_warranty():
    print(request.json)
    user_id = request.json['userId']
    product = request.json['product']
    purchase_date = request.json['purchaseDate']
    expiration_date = request.json['expirationDate']
    issuer = request.json['issuer']
    issuer_type_id = request.json['issuerTypeId']
    pop_url = request.json['popUrl']

    warranty = Warranty(user_id, product, purchase_date, expiration_date, issuer, issuer_type_id, pop_url)
    db.session.add(warranty)
    db.session.commit()
    return warranty.format_warranty(), 201

@app.route('/warranties/<id>', methods = ['GET'])
def get_warranties_by_user_id(id):
    warranties = WarrantyWithIssuerTypeDescription.query.from_statement(db.text("SELECT w.*, i.description as issuer_type_description FROM warranty w JOIN issuer_type i ON w.issuer_type_id = i.id ORDER BY w.expiration_date DESC")).all()
    warranty_list = []
    for warranty in warranties:
        warranty_list.append(warranty.format_warranty())
    return {'warranties': warranty_list}

@app.route('/warranty/<id>', methods = ['GET'])
def get_warranty_by_id(id):
    warranty = WarrantyWithIssuerTypeDescription.query.from_statement(db.text(("SELECT w.*, i.description as issuer_type_description FROM warranty w JOIN issuer_type i ON w.issuer_type_id = i.id WHERE w.id = {id} ORDER BY w.expiration_date DESC").format(id = id))).one()
    return {'warranty': warranty.format_warranty()}

@app.route('/warranty/<id>', methods = ['DELETE'])
def delete_warranty_by_id(id):
    warranty = Warranty.query.filter_by(id=id).one()
    db.session.delete(warranty)
    db.session.commit()
    return f"Event (id: {id}) deleted!"

@app.route('/warranty/<id>', methods = ['PUT'])
def update_warranty_by_id(id):
    warranty = Warranty.query.filter_by(id=id)
    user_id = request.json['user_id']
    product = request.json['product']
    purchase_date = request.json['purchase_date']
    expiration_date = request.json['expiration_date']
    issuer_type_id = request.json['issuer_type_id']
    warranty.update(dict(user_id = user_id, product = product, purchase_date = purchase_date, expiration_date = expiration_date, issuer_type_id = issuer_type_id))
    db.session.commit()
    return {'warranty': warranty.one().format_warranty()}

@app.route('/issuer-types', methods = ['GET'])
def get_issuer_types():
    types = IssuerType.query.all()
    type_list = []
    for type in types:
        type_list.append(type.format_issuer_type())
    return {'issuerTypes': type_list}

if __name__ == '__main__':
    app.run()