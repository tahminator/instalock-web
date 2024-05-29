from flask import Blueprint, request, jsonify, current_app, g
from flask_login import current_user  # type: ignore

from urllib.parse import urlparse, parse_qs
import requests
import re
import json
from typing import *
import concurrent.futures

import api.api_routes.riot.v1.Functionx as Functionx

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


@riot_route.route('/get/entitlements', methods=['POST'])
def getentitlement():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None

    url: str | None = request_json.get(
        'url') if request_json is not None else None

    if url is None or ("https://playvalorant.com/" not in url) or (type(url) != str):
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    # Get the access token from the URL
    access_token: str | None = Functionx.find_access_token(url)

    if access_token is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    # Use the access token from the URL and get the entitlement token and auth token from the Riot API
    # TODO: Look at the JSON files to figure out specific types instead of Any
    response = requests.post("https://entitlements.auth.riotgames.com/api/token/v1", headers={
                             "Authorization": f"Bearer {access_token}", "Content-Type": "application/json"})
    entitlements_json: Union[dict[Any, Any], None] = response.json()
    # print(entitlements_json)

    if entitlements_json is not None and 'entitlements_token' in entitlements_json:
        eT: str | None = entitlements_json['entitlements_token']
    else:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    return jsonify({'code': '200', 'success': 'true', 'entitlementToken': eT, 'authToken': access_token, 'success': 'true'}), 200


"""
/api/riot/get/mmr - Gets the Rank, Tier and Name of the user from the Riot API and returns to the user.
"""


@riot_route.route('/get/mmr', methods=['POST'])
def getmmr():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None
    eT: Union[str, None] = request_json.get(
        'entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get(
        'authToken') if request_json is not None else None

    if eT is None or aT is None or (type(eT) != str) or (type(aT) != str):
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    # Get the riotClientVersion of the Riot Client program, but from a third party API in order to avoid having to log in and access lockfile to get the same data.
    response = requests.get("https://valorant-api.com/v1/version")
    version: Union[str, None] = response.json()['data']['riotClientVersion']

    if version is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    # Get PUUID and name of the user from Riot API
    resp = requests.get("https://auth.riotgames.com/userinfo", headers={"Authorization": f"Bearer {aT}", "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit", "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158"})  # noqa
    user_info: Union[dict[Any, Any], None] = resp.json()
    puuid: Union[str, None] = user_info['sub'] if user_info is not None else None
    name: Union[str, None] = f"{user_info['acct']['game_name']}#{user_info['acct']['tag_line']}" if user_info is not None else None  # noqa

    if puuid is None or name is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    res = requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=1&queue=competitive", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
                                                                                                                                                "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
                                                                                                                                                "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158", })
    # TODO: Look at the JSON files to figure out specific types instead of Any
    res_json: Union[dict[Any, Any], None] = res.json()
    matches: Union[dict[Any, Any], None] = res_json.get(
        'Matches') if res_json is not None else None
    most_recent_game: Union[dict[Any, Any],
                            None] = matches[0] if matches is not None else None

    rank: Union[int, None] = most_recent_game.get(
        'TierAfterUpdate') if most_recent_game is not None else None
    if rank is not None and type(rank) == int:
        tier: Union[str, None] = Functionx.number_to_rank(rank)
    else:
        return jsonify({'code': '400', 'message': 'Bad request', 'success': 'false'}), 400

    RR: Union[int, None] = most_recent_game.get(
        'RankedRatingAfterUpdate') if most_recent_game is not None else None

    if RR is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    return jsonify({'code': '200', 'success': 'true', 'rank': f'{tier}', 'rr': f'{RR}', 'name': f'{name}', 'type': f'{rank}', 'success': 'true'}), 200


"""
DEPRECATED - Doesn't really do anything, don't need it to.
/api/riot/get/version - Gets the version of the Riot Client program from the Valorant API and returns it to the user. 
"""


@riot_route.route('/get/version', methods=['GET'])
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


@riot_route.route('/get/userinfo', methods=['POST'])
def getuserinfo():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None
    aT: Union[str, None] = request_json.get(
        'authToken') if request_json is not None else None

    if aT is None:
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    # TODO - Check response.json() for specific types instead of Any
    response = requests.get("https://auth.riotgames.com/userinfo",
                            headers={"Authorization": f"Bearer {aT}"})
    response_json: Union[dict[Any, Any], None] = response.json()

    PUUID: Union[str, None] = response_json['sub'] if response_json is not None else None
    name: Union[str, None] = f"{response_json['acct']['game_name']}#{
        response_json['acct']['tag_line']}" if response_json is not None else None

    if PUUID is None or name is None:
        return {'code': '500', 'message': 'Internal server error', 'success': 'false'}, 500

    return jsonify({'code': '200', 'success': 'true', 'puuid': PUUID, 'name': name, 'success': 'true'}), 200


