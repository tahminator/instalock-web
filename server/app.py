from flask import request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_login import login_user, login_required, current_user, logout_user

import datetime

from app_maker import create_app
from model import User, Video
from extension import db, sesh, login_manager

app = create_app()

MODE = app.config['MODE']

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(str(user_id))

with app.app_context():
    # with app.test_request_context():
    #     session.clear()
    # db.drop_all()
    if MODE == 'test':
        db.create_all()


@app.route("/api/register", methods = ['POST'])
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

@app.route("/api/login", methods = ['POST'])
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
    
    login_user(user, duration=datetime.timedelta(minutes=1), remember=remember_me)

    return jsonify(
{
    'code': '200',
    'success': 'true',
    'id': user.id,
    'email': user.email
}
    )

@app.route("/api/profile", methods = ['GET'])
def get_profile():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized'}, 401
    
    return jsonify(
        {
            'code': '200',
            'success': 'true',
            'id': current_user.id,
            'email': current_user.email
        }
    )

@app.route("/api/logout", methods = ['POST'])
def logout():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    logout_user()
    return jsonify({'code': '200', 'success': 'true'}), 200


if __name__ == '__main__':
    if MODE == 'test':
        app.run(port = 4999, debug=True)
    else:
        app.run(port = 4999, debug=False)