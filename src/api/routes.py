"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/favorites', methods=['GET'])
def get_favorites():
    favorites = Favorite.query.all() 
    
    return jsonify([favorite.serialize() for favorite in favorites]), 200

@api.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.get_json()

    required_fields = ["character_id", "name", "image", "category"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    existing_favorite = Favorite.query.filter_by(character_id=data["character_id"]).first()
    if existing_favorite:
        return jsonify({"error": "Favorite with this character_id already exists"}), 400

    new_favorite = Favorite(
        character_id=data["character_id"],
        name=data["name"],
        image=data["image"],
        category=data["category"]
    )

    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(new_favorite.serialize()), 201

@api.route('/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    favorite = Favorite.query.get(id)  

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)  
    db.session.commit() 
    return jsonify({"message": "Favorite deleted successfully"}), 200
