from .db import db
from .user import User
from .page import Page

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    description = db.Column(db.String(250), nullable=True)
    imageUrl = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    pageId = db.Column(db.Integer, db.ForeignKey(Page.id), nullable=False)

    user_relation = db.relationship('User', back_populates='card_relation')
    page_relation = db.relationship('Page', back_populates='card_relation')
