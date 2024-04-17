from flask import Blueprint, jsonify, request, current_app, g
from flask_login import current_user, logout_user, login_user # type: ignore
from flask_bcrypt import Bcrypt # type: ignore
from flask_mail import Message # type: ignore

from model import User
from extension import db, mail, bcrypt
from model import get_reset_token

import jwt
import datetime
from typing import *

auth_route = Blueprint('auth', __name__, url_prefix='/auth')

"""
Loading the MODE and SECRET_KEY from the config file stored in the Flask app so I can have a granularized control over the environment.
"""
@auth_route.before_request
def load_mode():
    g.MODE = current_app.config['MODE']
    g.SECRET_KEY = current_app.config['SECRET_KEY']

"""
/api - Default message
"""
def index():
    return jsonify({'code': 200, 'message': 'Hello, World!', 'success': 'true'})

"""
/api/auth/logout - Logs out the user
"""
@auth_route.route("/logout", methods = ['POST'])
def logout():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    logout_user()
    return jsonify({'code': '200', 'success': 'true'}), 200

"""
/api/auth/register - Registers the user
"""
@auth_route.route("/register", methods = ['POST'])
def register():
    request_json: Union[dict[str, str], None] = request.json
    email: Union[str, None] = request_json.get('email') if request_json is not None else None
    password: Union[str, None] = request_json.get('password') if request_json is not None else None

    if type(email) != str or type(password) != str:
        return {'code': '400', 'message': 'Bad Request'}, 400
    
    if len(password) < 8:
        return jsonify({'code': '401', 'message': 'Password too short.', 'type': '1', 'success': 'false'}), 401
    
    if not any([x.isupper() for x in password]):
        return jsonify({'code': '401', 'message': 'Password must contain at least one uppercase letter.', 'type': '2', 'success': 'false'}), 401
    

    user: User | None = User.query.filter_by(email = email).first()

    if user:
        return {'code': '409', 'message': 'User already exists'}, 404
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    if not hashed_password:
        return jsonify({'code': '500', 'message': 'Internal server error', 'success': 'false'}), 500
    new_user: User = User(email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'code': '200', 'success': 'true', 'id': new_user.id, 'email': new_user.email})

"""
/api/auth/login - Logs in the user
"""
@auth_route.route("/login", methods = ['POST'])
def login():
    if g.MODE == "test":
        import time
        time.sleep(1)

    request_json: Union[dict[str, str], None] = request.json

    email: Union[str, None] = request_json.get('email') if request_json is not None else None
    password: Union[str, None] = request_json.get('password') if request_json is not None else None
    remember_me: Union[bool, None] = bool(request_json.get('rememberMe')) if request_json is not None else None
    
    if type(email) != str or type(password) != str or type(remember_me) != bool or not email or not password or not remember_me:
        return {'code': '400', 'message': 'Bad Request'}, 400

    user: User | None = User.query.filter_by(email = email).first()

    if not user:
        return jsonify({'code': '401', 'type': '1', 'message': 'Unauthorized', 'success': 'false'}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return {'code': '401', 'type': '2', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    login_user(user, duration = datetime.timedelta(hours = 3), remember = remember_me)

    return jsonify({'code': '200', 'success': 'true', 'id': user.id, 'email': user.email})

"""
/api/auth/password/checktoken - Checks if the password JWT token is valid or not
"""
@auth_route.route("/password/checktoken", methods = ['POST'])
def checkpwtoken():
    token: Union[str, None] = request.args.get('token')

    if not token or type(token) != str:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400
    
    try:
        email: Union[str, None] = jwt.decode(token, g.SECRET_KEY, algorithms = "HS256")['reset_password'] # type: ignore
    except jwt.DecodeError as E:
        return jsonify({'code': '400', 'message': 'bad request', 'success': 'false'}), 400
    except Exception as E:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

    existing_user: User | None = User.query.filter_by(email = email).first()

    if existing_user:
        return jsonify({'code': '200', 'email': existing_user.email, 'success': 'true'}), 200
    
    return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

"""
/api/auth/password/reset -  Sends the email to reset user password
"""
@auth_route.route("/password/reset", methods = ['POST'])
def iforgot():
    request_json: Union[dict[str, str], None] = request.json
    email: Union[str, None] = request_json.get('email') if request_json is not None else None

    if type(email) != str or not email:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

    existing_user: User | None = User.query.filter_by(email = email).first()

    if existing_user:
        token: str = get_reset_token(existing_user.email, expires=30)
        message: Message = Message(recipients=[email], subject = "Instalock password reset", body = f"Click the link to reset your password: {"http://localhost:5173" if g.MODE == "test" else "https://instalock.midhat.io"}/resetpassword?token={token}")
        mail.send(message)
        return jsonify({'code': '200', 'success': 'true'}), 200
    
    return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

"""
/api/auth/password/change - The follow up route to reset password after getting password reset link.
"""
@auth_route.route("/password/change", methods = ['POST'])
def changepassword():
    token: Union[str, None] = request.args.get('token')
    if not token or type(token) != str:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400
    try:
        email: Union[str, None] = jwt.decode(token, g.SECRET_KEY, algorithms = "HS256")['reset_password'] # type: ignore
    except jwt.DecodeError as E:
        return jsonify({'code': '400', 'message': 'bad request', 'success': 'false'}), 400
    except Exception as E:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

    existing_user: User | None = User.query.filter_by(email = email).first()

    if existing_user:
        request_json: Union[dict[str, str], None] = request.json

        password: Union[str, None] = request_json.get('password') if request_json is not None else None
        if type(password) != str or not password:
            return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400
        
        if len(password) < 8:
            return jsonify({'code': '401', 'message': 'Password too short.', 'type': '1', 'success': 'false'}), 401
    
        if not any([x.isupper() for x in password]):
            return jsonify({'code': '401', 'message': 'Password must contain at least one uppercase letter.', 'type': '2', 'success': 'false'}), 401
    
        hashed_password: str = bcrypt.generate_password_hash(password).decode('utf-8')
        if bcrypt.check_password_hash(existing_user.password, password):
            return jsonify({'code': '403', 'message': 'Cannot use same password', 'success': 'false'}), 403
        
        if not hashed_password:
            return jsonify({'code': '500', 'message': 'Internal server error', 'success': 'false'}), 500
        
        existing_user.password = hashed_password
        db.session.commit()

        return jsonify({'code': '200', 'success': 'true'}), 200
    
    return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400