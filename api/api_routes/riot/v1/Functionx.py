import re

"""
This file contains functions that are used to parse data in the Riot  There is a chance
I will move a lot of this to the client side, in order to improve performance and lower 
the amount of requests to the server. However, that comes with it's own drawbacks, so I will
have to weigh the pros and cons of each method before making a decision.
"""

"""
find_access_token - Finds the access token in the URL
"""


def find_access_token(text: str):
    # Regex pattern to find 'access_token=' followed by the token until the next '&'
    pattern = r'access_token=([^&]+)'
    match = re.search(pattern, text)
    if match:
        return match.group(1)
    else:
        return "Access token not found."


"""
number_to_rank - Converts the rank number from Riot API to a rank string in Valorant.
"""


def number_to_rank(number: int | None):
    if number is None:
        return None
    tier: str = 'Unknown'
    match number:
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
    return tier


"""
map_id_to_map - Converts the map id from Riot API to a map name in Valorant.
"""


def map_id_to_map(mappath: str | None):
    if mappath is None:
        return None
    last_word = mappath.split('/')[-1]
    real_map_name: str = 'Unknown'
    match last_word:
        case "Ascent":
            real_map_name = "Ascent"
        case "Juliett":
            real_map_name = "Sunset"
        case "Port":
            real_map_name = "Icebox"
        case "Bonsai":
            real_map_name = "Split"
        case "Canyon":
            real_map_name = "Fracture"
        case "Duality":
            real_map_name = "Bind"
        case "Foxtrot":
            real_map_name = "Breeze"
        case "HURM_Alley":
            real_map_name = "District"
        case "HURM_Bowl":
            real_map_name = "Kasbah"
        case "HURM_Helix":
            real_map_name = "Drift"
        case "HURM_Yard":
            real_map_name = "Piazza"
        case "Jam":
            real_map_name = "Lotus"
        case "Pitt":
            real_map_name = "Pearl"
        case "Range":
            real_map_name = "The Range"
        case "Triad":
            real_map_name = "Haven"

    return real_map_name


"""
map_id_to_code - Converts the map id from Riot API to a map code that is a file in the public folder.
"""


def map_id_to_code(mappath: str | None):
    if mappath is None:
        return None
    last_word = mappath.split('/')[-1]
    map_code: int = 50
    match last_word:
        case "Ascent":
            map_code = 51
        case "Juliett":
            map_code = 52
        case "Port":
            map_code = 53
        case "Bonsai":
            map_code = 54
        case "Canyon":
            map_code = 55
        case "Duality":
            map_code = 56
        case "Foxtrot":
            map_code = 57
        case "HURM_Alley":
            map_code = 58
        case "HURM_Bowl":
            map_code = 59
        case "HURM_Helix":
            map_code = 60
        case "HURM_Yard":
            map_code = 61
        case "Jam":
            map_code = 62
        case "Pitt":
            map_code = 63
        case "Range":
            map_code = 64
        case "Triad":
            map_code = 65

    return map_code


"""
check_game_mode - Converts the game mode from Riot API to a game mode string in Valorant.
TODO: Figure out more of the game modes and add them to the list/fix existing ones.
"""


def check_game_mode(gamemode: str | None):
    if gamemode is None:
        return None
    match gamemode:
        case "competitive":
            return "Competitive"
        case "unrated":
            return "Unrated"
        case "HURM":
            return "TDM"
        case "hurm":
            return "TDM"
        case "deathmatch":
            return "Deathmatch"
        case "ggteam":
            return "Deathmatch"
    return gamemode


"""
agent_id_to_picture - Converts the agent id from Riot API to a picture id to display to the frontend.
"""


