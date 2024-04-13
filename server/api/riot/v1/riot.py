from flask import Blueprint, request, jsonify, current_app, g
from flask_login import current_user

from urllib.parse import urlparse, parse_qs
import requests
import re
import json

riot_route = Blueprint('riot', __name__, url_prefix='/riot')

def find_access_token(text):
    # Regex pattern to find 'access_token=' followed by the token until the next '&'
    pattern = r'access_token=([^&]+)'
    match = re.search(pattern, text)
    if match:
        return match.group(1)
    else:
        return "Access token not found."
    
@riot_route.before_request
def load_mode():
    g.INTERNAL_URL = current_app.config['INTERNAL_URL']

@riot_route.route('/getentitlement', methods = ['POST'])
def getentitlement():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
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
        
    return jsonify({'code': '200', 'success': 'true', 'entitlementToken': entitlements_json['entitlements_token'], 'authToken': access_token, 'success': 'true'}), 200
    
@riot_route.route('/getmmr', methods = ['POST'])
def getmmr():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    eT = request.json['entitlementToken']
    aT = request.json['authToken']

    if eT is None or aT is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    response = requests.get("https://valorant-api.com/v1/version")
    version = response.json()['data']['riotClientVersion']

    if version is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    user_info = resp.json()
    puuid = user_info['sub']
    print(puuid)
    name = f"{user_info['acct']['game_name']}#{user_info['acct']['tag_line']}"

    if puuid is None or name is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    res= requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=20&queue=competitive", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT, "X-Riot-ClientPlatform": "ew0KICAgICJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KICAgICJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KICAgICJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCiAgICAicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"})
    rank = res.json()['Matches'][0]['TierAfterUpdate']
    tier = ""
    match rank:
        case 3:
            tier = "Iron 1"
        case 4:
            tier = "Iron 2"
        case 5:
            tier = "Iron 3"
        case 6:
            tier = "Bronze 1"
        case 7:
            tier = "Bronze 2"
        case 8:
            tier = "Bronze 3"
        case 9:
            tier = "Silver 1"
        case 10:
            tier = "Silver 2"
        case 11:
            tier = "Silver 3"
        case 12:
            tier = "Gold 1"
        case 13:
            tier = "Gold 2"
        case 14:
            tier = "Gold 3"
        case 15:
            tier = "Platinum 1"
        case 16:
            tier = "Platinum 2"
        case 17:
            tier = "Platinum 3"
        case 18:
            tier = "Diamond 1"
        case 19:
            tier = "Diamond 2"
        case 20:
            tier = "Diamond 3"
        case 21:
            tier = "Ascendant 1"
        case 22:
            tier = "Ascendant 2"
        case 23:
            tier = "Ascendant 3"
        case 24:
            tier = "Immortal 1"
        case 25:
            tier = "Immortal 2"
        case 26:
            tier = "Immortal 3"
        case 27:
            tier = "Radiant"
        case default:
            tier = "Unknown"

    RR = res.json()['Matches'][0]['RankedRatingAfterUpdate']

    return jsonify({'code': '200', 'success': 'true', 'rank': f'{tier} {RR}/100', 'name': f'{name}', 'success': 'true'}), 200


    

@riot_route.route('/getversion', methods = ['GET'])
def getversion():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    response = requests.get("https://valorant-api.com/v1/version")
    version_json = response.json()

    return jsonify({'code': '200', 'success': 'true', 'version': version_json['data']['version'], 'success': 'true'}), 200

@riot_route.route('/getuserinfo', methods = ['POST'])
def getuserinfo():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    aT = request.json['authToken']

    if aT is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    response = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    user_info = response.json()

    return jsonify({'code': '200', 'success': 'true', 'puuid': user_info['sub'], 'name': f'{user_info['acct']['game_name']}#{user_info['acct']['tag_line']}', 'success': 'true'}), 200

# @riot_route.route('/getnameservice', methods = ['POST'])
# def getnameservice():
#     if not current_user.is_authenticated:
#         return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
#     aT = request.json['authToken']
#     eT = request.json['entitlementToken']

#     if aT is None:
#         return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
#     response = requests.get("https://pd.na.a.pvp.net/name-service/v2/players", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT})
#     nameservice = response.json()
#     print(nameservice)

#     return jsonify({'code': '200', 'success': 'true', 'name_service': user_info['acct']['game_name'], 'success': 'true'}), 200