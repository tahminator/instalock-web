from flask import request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_login import login_user, login_required, current_user

import datetime

from app_maker import create_app
from models import User, Video
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


@app.route("/register", methods = ['POST'])
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

@app.route("/login", methods = ['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email = email).first()

    if not user:
        return {'code': '401', 'type': '1', 'message': 'Unauthorized'}, 401
    
    if not Bcrypt().check_password_hash(user.password, password):
        return {'code': '401', 'type': '2', 'message': 'Unauthorized'}, 401
    
    login_user(user, duration=datetime.timedelta(minutes=1))

    return jsonify(
{
    'code': '200',
    'success': 'true',
    'id': user.id,
    'email': user.email
}
    )

@app.route("/profile", methods = ['GET'])
@login_required
def get_profile():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized'}, 401
    
    user = User.query.filter_by(id = current_user.id).first()

    if not user:
        session.pop("user_id")
        return {'code': '409', 'message': 'Session ID removed, please login', 'redirect': 'login'}, 404
    
    return jsonify(
        {
            'code': '200',
            'id': user.id,
            'email': user.email
        }
    )



if __name__ == '__main__':
    if MODE == 'test':
        app.run(port = 4999, debug=True)
    else:
        app.run(port = 4999, debug=False)