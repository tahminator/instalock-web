export const tierNumberToNameObject = {
  "0": "Unranked",
  "3": "Iron 1",
  "4": "Iron 2",
  "5": "Iron 3",
  "6": "Bronze 1",
  "7": "Bronze 2",
  "8": "Bronze 3",
  "9": "Silver 1",
  "10": "Silver 2",
  "11": "Silver 3",
  "12": "Gold 1",
  "13": "Gold 2",
  "14": "Gold 3",
  "15": "Platinum 1",
  "16": "Platinum 2",
  "17": "Platinum 3",
  "18": "Diamond 1",
  "19": "Diamond 2",
  "20": "Diamond 3",
  "21": "Ascendant 1",
  "22": "Ascendant 2",
  "23": "Ascendant 3",
  "24": "Immortal 1",
  "25": "Immortal 2",
  "26": "Immortal 3",
  "27": "Radiant",
} as const;

export type TierNumber = keyof typeof tierNumberToNameObject;
// type TierName = (typeof tierNumberToNameObject)[TierNumber];

export const mapUuidToNameObject = {
  "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319": "Ascent",
  "d960549e-485c-e861-8d71-aa9d1aed12a2": "Split",
  "b529448b-4d60-346e-e89e-00a4c527a405": "Fracture",
  "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba": "Bind",
  "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53": "Breeze",
  "690b3ed2-4dff-945b-8223-6da834e30d24": "District",
  "12452a9d-48c3-0b02-e7eb-0381c3520404": "Kasbah",
  "2c09d728-42d5-30d8-43dc-96a05cc7ee9d": "Drift",
  "d6336a5a-428f-c591-98db-c8a291159134": "Glitch",
  "de28aa9b-4cbe-1003-320e-6cb3ec309557": "Piazza",
  "224b0a95-48b9-f703-1bd8-67aca101a61f": "Abyss",
  "2fe4ed3a-450a-948b-6d6b-e89a78e680a9": "Lotus",
  "92584fbe-486a-b1b2-9faa-39b0f486b498": "Sunset",
  "1f10dab3-4294-3827-fa35-c2aa00213cf3": "Basic Training",
  "fd267378-4d1d-484f-ff52-77821ed10dc2": "Pearl",
  "e2ad5c54-4114-a870-9641-8ea21279579a": "Icebox",
  "ee613ee9-28b7-4beb-9666-08db13bb2244": "The Range",
  "5914d1e0-40c4-cfdd-6b88-eba06347686c": "The Range",
  "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047": "Haven",
} as const;
export type MapUuid = keyof typeof mapUuidToNameObject;

export const mapUrlToUuidObject = {
  "/Game/Maps/Ascent/Ascent": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
  "/Game/Maps/Bonsai/Bonsai": "d960549e-485c-e861-8d71-aa9d1aed12a2",
  "/Game/Maps/Canyon/Canyon": "b529448b-4d60-346e-e89e-00a4c527a405",
  "/Game/Maps/Duality/Duality": "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba",
  "/Game/Maps/Foxtrot/Foxtrot": "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53",
  "/Game/Maps/HURM/HURM_Alley/HURM_Alley":
    "690b3ed2-4dff-945b-8223-6da834e30d24",
  "/Game/Maps/HURM/HURM_Bowl/HURM_Bowl": "12452a9d-48c3-0b02-e7eb-0381c3520404",
  "/Game/Maps/HURM/HURM_Helix/HURM_Helix":
    "2c09d728-42d5-30d8-43dc-96a05cc7ee9d",
  "/Game/Maps/HURM/HURM_HighTide/HURM_HighTide":
    "d6336a5a-428f-c591-98db-c8a291159134",
  "/Game/Maps/HURM/HURM_Yard/HURM_Yard": "de28aa9b-4cbe-1003-320e-6cb3ec309557",
  "/Game/Maps/Infinity/Infinity": "224b0a95-48b9-f703-1bd8-67aca101a61f",
  "/Game/Maps/Jam/Jam": "2fe4ed3a-450a-948b-6d6b-e89a78e680a9",
  "/Game/Maps/Juliett/Juliett": "92584fbe-486a-b1b2-9faa-39b0f486b498",
  "/Game/Maps/NPEV2/NPEV2": "1f10dab3-4294-3827-fa35-c2aa00213cf3",
  "/Game/Maps/Pitt/Pitt": "fd267378-4d1d-484f-ff52-77821ed10dc2",
  "/Game/Maps/Port/Port": "e2ad5c54-4114-a870-9641-8ea21279579a",
  "/Game/Maps/Poveglia/Range": "ee613ee9-28b7-4beb-9666-08db13bb2244",
  "/Game/Maps/PovegliaV2/RangeV2": "5914d1e0-40c4-cfdd-6b88-eba06347686c",
  "/Game/Maps/Triad/Triad": "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047",
};
export type MapUrl = keyof typeof mapUrlToUuidObject;

