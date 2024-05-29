from flask import request, jsonify, session, redirect, url_for

from api.app_maker import create_app
from api.model import User
from api.extension import db, login_manager

from api.api_routes.base import api_route

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
    # db.drop_all()
    # db.create_all()
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


if MODE == 'test':
    @app.route('/')
    def index():
        return redirect(url_for('api.index'))
else:
    pass
    # # Serve React App
    # @app.route('/', defaults={'path': ''})
    # @app.route('/<path:path>')
    # def serve(path):
    #     print(app.static_folder + '/' + path)
    #     if path != "" and os.path.exists(app.static_folder + '/' + path):
    #         return send_from_directory(app.static_folder, path)
    #     else:
    #         return send_from_directory(app.static_folder, 'index.html')
