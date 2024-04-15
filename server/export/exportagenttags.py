import requests

def main():
    res = requests.get("https://valorant-api.com/v1/agents")
    json = res.json()
    data = json['data']
    agent_data = {}
    for agent in data:
        uuid = agent['uuid']
        agent_data[uuid] = agent['displayName']
    print(agent_data)

main()