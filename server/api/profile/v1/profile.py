from flask import Blueprint, jsonify
from flask_login import current_user

profile_route = Blueprint('profile', __name__, url_prefix='/profile')

@profile_route.route("/", methods = ['GET'])
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
