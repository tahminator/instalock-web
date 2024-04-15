import requests

def main():
    res = requests.get("https://valorant-api.com/v1/agents")
    json = res.json()
    data = json['data']
    file_index = 100
    agent_data = {}
    for agent in data:
        uuid = agent['displayName']
        agent_data['agent_name'] = file_index
        file_index += 1
    print(agent_data)

main()