"""
/api/riot/get/matches - Gets the user's match history from the Riot API and returns it to the user. This is a doozy holy moly. Slowest part of the whole program.
TODO - Do some research on whether it is better to just call the data directly from Riot's API on the client side and pull each bit out there. 
TODO - If you keep this, please move this to a different file for the love of god.
"""


@riot_route.route('/get/matches', methods=['POST'])
def get_matches():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json = request.json if isinstance(request.json, dict) else None
    eT = request_json.get('entitlementToken') if request_json else None
    aT = request_json.get('authToken') if request_json else None

    resp = requests.get("https://auth.riotgames.com/userinfo",
                        headers={"Authorization": f"Bearer {aT}"})
    resp_json = resp.json()
    puuid = resp_json.get('sub') if resp_json else None

    res = requests.get(f"https://pd.na.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex=0&endIndex=20",
                       headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,
                                "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
                                "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
                                "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158"})
    res_json = res.json() if res else None

    matches = res_json.get('Matches') if res_json else None
    if not matches or not isinstance(matches, list):
        return {'code': '400', 'message': 'Bad request', 'success': 'false'}, 400

    def fetch_match_detail(match_id):
        respo = requests.get(f"https://pd.na.a.pvp.net/match-details/v1/matches/{match_id}", headers={
            "Authorization": f"Bearer {aT}",
            "X-Riot-Entitlements-JWT": eT,
            "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0",
            "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
            "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158"
        })
        return respo.json()

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        match_ids = [match.get('MatchID')
                     for match in matches if match.get('MatchID')]
        match_details = list(executor.map(fetch_match_detail, match_ids))

    new_js = {'data': []}

    for i, match_i in enumerate(matches):
        if match_i:
            match_detail = match_details[i]
            new_js['data'].append({
                'matchid': match_i.get('MatchID'),
                'pretier': match_i.get('TierBeforeUpdate'),
                'posttier': match_i.get('TierAfterUpdate'),
                'prerr': match_i.get('RankedRatingBeforeUpdate'),
                'postrr': match_i.get('RankedRatingAfterUpdate'),
                'rrdiff': match_i.get('RankedRatingEarned'),
                'map': match_i.get('MapID'),
                'realmapname': Functionx.map_id_to_map(match_i.get('MapID')),
                'mapcode': Functionx.map_id_to_code(match_i.get('MapID')),
                'date': match_i.get('MatchStartTime'),
                'duration': match_detail.get('matchInfo', {}).get('gameLengthMillis'),
                'completed': match_detail.get('matchInfo', {}).get('isCompleted'),
                'gamemode': Functionx.check_game_mode(match_detail.get('matchInfo', {}).get('queueID')),
                'players': [
                    {
                        'name': player.get('gameName', '') + "#" + player.get('tagLine', '') if player else None,
                        'puuid': player.get('subject'),
                        'teamid': player.get('teamId'),
                        'character': player.get('characterId'),
                        'charactertype': Functionx.agent_id_to_picture(player.get('characterId')),
                        'charactername': Functionx.agent_id_to_name(player.get('characterId')),
                        'kills': player.get('stats', {}).get('kills'),
                        'deaths': player.get('stats', {}).get('deaths'),
                        'tier': player.get('competitiveTier'),
                    }
                    for player in match_detail.get('players', [])
                ]
            })
            if match_i.get('MatchID') == puuid:
                new_js['data'][i]['me'] = new_js['data'][i]['players'][i]

    new_js['success'] = 'true'
    new_js['code'] = '200'
    return jsonify(new_js), 200


"""
/api/riot/pregame/check - Checks if the user is in a pregame lobby or not. This is designed to be used in the client side to check if the user is in a pregame lobby or not.
TODO - Time will tell if running this route every 5 seconds is a good idea or not, but if it isn't, move it to the client side.
"""


@riot_route.route('/pregame/check', methods=['POST'])
def checkpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None
    eT: Union[str, None] = request_json.get(
        'entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get(
        'authToken') if request_json is not None else None

    # TODO: Don't pull PUUID again, save I/O operations by resending from client.
    resp = requests.get("https://auth.riotgames.com/userinfo",
                        headers={"Authorization": f"Bearer {aT}"})
    user_info = resp.json()
    puuid = user_info['sub']

    # Check pregame information
    res = requests.get(f"https://glz-na-1.na.a.pvp.net/pregame/v1/players/{puuid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT, "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
                                                                                             "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
                                                                                             "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158", })
    pregame: Union[dict[Any, Any], None] = res.json()
    # print(pregame)
    if pregame is not None and 'MatchID' in pregame:
        return jsonify({'code': '200', 'success': 'true', 'matchid': pregame.get('MatchID') if pregame is not None else None, 'success': 'true'}), 200
    else:
        return '', 400


