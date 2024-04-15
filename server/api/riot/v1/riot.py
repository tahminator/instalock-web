from flask import Blueprint, request, jsonify, current_app, g
from flask_login import current_user

from urllib.parse import urlparse, parse_qs
import requests
import re
import json

import api.riot.v1.Functionx as Functionx

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
    name = f"{user_info['acct']['game_name']}#{user_info['acct']['tag_line']}"

    if puuid is None or name is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    res= requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=20&queue=competitive", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT, "X-Riot-ClientPlatform": "ew0KICAgICJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KICAgICJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KICAgICJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCiAgICAicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"})
    rank = res.json()['Matches'][0]['TierAfterUpdate']
    tier = Functionx.number_to_rank(rank)

    RR = res.json()['Matches'][0]['RankedRatingAfterUpdate']

    return jsonify({'code': '200', 'success': 'true', 'rank': f'{tier}', 'rr': f'{RR}', 'name': f'{name}', 'type': f'{rank}', 'success': 'true'}), 200

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

@riot_route.route('/getmatches', methods = ['POST'])
def get_matches():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    eT = request.json['entitlementToken']
    aT = request.json['authToken']

    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    user_info = resp.json()
    puuid = user_info['sub']

    res= requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=20", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT, "X-Riot-ClientPlatform": "ew0KICAgICJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KICAgICJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KICAgICJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCiAgICAicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"})
    matches = res.json()['Matches']
    # print(matches)
    # json.dump(matches, open('matches.json', 'w'))
    new_js = {}
    new_js['data'] = []
    for i in range(len(matches)):
        respo = requests.get(f"https://pd.na.a.pvp.net/match-details/v1/matches/{matches[i]['MatchID']}", headers={"Authorization": "Bearer " + aT, "X-Riot-Entitlements-JWT": eT})
        match_deets = respo.json()
        if respo.status_code != 200:
            pass
        else:
            new_js['data'].append({})
            new_js['data'][i]['matchid'] = matches[i].get('MatchID', None)
            new_js['data'][i]['pretier'] = matches[i].get('TierBeforeUpdate', None)
            new_js['data'][i]['posttier'] = matches[i].get('TierAfterUpdate', None)
            new_js['data'][i]['prerr'] = matches[i].get('RankedRatingBeforeUpdate', None)
            new_js['data'][i]['postrr'] = matches[i].get('RankedRatingAfterUpdate', None)
            new_js['data'][i]['rrdiff'] = matches[i].get('RankedRatingEarned', None)
            new_js['data'][i]['map'] = matches[i].get('MapID', None)
            new_js['data'][i]['realmapname'] = Functionx.map_id_to_map(matches[i].get('MapID')) or None
            new_js['data'][i]['mapcode'] = Functionx.map_id_to_code(matches[i].get('MapID')) or None
            new_js['data'][i]['date'] = matches[i].get('MatchStartTime', None)
            # json.dump(match_deets, open(f'matches{i}.json', 'w'))
            match_info = match_deets.get('matchInfo', {})
            new_js['data'][i]['duration'] = match_info.get('gameLengthMillis', None)
            new_js['data'][i]['completed'] = match_info.get('isCompleted', None)
            new_js['data'][i]['gamemode'] = Functionx.check_game_mode(match_info.get('queueID')) or None
            new_js['data'][i]['players'] = []
            for j in range(len(match_deets.get('players', []))):
                player_info = match_deets['players'][j]
                new_js['data'][i]['players'].append({
                    'name': player_info.get('gameName', '') + "#" + player_info.get('tagLine', ''),
                    'puuid': player_info.get('subject', None),
                    'teamid': player_info.get('teamId', None),
                    'character': player_info.get('characterId', None),
                    'charactertype': Functionx.agent_id_to_picture(player_info.get('characterId')) or None,
                    'charactername': Functionx.agent_id_to_name(player_info.get('characterId')) or None,
                    'kills': player_info.get('stats', {}).get('kills', None),
                    'deaths': player_info.get('stats', {}).get('deaths', None),
                    'tier': player_info.get('competitiveTier', None)
                })
                if player_info.get('subject') == puuid:
                    new_js['data'][i]['me'] = new_js['data'][i]['players'][j]
    
    # json.dump(new_js, open('new_js.json', 'w'))
    new_js['success'] = 'true'
    new_js['code'] = '200'
    return jsonify(new_js), 200

@riot_route.route('/checkpregame', methods = ['POST'])
def checkpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    eT = request.json['entitlementToken']
    aT = request.json['authToken']

    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    user_info = resp.json()
    puuid = user_info['sub']

    res = requests.get(f"https://glz-na-1.na.a.pvp.net/pregame/v1/players/{puuid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT})
    pregame = res.json()
    print(pregame)
    try:
        return jsonify({'code': '200', 'success': 'true', 'matchid': pregame['MatchID'], 'success': 'true'}), 200
    except:
        return '', 400
    
@riot_route.route('/pregame/data', methods = ['POST'])
def datapregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    eT = request.json['entitlementToken']
    aT = request.json['authToken']
    matchid = request.json['matchId']

    resp = requests.get(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT})
    pregame = resp.json()
    print(pregame)
    new_json = {}
    new_json['data'] = {}
    new_json['data']['mapid'] = Functionx.map_id_to_code(pregame['MapID'])
    new_json['data']['mapname'] = Functionx.map_id_to_map(pregame['MapID'])
    return jsonify(new_json), 200

@riot_route.route('/pregame/select', methods = ['POST'])
def selectpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    eT = request.json['entitlementToken']
    aT = request.json['authToken']
    matchid = request.json['matchId']
    agentid = request.json['agentId']

    resp = requests.post(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}/select/{agentid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT})   
    json.dump(resp.json(), open('new_js.json', 'w'))
    return jsonify({'code': '200', 'message': 'success', 'success': 'true'}), 200

@riot_route.route('/pregame/lock', methods = ['POST'])
def lockpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    eT = request.json['entitlementToken']
    aT = request.json['authToken']
    matchid = request.json['matchId']
    agentid = request.json['agentId']

    resp = requests.post(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}/lock/{agentid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT})   
    json.dump(resp.json(), open('new_js.json', 'w'))
    return jsonify({'code': '200', 'message': 'success', 'success': 'true'}), 200


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