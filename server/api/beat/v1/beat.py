from flask import Blueprint, jsonify
from flask_login import current_user

heartbeat_route = Blueprint('heartbeat', __name__, url_prefix='/heartbeat')

@heartbeat_route.route("/check", methods = ['GET'])
def get_profile():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    return jsonify(
        {
            'code': '200',
            'success': 'true',
        }
    )
