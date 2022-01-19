from .db import db
from .user import User
from .project import Project


class Page(db.Model):
    __tablename__ = 'pages'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    content = db.Column(db.Text, nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey(Project.id), nullable=False)

    project_relation = db.relationship('Project', back_populates='page_relation')
    user_relation = db.relationship('User', back_populates='page_relation')
    card_relation = db.relationship('Card', back_populates='page_relation', cascade='all, delete')
