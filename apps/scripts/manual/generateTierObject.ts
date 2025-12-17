function toTitleCase(input: string): string {
  return input
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter, lowercase rest
    .join(" "); // Join the words back into a single string
}

async function generateTierObject() {
  const res = await fetch("https://valorant-api.com/v1/competitivetiers");

  const json = (await res.json()) as {
    status: number;
    data: {
      uuid: string;
      assetObjectName: string;
      tiers: {
        tier: number;
        tierName: string;
        division: string;
        divisionName: string;
        color: string;
        backgroundColor: string;
        largeIcon: string;
      }[];
      assetPath: string;
    }[];
  };

  const obj: Record<string, any> = {};
  // 4 is the most newest tier updates.
  json.data[4].tiers.forEach(async (v) => {
    if (v.largeIcon) {
      obj[v.tier] = toTitleCase(v.tierName);
    }
  });

  console.log(obj);
}

generateTierObject();
