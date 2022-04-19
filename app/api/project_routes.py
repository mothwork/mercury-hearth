import json
from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from jinja2 import Undefined
from app.models import db, Project, Page, project
from flask_login import current_user, login_required

project_routes = Blueprint('projects', __name__)


# All projects
@project_routes.route('/')
@login_required
def all_projects():
    if current_user:
        projects = Project.query.filter(Project.userId == current_user.id).all()
    if projects:
        project_list = [{'id': project.id, 'title':project.title, 'description':project.description, 'userId':project.userId} for project in projects]
        return jsonify(project_list)
    else:
        return jsonify('No Projects'), 204

# Create project
@project_routes.route('/', methods=['POST'])
@login_required
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

@project_routes.route('/<int:project_id>', methods=['PUT'])
@login_required
def edit_project(project_id):
    try:
        project = Project.query.filter(Project.id == project_id).first()

        data = request.json

        title = data["title"]
        if len(title) < 1:
            return jsonify('Title is required.')
        project.title = title
        project.description = data['description']

        db.session.commit()
        return jsonify('Project details updated')
    except TypeError as e:
        return jsonify('Bad data')

@project_routes.route('/<int:project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):
    if current_user.is_authenticated:
        project = Project.query.filter(Project.id == project_id).first()
        user = current_user.to_dict()
        if user['id'] == project.userId:
            db.session.delete(project)
            db.session.commit()
            return jsonify('Project successfully deleted')
        return jsonify('Error: Unauthorized'), 401
    return jsonify('Error: Unauthorized'), 401

# Get pages
@project_routes.route('/<int:project_id>/pages')
@login_required
def all_pages(project_id):

    pages = Page.query.filter(Page.projectId == int(project_id) and Page.userId==current_user.id).all()

    if pages:
        page_list = [{"id":page.id, "title":page.title, "image":page.image, 'content':page.content, 'projectId':page.projectId, 'userId':page.userId} for page in pages]

        return jsonify(page_list)
    return jsonify('No content'), 204


@project_routes.route('/<int:project_id>', methods=['POST'])
@login_required
def new_page(project_id):
    data = request.json
    title = data['title']
    try:
        new_page = {
            'title': data['title'],
            'image': Undefined,
            'content': data['content'],
            'userId': data['userId'],
            'projectId': project_id
        }
        # Clean up so the userId comes from the current_user instead

        new_page_db = Page(
            **new_page
        )
        db.session.add(new_page_db)
        db.session.commit()

        new_page_return = {
            'id': new_page_db.id,
            'title':new_page_db.title,
            'image':new_page_db.image,
            'userId':new_page_db.userId,
            'projectId':new_page_db.projectId,
            'content':new_page_db.content,
        }
        return jsonify(new_page_return)
    except IntegrityError as e:
        return jsonify('Data error'), 400

@project_routes.route('/<int:project_id>/<int:page_id>', methods=['DELETE'])
@login_required
def delete_page(project_id, page_id):

    if current_user.is_authenticated:
        page = Page.query.filter(Page.id == page_id).first()
        user = current_user.to_dict()
        if user['id'] == page.userId:
            db.session.delete(page)
            db.session.commit()
            return jsonify('Project successfully deleted')
        return jsonify('Error: Unauthorized'), 401
    return jsonify('Error: Unauthorized'), 401

# Edit Page
@project_routes.route('/<int:project_id>/<int:page_id>', methods=['PUT'])
@login_required
def edit_page(project_id, page_id):
    if current_user.is_authenticated:
        data = request.json

        page = Page.query.filter(Page.id == page_id).first()

        user = current_user.to_dict()
        if user['id'] == page.userId:

            page.title = data['title']
            page.content = data['content']
            db.session.commit()

            edit_page_return = {
                'id': page.id,
                'title': page.title,
                'content': page.content,
                'projectId': page.projectId,
                'userId': page.userId
            }

            return jsonify(edit_page_return)
        return jsonify('Error: Unauthorized'), 401
    return jsonify('Error: Unauthorized'), 401
