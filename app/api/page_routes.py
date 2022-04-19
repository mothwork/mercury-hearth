import json
import re
from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from app.models import db, Card, Page
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

page_routes = Blueprint('pages', __name__)


@page_routes.route('/<int:page_id>')
@login_required
def page_cards(page_id):
    if current_user:
        cards = Card.query.filter(
            Card.pageId == page_id and Card.id == current_user.id).all()
    if cards:
        card_list = [{'id': card.id, 'imageUrl': card.imageUrl, 'title': card.title,
            'description': card.description, 'userId': card.userId, 'pageId': card.pageId} for card in cards]
        return jsonify(card_list)
    else:
        return jsonify('No Cards'), 204

@page_routes.route('/<int:page_id>', methods=['PATCH'])
@login_required
def upload_page_image(page_id):
    user = current_user.to_dict()
    if user['id'] == page.userId:
        image = request.files["image"]
        userId = request.form["userId"]
        pageId = page_id
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)
        print(upload)
        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        page = Page.query.filter(Page.id == page_id).first()

        db.session.commit()
        edit_page_return = {
            'id': page.id,
            'image': url,
            'title': page.title,
            'content': page.content,
            'projectId': page.projectId,
            'userId': page.userId
        }

        return jsonify(edit_page_return)
    return jsonify('Error: Unauthorized'), 401

@page_routes.route('/<int:page_id>', methods=['POST'])
@login_required
def create_card(page_id):

    # data = request.json
    # title = data["title"]
    # if len(title) < 1:
    #     return jsonify('Title is required.')
    image = request.files["image"]
    print('BEFORE Title')
    print('____________________REQUEST', request.form)
    title = request.form["title"]
    print('After Title')
    description = request.form["description"]
    userId = request.form["userId"]
    pageId = page_id

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print(upload)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    try:
        new_card = {
            'title': title,
            'description': description,
            'imageUrl': url,
            'userId': userId,
            'pageId': pageId
        }

        new_card_db = Card(
            **new_card
        )
        db.session.add(new_card_db)
        db.session.commit()

        new_card_return = {
            'id': new_card_db.id,
            'title': new_card_db.title,
            'userId': new_card_db.userId,
            'description': new_card_db.description,
            'imageUrl': new_card_db.imageUrl
        }
        return jsonify(new_card_return)
    except IntegrityError as e:
        return jsonify('Data error'), 400


@page_routes.route('/<int:page_id>/<int:card_id>', methods=['PUT'])
@login_required
def edit_card(page_id, card_id):

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
def delete_card(page_id, cardId):
    if current_user.is_authenticated:
        card = Card.query.filter(Card.id == cardId).first()
        print(card)
        user = current_user.to_dict()
        print(user)
        if user['id'] == card.userId:
            db.session.delete(card)
            db.session.commit()
            return jsonify('Card successfully deleted')
        return jsonify('Error: Unauthorized'), 401
    return jsonify('Error: Unauthorized'), 401
