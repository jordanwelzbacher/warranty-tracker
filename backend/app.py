from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/warranty_tracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class Warranty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product = db.Column(db.String(50), nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    expiration_date = db.Column(db.Date)
    issuer_type_id = db.Column(db.Date)

    def __repr__(self) -> str:
        return f"Warranty: {self.userId}"

    def __init__(self, user_id, product, purchase_date, expiration_date, issuer_type_id):
        self.user_id = user_id
        self.product = product
        self.purchase_date = purchase_date
        self.expiration_date = expiration_date
        self.issuer_type_id = issuer_type_id

    def format_warranty(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product": self.product,
            "purchase_date": self.purchase_date,
            "expiration_date": self.expiration_date,
            "issuer_type_id": self.issuer_type_id
        }


@app.route('/warranty', methods = ['POST'])
def create_warranty():
    user_id = request.json['user_id']
    product = request.json['product']
    purchase_date = request.json['purchase_date']
    expiration_date = request.json['expiration_date']
    issuer_type_id = request.json['issuer_type_id']

    warranty = Warranty(user_id, product, purchase_date, expiration_date, issuer_type_id)

    db.session.add(warranty)
    db.session.commit()
    # return Warranty.format_warranty(warranty)

    return warranty.format_warranty(), 201

@app.route('/warranty/<id>', methods = ['GET'])
def get_warranties_by_user_id(id):
    warranties = Warranty.query.filter_by(user_id=id).order_by(Warranty.id.asc()).all()
    warranty_list = []
    for warranty in warranties:
        warranty_list.append(warranty.format_warranty())
    return {'warranties': warranty_list}

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

if __name__ == '__main__':
    app.run()