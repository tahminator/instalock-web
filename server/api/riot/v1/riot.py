from flask import Blueprint, request, jsonify, current_app, g
from flask_login import current_user # type: ignore

from urllib.parse import urlparse, parse_qs
import requests
import re
import json
from typing import *

import api.riot.v1.Functionx as Functionx

riot_route = Blueprint('riot', __name__, url_prefix='/riot')

"""
Deprecated for now.
"""
# @riot_route.before_request
# def load_mode():
#     g.INTERNAL_URL = current_app.config['INTERNAL_URL']

"""
/api/riot/get/entitlements - Gets the entitlement token from the URL given from the client and returns the entitlement token and the auth token.
"""
@riot_route.route('/get/entitlements', methods = ['POST'])
def getentitlement():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None

    url: str | None = request_json.get('url') if request_json is not None else None

    if url is None or ("https://playvalorant.com/" not in url) or (type(url) != str):
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    # Get the access token from the URL
    access_token: str | None = Functionx.find_access_token(url)

    if access_token is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    # Use the access token from the URL and get the entitlement token and auth token from the Riot API
    # TODO: Look at the JSON files to figure out specific types instead of Any
    response = requests.post("https://entitlements.auth.riotgames.com/api/token/v1", headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"})
    entitlements_json: Union[dict[Any, Any], None] = response.json()
    print(entitlements_json)

    if entitlements_json is not None and 'entitlements_token' in entitlements_json:
        eT: str | None = entitlements_json['entitlements_token']
    else:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
        
    return jsonify({'code': '200', 'success': 'true', 'entitlementToken': eT, 'authToken': access_token, 'success': 'true'}), 200

"""
/api/riot/get/mmr - Gets the Rank, Tier and Name of the user from the Riot API and returns to the user.
"""
@riot_route.route('/get/mmr', methods = ['POST'])
def getmmr():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    eT: Union[str, None] = request_json.get('entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None

    if eT is None or aT is None or (type(eT) != str) or (type(aT) != str):
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    # Get the riotClientVersion of the Riot Client program, but from a third party API in order to avoid having to log in and access lockfile to get the same data.
    response = requests.get("https://valorant-api.com/v1/version")
    version: Union[str, None] = response.json()['data']['riotClientVersion']

    if version is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    # Get PUUID and name of the user from Riot API
    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}", "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit", "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158"})
    user_info: Union[dict[Any, Any], None] = resp.json()
    puuid: Union[str, None] = user_info['sub'] if user_info is not None else None
    name: Union[str, None] = f"{user_info['acct']['game_name']}#{user_info['acct']['tag_line']}" if user_info is not None else None

    if puuid is None or name is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    res = requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=1&queue=competitive", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
    "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
    "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",})
    # TODO: Look at the JSON files to figure out specific types instead of Any
    res_json: Union[dict[Any, Any], None] = res.json()
    matches: Union[dict[Any, Any], None] = res_json.get('Matches') if res_json is not None else None
    most_recent_game: Union[dict[Any, Any], None] = matches[0] if matches is not None else None
    
    rank: Union[int, None] = most_recent_game.get('TierAfterUpdate') if most_recent_game is not None else None
    if rank is not None and type(rank) == int:
        tier: Union[str, None] = Functionx.number_to_rank(rank)
    else:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400
    
    RR: Union[int, None] = most_recent_game.get('RankedRatingAfterUpdate') if most_recent_game is not None else None

    if RR is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    return jsonify({'code': '200', 'success': 'true', 'rank': f'{tier}', 'rr': f'{RR}', 'name': f'{name}', 'type': f'{rank}', 'success': 'true'}), 200

"""
DEPRECATED - Doesn't really do anything, don't need it to.
/api/riot/get/version - Gets the version of the Riot Client program from the Valorant API and returns it to the user. 
"""
@riot_route.route('/get/version', methods = ['GET'])
def getversion():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    response = requests.get("https://valorant-api.com/v1/version")
    version_json: Union[dict[Any, Any], None] = response.json()
    version: Union[str, None] = version_json['data']['version'] if version_json is not None else None

    if version is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    return jsonify({'code': '200', 'success': 'true', 'version': version, 'success': 'true'}), 200