def agent_id_to_picture(agent_id: str | None):
    if agent_id is None:
        return None
    agent_dict = {'e370fa57-4757-3604-3648-499e1f642d3f': 100, 'dade69b4-4f5a-8528-247b-219e5a1facd6': 101, '5f8d3a7f-467b-97f3-062c-13acf203c006': 102, 'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235': 103, 'f94c3b30-42be-e959-889c-5aa313dba261': 104, '22697a3d-45bf-8dd7-4fec-84a9e28c69d7': 105, '601dbbe7-43ce-be57-2a40-4abd24953621': 106, '6f2a04ca-43e0-be17-7f36-b3908627744d': 107, '117ed9e3-49f3-6512-3ccf-0cada7e3823b': 108, 'ded3520f-4264-bfed-162d-b080e2abccf9': 109, '320b2a48-4d9b-a075-30f1-1f93a9b638fa': 110, '1e58de9c-4950-5125-93e9-a0aee9f98746': 111,
                  '95b78ed7-4637-86d9-7e41-71ba8c293152': 112, '707eab51-4836-f488-046a-cda6bf494859': 113, 'eb93336a-449b-9c1b-0a54-a891f7921d69': 114, '41fb69c1-4189-7b37-f117-bcaf1e96f1bf': 115, '9f0d8ba9-4140-b941-57d3-a7ad57c6b417': 116, '0e38b510-41a8-5780-5e8f-568b2a4f2d6c': 117, '1dbf2edd-4729-0984-3115-daa5eed44993': 118, 'bb2a4828-46eb-8cd1-e765-15848195d751': 119, '7f94d92c-4234-0a36-9646-3a87eb8b5c89': 120, '569fdd95-4d10-43ab-ca70-79becc718b46': 121, 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc': 122, '8e253930-4c05-31dd-1b6c-968525494517': 123, 'add6443a-41bd-e414-f6ad-e58d267f4e95': 124}
    return agent_dict[agent_id] or None


"""
agent_id_to_name - Converts the agent id from Riot API to a name to display to the frontend.
"""


def agent_id_to_name(agent_id: str | None):
    if agent_id is None:
        return None
    agent_dict = {'e370fa57-4757-3604-3648-499e1f642d3f': 'Gekko', 'dade69b4-4f5a-8528-247b-219e5a1facd6': 'Fade', '5f8d3a7f-467b-97f3-062c-13acf203c006': 'Breach', 'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235': 'Deadlock', 'f94c3b30-42be-e959-889c-5aa313dba261': 'Raze', '22697a3d-45bf-8dd7-4fec-84a9e28c69d7': 'Chamber', '601dbbe7-43ce-be57-2a40-4abd24953621': 'KAY/O', '6f2a04ca-43e0-be17-7f36-b3908627744d': 'Skye', '117ed9e3-49f3-6512-3ccf-0cada7e3823b': 'Cypher', 'ded3520f-4264-bfed-162d-b080e2abccf9': 'Sova', '320b2a48-4d9b-a075-30f1-1f93a9b638fa': 'Sova', '1e58de9c-4950-5125-93e9-a0aee9f98746': 'Killjoy',
                  '95b78ed7-4637-86d9-7e41-71ba8c293152': 'Harbor', '707eab51-4836-f488-046a-cda6bf494859': 'Viper', 'eb93336a-449b-9c1b-0a54-a891f7921d69': 'Phoenix', '41fb69c1-4189-7b37-f117-bcaf1e96f1bf': 'Astra', '9f0d8ba9-4140-b941-57d3-a7ad57c6b417': 'Brimstone', '0e38b510-41a8-5780-5e8f-568b2a4f2d6c': 'Iso', '1dbf2edd-4729-0984-3115-daa5eed44993': 'Clove', 'bb2a4828-46eb-8cd1-e765-15848195d751': 'Neon', '7f94d92c-4234-0a36-9646-3a87eb8b5c89': 'Yoru', '569fdd95-4d10-43ab-ca70-79becc718b46': 'Sage', 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc': 'Reyna', '8e253930-4c05-31dd-1b6c-968525494517': 'Omen', 'add6443a-41bd-e414-f6ad-e58d267f4e95': 'Jett'}
    return agent_dict[agent_id] or None
