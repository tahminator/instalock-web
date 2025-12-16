async function generateMapObject() {
  const res = await fetch("https://valorant-api.com/v1/maps");

  const json = (await res.json()) as {
    status: number;
    data: {
      uuid: string;
      displayName: string;
      splash: string;
      mapUrl: string;
    }[];
  };

  const obj: Record<string, string> = {};
  // 4 is the most newest tier updates.
  json.data.forEach(async (v) => {
    obj[v.mapUrl] = v.uuid;
  });

  console.log(obj);
}

generateMapObject();
