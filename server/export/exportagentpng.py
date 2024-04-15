import requests

def main():
    res = requests.get("https://valorant-api.com/v1/agents")
    json = res.json()
    data = json['data']
    file_index = 100
    for agent in data:
        image_url = agent['displayIcon']
        image_response = requests.get(image_url)
        if image_response.status_code == 200:
            # Open a file to save the image, naming it with an increasing index
            filename = f"{file_index}.png"
            with open(filename, 'wb') as file:
                file.write(image_response.content)
            file_index += 1  # Increment the index for the next file
        else:
            print(f"Failed to download image for {agent['displayName']}")

main()