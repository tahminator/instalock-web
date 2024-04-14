from flask import Blueprint, jsonify
from api.auth.v1.auth import auth_route
from api.profile.v1.profile import profile_route
from api.riot.v1.riot import riot_route
from api.beat.v1.beat import heartbeat_route

api_route = Blueprint('api', __name__, url_prefix='/api')

api_route.register_blueprint(auth_route)
api_route.register_blueprint(profile_route)
api_route.register_blueprint(riot_route)
api_route.register_blueprint(heartbeat_route)

@api_route.route('/')
def index():
    return jsonify({'code': 200, 'message': 'Hello, World!', 'success': 'true'})