"""
/api/riot/get/userinfo - Gets the user's PUUID and name from the Riot API and returns it to the user.
"""
@riot_route.route('/get/userinfo', methods = ['POST'])
def getuserinfo():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None

    if aT is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    
    # TODO - Check response.json() for specific types instead of Any
    response = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    response_json: Union[dict[Any, Any], None] = response.json()

    PUUID: Union[str, None] = response_json['sub'] if response_json is not None else None
    name: Union[str, None] = f"{response_json['acct']['game_name']}#{response_json['acct']['tag_line']}" if response_json is not None else None

    if PUUID is None or name is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    return jsonify({'code': '200', 'success': 'true', 'puuid': PUUID, 'name': name, 'success': 'true'}), 200

"""
/api/riot/get/matches - Gets the user's match history from the Riot API and returns it to the user. This is a doozy holy moly. Slowest part of the whole program.
TODO - Do some research on whether it is better to just call the data directly from Riot's API on the client side and pull each bit out there. 
TODO - If you keep this, please move this to a different file for the love of god.
"""
@riot_route.route('/get/matches', methods = ['POST'])
def get_matches(): 
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    eT: Union[str, None] = request_json.get('entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None

    # TODO: Don't pull PUUID again, save I/O operations by resending from client.
    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    resp_json: Union[dict[Any, Any], None] = resp.json()
    puuid: Union[str, None] = resp_json.get('sub') if resp_json is not None else None

    # Pull the last 20 matches from the Riot API
    res = requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=20", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9", "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit", "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",})
    res_json: Union[dict[Any, Any], None] = res.json() if res is not None else None
    
    matches: Union[dict[Any, Any], None] = res_json.get('Matches') if res_json is not None else None
    # print(matches)
    # json.dump(matches, open('matches.json', 'w'))

    # Oh, boy...
    new_js: dict = {}
    new_js['data'] = []

    if matches is not None and isinstance(matches, Sized):
        num_matches = len(matches)
    else:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
    for i in range(num_matches):
        match_i: Union[dict[Any, Any], None] = matches[i] if matches is not None else None
        # For each match, get the match details from the Riot API and parse the data into a dict object that will then be sent as a JSON object.
        match_id: Union[str, None] = match_i.get('MatchID', None) if match_i is not None else None
        if aT is None or eT is None or match_id is None:
            return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400
        respo = requests.get(f"https://pd.na.a.pvp.net/match-details/v1/matches/{match_id}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT, "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
    "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
    "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158"})
        match_deets_json: Union[dict[Any, Any], None] = respo.json() if respo is not None else None
        if respo.status_code != 200:
            # For some reason, Riot keeps the match_id on matches that don't exist. This is a workaround to avoid those matches.
            pass
        else:
            new_js['data'].append({})
            new_js['data'][i]['matchid'] = match_i.get('MatchID') if match_i is not None else None
            new_js['data'][i]['pretier'] = match_i.get('TierBeforeUpdate') if match_i is not None else None
            new_js['data'][i]['posttier'] = match_i.get('TierAfterUpdate') if match_i is not None else None
            new_js['data'][i]['prerr'] = match_i.get('RankedRatingBeforeUpdate') if match_i is not None else None
            new_js['data'][i]['postrr'] = match_i.get('RankedRatingAfterUpdate') if match_i is not None else None
            new_js['data'][i]['rrdiff'] = match_i.get('RankedRatingEarned') if match_i is not None else None
            new_js['data'][i]['map'] = match_i.get('MapID') if match_i is not None else None

            map_id: Union[str, None] = match_i.get('MapID') if match_i is not None else None

            new_js['data'][i]['realmapname'] = Functionx.map_id_to_map(map_id) or None
            new_js['data'][i]['mapcode'] = Functionx.map_id_to_code(match_i.get('MapID') if match_i is not None else None) or None
            new_js['data'][i]['date'] = match_i.get('MatchStartTime') if match_i is not None else None
            # json.dump(match_deets_json, open(f'matches{i}.json', 'w'))
            match_info: dict[Any, Any] = match_deets_json.get('matchInfo', {}) if match_deets_json is not None else {}
            new_js['data'][i]['duration'] = match_info.get('gameLengthMillis', None)
            new_js['data'][i]['completed'] = match_info.get('isCompleted', None)

            # TODO: is this a string or integer?
            queue_id: Union[str, None] = match_info.get('queueID')
            new_js['data'][i]['gamemode'] = Functionx.check_game_mode(queue_id) or None
            new_js['data'][i]['players'] = []
            players: Union[list[Any], list] = match_deets_json.get('players', []) if match_deets_json is not None else []
            for j in range(len(players)):
                player_info: Union[dict[Any, Any], None] = players[j] if players is not None else None
                players_new: list = new_js['data'][i]['players']
                character_id: Union[str, None] = player_info.get('characterId') if player_info is not None else None
                player_stats: Union[dict[Any, Any], None] = player_info.get('stats') if player_info is not None else None
                players_new.append({
                    'name': player_info.get('gameName', '') + "#" + player_info.get('tagLine', '') if player_info is not None else None,
                    'puuid': player_info.get('subject', None) if player_info is not None else None,
                    'teamid': player_info.get('teamId', None) if player_info is not None else None,
                    'character': player_info.get('characterId', None) if player_info is not None else None,
                    'charactertype': Functionx.agent_id_to_picture(character_id) or None,
                    'charactername': Functionx.agent_id_to_name(character_id) or None,
                    'kills': player_stats.get('kills') if player_stats is not None else None,
                    'deaths': player_stats.get('deaths') if player_stats is not None else None,
                    'tier': player_info.get('competitiveTier') if player_info is not None else None,
                })
                player_subject = player_info.get('subject') if player_info is not None else None
                if player_subject == puuid:
                    new_js['data'][i]['me'] = new_js['data'][i]['players'][j]
    
    # json.dump(new_js, open('new_js.json', 'w'))
    new_js['success'] = 'true'
    new_js['code'] = '200'
    print(new_js)
    return jsonify(new_js), 200

