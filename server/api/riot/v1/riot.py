from flask import Blueprint, request, jsonify
from flask_login import current_user

from urllib.parse import urlparse, parse_qs
import requests
import re

riot_route = Blueprint('riot', __name__, url_prefix='/riot')

def find_access_token(text):
    # Regex pattern to find 'access_token=' followed by the token until the next '&'
    pattern = r'access_token=([^&]+)'
    match = re.search(pattern, text)
    if match:
        return match.group(1)
    else:
        return "Access token not found."

@riot_route.route('/getentitlement', methods = ['POST'])
def getentitlement():
    # if not current_user.is_authenticated:
    #     return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    url = request.json['url']

    if url is None or ("https://playvalorant.com/" not in url):
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    access_token = find_access_token(url)

    if access_token is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    response = requests.post("https://entitlements.auth.riotgames.com/api/token/v1", headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"})
    entitlements_json = response.json()

    if not entitlements_json['entitlements_token']:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
        
    return jsonify({'code': '200', 'success': 'true', 'entitlements': entitlements_json['entitlements_token'], 'access_token': access_token, 'success': 'true'}), 200
    
    