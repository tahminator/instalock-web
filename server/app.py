from flask import request, jsonify, session, redirect, url_for, render_template
from flask_bcrypt import Bcrypt
from flask_login import login_user, login_required, current_user, logout_user

import datetime
import jwt

from app_maker import create_app
from model import User, get_reset_token
from extension import db, sesh, login_manager, mail, Message

from api.base import api_route

"""
TODO - Implement types into API
TODO - Move API routes into separate folder
TODO - Set server-side guidelines for email and password
TODO - Try HCaptcha Solver on Riot's API
"""

app = create_app()

app.register_blueprint(api_route)

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

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({'code': 404, 'message': 'Does not exist', 'success': 'false'}), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'code': 405, 'message': 'Method not allowed', 'success': 'false'}), 405

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify({'code': 500, 'message': 'Internal server error', 'success': 'false'}), 500

@app.errorhandler(400)
def bad_request(e):
    return jsonify({'code': 400, 'message': 'Bad request', 'success': 'false'}), 400

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return render_template("index.html")

if __name__ == '__main__':
    if MODE == 'test':
        app.run(port = 4999, debug=True)
    else:
        app.run(port = 4999, debug=False)