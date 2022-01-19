from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from app.models import db, Project
from flask_login import current_user

project_routes = Blueprint('projects', __name__)


# All projects
@project_routes.route('/')
def all_projects():
    # if current_user:
    #     user = current_user.to_dict()

    # projects = Project.query.filter(Project.userId == user.id).all()
    projects = Project.query.all()
    if projects:
        project_list = [{'id': project.id, 'title':project.title, 'description':project.description, 'userId':project.userId} for project in projects]
        return jsonify(project_list)
    else:
        return jsonify('No Projects Found'), 404

# Create project
@project_routes.route('/', methods=['POST'])
def new_project():
    data = request.json
    title = data["title"]
    if len(title) < 1:
        return jsonify('Title is required.')

    try:
        new_project = {
            'title': data['title'],
            'description': data['description'],
            'userId': data['userId']
        }

        new_project_db = Project(
            **new_project
        )
        db.session.add(new_project_db)
        db.session.commit()

        new_project_return = {
            'id': new_project_db.id,
            'title':new_project_db.title,
            'userId':new_project_db.userId,
            'description':new_project_db.description,
        }
        return jsonify(new_project_return)
    except IntegrityError as e:
        return jsonify('Data error'), 400
