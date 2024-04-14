def number_to_rank(number):
    tier = 'Unknown'
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

def map_id_to_map(mappath):
    last_word = mappath.split('/')[-1]
    real_map_name = 'Unknown'
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

def map_id_to_code(mappath):
    last_word = mappath.split('/')[-1]
    map_code = 50
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

def check_game_mode(gamemode):
    match gamemode:
        case "competitive":
            return "Competitive"
        case "unrated":
            return "Unrated"
        case "HURM":
            return "Team Deathmatch"
        case "hurm":
            return "Team Deathmatch"
        case "deathmatch":
            return "Deathmatch"
        case "ggteam":
            return "Deathmatch"
    return gamemode