"""
/api/riot/pregame/check - Checks if the user is in a pregame lobby or not. This is designed to be used in the client side to check if the user is in a pregame lobby or not.
TODO - Time will tell if running this route every 5 seconds is a good idea or not, but if it isn't, move it to the client side.
"""
@riot_route.route('/pregame/check', methods = ['POST'])
def checkpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    eT: Union[str, None] = request_json.get('entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None

    # TODO: Don't pull PUUID again, save I/O operations by resending from client.
    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}"})
    user_info = resp.json()
    puuid = user_info['sub']

    # Check pregame information
    res = requests.get(f"https://glz-na-1.na.a.pvp.net/pregame/v1/players/{puuid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
    "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
    "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",})
    pregame: Union[dict[Any, Any], None] = res.json()
    print(pregame)
    if pregame is not None:
        return jsonify({'code': '200', 'success': 'true', 'matchid': pregame.get('MatchID') if pregame is not None else None, 'success': 'true'}), 200
    else:
        return '', 400
    
"""
/api/riot/pregame/data - Once a pregame is actually find, this route gets the pregame data from the Riot API and returns it to the user.
"""
@riot_route.route('/pregame/data', methods = ['POST'])
def datapregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    eT: Union[str, None] = request_json.get('entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None
    matchid: Union[str, None] = request_json.get('matchId') if request_json is not None else None

    resp = requests.get(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT})
    pregame = resp.json()
    print(pregame)
    new_json: dict[Any, Any] = {}
    new_json['data'] = {}
    new_json['data']['mapid'] = Functionx.map_id_to_code(pregame['MapID'])
    new_json['data']['mapname'] = Functionx.map_id_to_map(pregame['MapID'])
    return jsonify(new_json), 200

"""
/api/riot/pregame/select - Selects the agent for the user in the pregame lobby.
TODO - Analyze latency, it doesn't seem very fast but that may also be poor UX.
"""
@riot_route.route('/pregame/select', methods = ['POST'])
def selectpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    eT: Union[str, None] = request_json.get('entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None
    matchid: Union[str, None] = request_json.get('matchId') if request_json is not None else None
    agentid: Union[str, None] = request_json.get('agentId') if request_json is not None else None

    resp = requests.post(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}/select/{agentid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
    "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
    "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",})   
    json.dump(resp.json(), open('new_js.json', 'w'))
    return jsonify({'code': '200', 'message': 'success', 'success': 'true'}), 200

"""
/api/riot/pregame/lock - Locks the agent for the user in the pregame lobby.
TODO - Analyze latency, it doesn't seem very fast but that may also be poor UX.
"""
@riot_route.route('/pregame/lock', methods = ['POST'])
def lockpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401
    
    request_json: Union[dict[Any, Any], None] = request.json if isinstance(request.json, dict) else None
    eT: Union[str, None] = request_json.get('entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get('authToken') if request_json is not None else None
    matchid: Union[str, None] = request_json.get('matchId') if request_json is not None else None
    agentid: Union[str, None] = request_json.get('agentId') if request_json is not None else None

    resp = requests.post(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}/lock/{agentid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
    "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
    "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158",})   
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