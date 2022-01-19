
from .db import db
from .user import User

class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text, nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    user_relation = db.relationship('User', back_populates='project_relation')
    page_relation = db.relationship('Page', back_populates='project_relation',  cascade="all, delete")