// manually generated, not sure if there is an api to reliably connect the two
export const gameModeIdToName = {
  competitive: "Competitive",
  deathmatch: "Deathmatch",
  hurm: "TDM",
  swiftplay: "Swiftplay",
  premier: "Premier",
} as const;

type GameModeId = keyof typeof gameModeIdToName;

export const getGameModeName = (id: string): string => {
  if (id in gameModeIdToName) {
    return gameModeIdToName[id as GameModeId];
  }
  return id;
};

export const agentUuidToNameObject = {
  "e370fa57-4757-3604-3648-499e1f642d3f": "Gekko",
  "dade69b4-4f5a-8528-247b-219e5a1facd6": "Fade",
  "5f8d3a7f-467b-97f3-062c-13acf203c006": "Breach",
  "cc8b64c8-4b25-4ff9-6e7f-37b4da43d235": "Deadlock",
  "b444168c-4e35-8076-db47-ef9bf368f384": "Tejo",
  "f94c3b30-42be-e959-889c-5aa313dba261": "Raze",
  "22697a3d-45bf-8dd7-4fec-84a9e28c69d7": "Chamber",
  "601dbbe7-43ce-be57-2a40-4abd24953621": "KAYO",
  "6f2a04ca-43e0-be17-7f36-b3908627744d": "Skye",
  "117ed9e3-49f3-6512-3ccf-0cada7e3823b": "Cypher",
  "320b2a48-4d9b-a075-30f1-1f93a9b638fa": "Sova",
  "1e58de9c-4950-5125-93e9-a0aee9f98746": "Killjoy",
  "95b78ed7-4637-86d9-7e41-71ba8c293152": "Harbor",
  "efba5359-4016-a1e5-7626-b1ae76895940": "Vyse",
  "707eab51-4836-f488-046a-cda6bf494859": "Viper",
  "eb93336a-449b-9c1b-0a54-a891f7921d69": "Phoenix",
  "41fb69c1-4189-7b37-f117-bcaf1e96f1bf": "Astra",
  "9f0d8ba9-4140-b941-57d3-a7ad57c6b417": "Brimstone",
  "0e38b510-41a8-5780-5e8f-568b2a4f2d6c": "Iso",
  "1dbf2edd-4729-0984-3115-daa5eed44993": "Clove",
  "bb2a4828-46eb-8cd1-e765-15848195d751": "Neon",
  "7f94d92c-4234-0a36-9646-3a87eb8b5c89": "Yoru",
  "569fdd95-4d10-43ab-ca70-79becc718b46": "Sage",
  "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": "Reyna",
  "8e253930-4c05-31dd-1b6c-968525494517": "Omen",
  "add6443a-41bd-e414-f6ad-e58d267f4e95": "Jett",
} as const;
export type AgentUuid = keyof typeof agentUuidToNameObject;

export * from "./autogenerated";
