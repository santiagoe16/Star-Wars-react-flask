from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    character_id = db.Column(db.String(200), unique=False, nullable=False)
    name = db.Column(db.String(200), unique=True, nullable=False)
    image = db.Column(db.String(1000), unique=False, nullable=False)
    category = db.Column(db.String(100), unique=False, nullable=False)

    def __repr__(self):
        return f'<Favorite {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "name": self.name,
            "image": self.image,
            "category": self.category,
        }
    
