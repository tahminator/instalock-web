from flask import Blueprint, jsonify, request, current_app, g
from flask_login import current_user, logout_user, login_user
from flask_bcrypt import Bcrypt
from flask_mail import Message

from model import User
from extension import db, mail
from model import get_reset_token

import jwt
import datetime

auth_route = Blueprint('auth', __name__, url_prefix='/auth')

@auth_route.before_request
def load_mode():
    g.MODE = current_app.config['MODE']
    g.SECRET_KEY = current_app.config['SECRET_KEY']

def index():
    return jsonify({'code': 200, 'message': 'Hello, World!', 'success': 'true'})

@auth_route.route("/changepassword", methods = ['POST'])
def changepassword():
    token = request.args.get('token')
    if not token:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400
    try:
        email = jwt.decode(token, g.SECRET_KEY, algorithms="HS256")['reset_password']
    except Exception as E:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

    existing_user = User.query.filter_by(email = email).first()

    if existing_user:
        password = request.json['password']
        hashed_password = Bcrypt().generate_password_hash(password).decode('utf-8')
        existing_user.password = hashed_password
        db.session.commit()
        return jsonify({'code': '200', 'success': 'true'}), 200
    
    return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400


@auth_route.route("/logout", methods = ['POST'])
def logout():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    logout_user()
    return jsonify({'code': '200', 'success': 'true'}), 200

@auth_route.route("/register", methods = ['POST'])
def register():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email = email).first()

    if user:
        return {'code': '409', 'message': 'User already exists'}, 404
    
    hashed_password = Bcrypt().generate_password_hash(password).decode('utf-8')
    new_user = User(email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(
{
    'code': '200',
    'success': 'true',
    'id': new_user.id,
    'email': new_user.email
}
    )

@auth_route.route("/login", methods = ['POST'])
def login():
    import time
    time.sleep(1)
    email = request.json['email']
    password = request.json['password']
    remember_me = request.json['rememberMe']
    
    if type(email) != str or type(password) != str or type(remember_me) != bool:
        return {'code': '400', 'message': 'Bad Request'}, 400

    user = User.query.filter_by(email = email).first()

    if not user:
        return jsonify({'code': '401', 'type': '1', 'message': 'Unauthorized', 'success': 'false'}), 401
    
    if not Bcrypt().check_password_hash(user.password, password):
        return {'code': '401', 'type': '2', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    login_user(user, duration=datetime.timedelta(minutes=59), remember=remember_me)

    return jsonify(
    {
        'code': '200',
        'success': 'true',
        'id': user.id,
        'email': user.email
    }
    )

@auth_route.route("/resetpassword", methods = ['POST'])
def iforgot():
    email = request.json['email']

    existing_user = User.query.filter_by(email = email).first()

    if existing_user:
        token = get_reset_token(existing_user.email, expires=30)
        message = Message(recipients=[email], subject = "Instalock password reset", body = f"Click the link to reset your password: {"http://localhost:5173" if g.MODE == "test" else "https://instalock.midhat.io"}/resetpassword?token={token}")
        mail.send(message)
        return jsonify({'code': '200', 'success': 'true'}), 200
    
    return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

@auth_route.route("/checkpasswordtoken", methods = ['POST'])
def checkpwtoken():
    token = request.args.get('token')
    if not token:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400
    try:
        email = jwt.decode(token, g.SECRET_KEY, algorithms="HS256")['reset_password']
    except Exception as E:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

    existing_user = User.query.filter_by(email = email).first()

    if existing_user:
        return jsonify({'code': '200', 'email': existing_user.email, 'success': 'true'}), 200
    
    return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400