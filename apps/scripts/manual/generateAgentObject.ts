async function generateAgentObject() {
  const res = await fetch("https://valorant-api.com/v1/agents");

  const json = (await res.json()) as {
    status: number;
    data: {
      uuid: string;
      displayName: string;
      displayIcon: string;
      isPlayableCharacter: boolean;
    }[];
  };

  const obj: Record<string, string> = {};
  json.data.forEach((v) => {
    if (v.isPlayableCharacter) {
      obj[v.uuid] = v.displayName.replace("/", "");
    }
  });

  console.log(obj);
}

void generateAgentObject();
