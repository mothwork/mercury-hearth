import json
from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from app.models import db, Project
from flask_login import current_user

page_routes = Blueprint('pages', __name__)


