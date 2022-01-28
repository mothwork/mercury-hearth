import json
from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from app.models import db, Card
from flask_login import current_user, login_required

page_routes = Blueprint('pages', __name__)


@page_routes.route('/<int:page_id>')
@login_required
def page_cards(page_id):
    if current_user:
        cards = Card.query.filter(Card.pageId == page_id and Card.id == current_user.id).all()
    if cards:
        card_list = [{'id': card.id, 'title':card.title, 'description':card.description, 'userId':card.userId, 'pageId':card.projectId} for card in cards]
        return jsonify(card_list)
    else:
        return jsonify('No Cards'), 204


@page_routes.route('/<int:page_id>', methods=['POST'])
@login_required
def create_card(page_id):
    if current_user:
        data = request.json
        title = data["title"]
        if len(title) < 1:
            return jsonify('Title is required.')
        try:
            new_card = {
                'title': data['title'],
                'description': data['description'],
                'imgUrl': data['imgUrl'],
                'userId': current_user.id,
                'pageId': data['pageId']
            }

            new_card_db = Card(
                **new_card
            )
            db.session.add(new_card_db)
            db.session.commit()

            new_card_return = {
                'id': new_card_db.id,
                'title':new_card_db.title,
                'userId':new_card_db.userId,
                'description':new_card_db.description,
            }
            return jsonify(new_card_return)
        except IntegrityError as e:
            return jsonify('Data error'), 400


@page_routes.route('/<int:page_id>/<int:card_id>', methods=['PUT'])
@login_required
def create_card(page_id, card_id):

    try:
        card = Card.query.filter(Card.id == card_id and current_user.id == Card.userId).first()

        data = request.json

        title = data["title"]
        if len(title) < 1:
            return jsonify('Title is required.'), 400
        card.title = title
        card.description = data['description']

        db.session.commit()
        return jsonify('Card details updated')
    except TypeError as e:
        return jsonify('Bad data'), 400


@page_routes.route('/<int:page_id>/<int:cardId>', methods=['DELETE'])
@login_required
def create_card(page_id, card_id):
    if current_user.is_authenticated:
        card = Card.query.filter(Card.id == card_id).first()
        user = current_user.to_dict()
        if user['id'] == card.userId:
            db.session.delete(card)
            db.session.commit()
            return jsonify('Card successfully deleted')
        return jsonify('Error: Unauthorized'), 401
    return jsonify('Error: Unauthorized'), 401
