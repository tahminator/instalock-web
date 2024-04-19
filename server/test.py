import requests

resp = requests.get("https://catfact.ninja/fact")
print(type(resp.json()))