"""
/api/riot/pregame/data - Once a pregame is actually find, this route gets the pregame data from the Riot API and returns it to the user.
"""


@riot_route.route('/pregame/data', methods=['POST'])
def datapregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None
    eT: Union[str, None] = request_json.get(
        'entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get(
        'authToken') if request_json is not None else None
    matchid: Union[str, None] = request_json.get(
        'matchId') if request_json is not None else None

    resp = requests.get(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,  "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
                                                                                                "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
                                                                                                "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158"})
    pregame = resp.json()
    # print(pregame)
    new_json: dict[Any, Any] = {}
    new_json['data'] = {}
    new_json['data']['mapid'] = Functionx.map_id_to_code(pregame['MapID'])
    new_json['data']['mapname'] = Functionx.map_id_to_map(pregame['MapID'])
    return jsonify(new_json), 200


"""
/api/riot/pregame/select - Selects the agent for the user in the pregame lobby.
TODO - Analyze latency, it doesn't seem very fast but that may also be poor UX.
"""


@riot_route.route('/pregame/select', methods=['POST'])
def selectpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None
    eT: Union[str, None] = request_json.get(
        'entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get(
        'authToken') if request_json is not None else None
    matchid: Union[str, None] = request_json.get(
        'matchId') if request_json is not None else None
    agentid: Union[str, None] = request_json.get(
        'agentId') if request_json is not None else None

    # TODO: Don't pull PUUID again, save I/O operations by resending from client.
    respo = requests.get("https://auth.riotgames.com/userinfo",
                         headers={"Authorization": f"Bearer {aT}"})
    resp_json: Union[dict[Any, Any], None] = respo.json()
    puuid: Union[str, None] = resp_json.get(
        'sub') if resp_json is not None else None

    resp = requests.post(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}/select/{agentid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
                                                                                                                  "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
                                                                                                                  "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158", })
    for player in resp.json()["AllyTeam"]["Players"]:
        if player['Subject'] == str(puuid):
            if player['CharacterSelectionState'] == "":
                return jsonify({'code': '400', 'message': 'failed', 'success': 'false'}), 400
            else:
                return jsonify({'code': '200', 'message': 'success', 'success': 'true'}), 200
    return jsonify({'code': '400', 'message': 'failed', 'success': 'false'}), 400


"""
/api/riot/pregame/lock - Locks the agent for the user in the pregame lobby.
TODO - Analyze latency, it doesn't seem very fast but that may also be poor UX.
"""


@riot_route.route('/pregame/lock', methods=['POST'])
def lockpregame():
    if not current_user.is_authenticated:
        return {'code': '401', 'message': 'Unauthorized', 'success': 'false'}, 401

    request_json: Union[dict[Any, Any], None] = request.json if isinstance(
        request.json, dict) else None
    eT: Union[str, None] = request_json.get(
        'entitlementToken') if request_json is not None else None
    aT: Union[str, None] = request_json.get(
        'authToken') if request_json is not None else None
    matchid: Union[str, None] = request_json.get(
        'matchId') if request_json is not None else None
    agentid: Union[str, None] = request_json.get(
        'agentId') if request_json is not None else None

    # TODO: Don't pull PUUID again, save I/O operations by resending from client.
    resp = requests.get("https://auth.riotgames.com/userinfo",
                        headers={"Authorization": f"Bearer {aT}"})
    resp_json: Union[dict[Any, Any], None] = resp.json()
    puuid: Union[str, None] = resp_json.get(
        'sub') if resp_json is not None else None

    resp = requests.post(f"https://glz-na-1.na.a.pvp.net/pregame/v1/matches/{matchid}/lock/{agentid}", headers={"Authorization": f"Bearer {aT}", "X-Riot-Entitlements-JWT": eT,     "X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
                                                                                                                "User-Agent": "ShooterGame/13 Windows/10.0.19043.1.256.64bit",
                                                                                                                "X-Riot-ClientVersion": "release-08.07-shipping-9-2444158", })
    for player in resp.json()["AllyTeam"]["Players"]:
        if player['Subject'] == str(puuid):
            # print("found player")
            if player['CharacterSelectionState'] == 'locked':
                return jsonify({'code': '200', 'message': 'success', 'success': 'true'}), 200
            else:
                return jsonify({'code': '400', 'message': 'failed', 'success': 'false'}), 400
    return jsonify({'code': '400', 'message': 'failed', 'success': 'false'}), 400


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
