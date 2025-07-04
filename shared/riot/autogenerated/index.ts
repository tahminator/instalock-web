// These types are automatically generated by parsing JSON responses and coerced into
// TS types via https://quicktype.io/typescript

type WebApplicationError = {
  httpStatus: number;
  errorCode: string;
  implementationDetails: string;
};

type SucessfulEntitlement = {
  entitlements_token: string;
  errorCode: undefined;
};

export type EntitlementApiType = WebApplicationError | SucessfulEntitlement;

type SuccessfulPartyDetails = {
  Subject?: string;
  Version?: number;
  CurrentPartyID?: string;
  Invites?: null;
  Requests?: any[];
  PlatformInfo?: PartyPlatformInfo;
  IsCrossPlayEnabled?: boolean;
  errorCode: undefined;
};

type PartyPlatformInfo = {
  platformType?: string;
  platformOS?: string;
  platformOSVersion?: string;
  platformChipset?: string;
  platformDevice?: string;
};

export type PartyDetailsApiType = WebApplicationError | SuccessfulPartyDetails;

type ErrorRiotUserType = {
  error: string;
  error_description: string;
};

type SuccessRiotUserType = {
  country: string;
  sub: string;
  email_verified: boolean;
  player_plocale: string | null;
  country_at: number;
  pw: {
    cng_at: number;
    reset: boolean;
    must_reset: boolean;
  };
  phone_number_verified: boolean;
  account_verified: boolean;
  ppid: string | null;
  federated_identity_details: never[];
  player_locale: string;
  acct: {
    type: number;
    state: string;
    adm: boolean;
    game_name: string;
    tag_line: string;
    created_at: number;
  };
  age: number;
  jti: string;
  affinity: { pp: string };
  error: undefined;
};

export type RiotUserInfoType = ErrorRiotUserType | SuccessRiotUserType;

export type RiotMatchInfoType =
  | {
      httpStatus: number;
      errorCode: undefined;
      message?: string;
      Version: number;
      Subject: string;
      Matches: Match[];
    }
  | {
      httpStatus: number;
      errorCode: string;
      message: string;
    };

type Match = {
  MatchID: string;
  MapID: string;
  SeasonID: string;
  MatchStartTime: number;
  TierAfterUpdate: number;
  TierBeforeUpdate: number;
  RankedRatingAfterUpdate: number;
  RankedRatingBeforeUpdate: number;
  RankedRatingEarned: number;
  RankedRatingPerformanceBonus: number;
  CompetitiveMovement: string;
  AFKPenalty: number;
};

export type AutoGenMatchMeta = {
  matchInfo?: MatchInfo;
  players?: Player[];
  bots?: any[];
  coaches?: any[];
  teams?: Team[];
  roundResults?: RoundResultElement[];
  kills?: Kill[];
};

export type Kill = {
  gameTime?: number;
  roundTime?: number;
  round?: number;
  killer?: string;
  victim?: string;
  victimLocation?: Location;
  assistants?: string[];
  playerLocations?: PlayerLocation[];
  finishingDamage?: FinishingDamage;
};

export type FinishingDamage = {
  damageType?: DamageType;
  damageItem?: DamageItem;
  isSecondaryFireMode?: boolean;
};

export enum DamageItem {
  A03B24D34319996D0F8C94Bbfba1Dfc7 = "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7",
  Ae3De1424D852547Dd264E90Bed35Cf7 = "AE3DE142-4D85-2547-DD26-4E90BED35CF7",
  C4883E504494202C3Ec36B8A9284F00B = "C4883E50-4494-202C-3EC3-6B8A9284F00B",
  E336C6B8418D9340D77F7A9E4Cfe0702 = "E336C6B8-418D-9340-D77F-7A9E4CFE0702",
  Ec845Bf44F79DddaA3Da0Db3774B2794 = "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794",
  Ee8E8D15496B07ACE5F68Fae5D4C7B1A = "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A",
  Empty = "",
  The1Baa85B44C70128464Bb6481Dfc3Bb4E = "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E",
  The29A0Cfab485BF5D5779AB59F85E204A8 = "29A0CFAB-485B-F5D5-779A-B59F85E204A8",
  The39099Fb54293Def41E092E9080Ce7456 = "39099FB5-4293-DEF4-1E09-2E9080CE7456",
  The44D4E95C4157003781B217841Bf2E8E3 = "44D4E95C-4157-0037-81B2-17841BF2E8E3",
  The462080D1403529377C0927Aa2A5C27A7 = "462080D1-4035-2937-7C09-27AA2A5C27A7",
  The4Ade7Faa4Cf1837695Ef39884480959B = "4ADE7FAA-4CF1-8376-95EF-39884480959B",
  The910Be174449BC412Ab22D0873436B21B = "910BE174-449B-C412-AB22-D0873436B21B",
  The9C82E19D457502001A813Eacf00Cf872 = "9C82E19D-4575-0200-1A81-3EACF00CF872",
  Ultimate = "Ultimate",
}

export enum DamageType {
  Ability = "Ability",
  Bomb = "Bomb",
  Weapon = "Weapon",
}

export type PlayerLocation = {
  subject?: string;
  viewRadians?: number;
  location?: Location;
};

export type Location = {
  x?: number;
  y?: number;
};

export type MatchInfo = {
  matchId?: string;
  mapId?: string;
  gamePodId?: string;
  gameLoopZone?: string;
  gameServerAddress?: string;
  gameVersion?: string;
  gameLengthMillis?: number;
  gameStartMillis?: number;
  provisioningFlowID?: string;
  isCompleted?: boolean;
  isEarlyCompletion?: boolean;
  customGameName?: string;
  forcePostProcessing?: boolean;
  queueID?: string;
  gameMode?: string;
  isRanked?: boolean;
  isMatchSampled?: boolean;
  seasonId?: string;
  completionState?: string;
  platformType?: PlatformType;
  premierMatchInfo?: PremierMatchInfo;
  partyRRPenalties?: { [key: string]: number };
  shouldMatchDisablePenalties?: boolean;
};

export enum PlatformType {
  PC = "pc",
}

export type PremierMatchInfo = {};

export type Player = {
  gameName?: string;
  tagLine?: string;
  platformInfo?: PlatformInfo;
  teamId?: TeamID;
  partyId?: string;
  characterId?: string;
  stats?: Stats;
  roundDamage?: RoundDamage[];
  competitiveTier?: number;
  isObserver?: boolean;
  playerCard?: string;
  playerTitle?: string;
  preferredLevelBorder?: string;
  sessionPlaytimeMinutes?: number;
  behaviorFactors?: BehaviorFactors;
  newPlayerExperienceDetails?: NewPlayerExperienceDetails;
  participationPeriods?: ParticipationPeriod[];
  subject?: string;
  accountLevel?: number;
  xpModifications?: XPModification[];
};

export type BehaviorFactors = {
  afkRounds?: number;
  collisions?: number;
  commsRatingRecovery?: number;
  damageParticipationOutgoing?: number;
  friendlyFireIncoming?: number;
  friendlyFireOutgoing?: number;
  mouseMovement?: number;
  selfDamage?: number;
  stayedInSpawnRounds?: number;
};

export type NewPlayerExperienceDetails = {
  basicMovement?: BasicGunSkillClass;
  basicGunSkill?: BasicGunSkillClass;
  adaptiveBots?: AdaptiveBots;
  ability?: BasicGunSkillClass;
  bombPlant?: BasicGunSkillClass;
  defendBombSite?: DefendBombSite;
  settingStatus?: SettingStatus;
  versionString?: string;
};

export type BasicGunSkillClass = {
  idleTimeMillis?: number;
  objectiveCompleteTimeMillis?: number;
};

export type AdaptiveBots = {
  idleTimeMillis?: number;
  objectiveCompleteTimeMillis?: number;
  adaptiveBotAverageDurationMillisAllAttempts?: number;
  adaptiveBotAverageDurationMillisFirstAttempt?: number;
  killDetailsFirstAttempt?: null;
};

export type DefendBombSite = {
  idleTimeMillis?: number;
  objectiveCompleteTimeMillis?: number;
  success?: boolean;
};

export type SettingStatus = {
  isMouseSensitivityDefault?: boolean;
  isCrosshairDefault?: boolean;
};

export type ParticipationPeriod = {
  sessionStartTime?: Date;
  sessionEndTime?: Date;
};

export type PlatformInfo = {
  platformType?: PlatformType;
  platformOS?: PlatformOS;
  platformOSVersion?: PlatformOSVersion;
  platformChipset?: PlatformChipset;
  platformDevice?: string;
};

export enum PlatformChipset {
  Unknown = "Unknown",
}

export enum PlatformOS {
  Windows = "Windows",
}

export enum PlatformOSVersion {
  The10019045176864Bit = "10.0.19045.1.768.64bit",
  The10022631125664Bit = "10.0.22631.1.256.64bit",
  The10022631176864Bit = "10.0.22631.1.768.64bit",
}

export type RoundDamage = {
  round?: number;
  receiver?: string;
  damage?: number;
};

export type Stats = {
  score?: number;
  roundsPlayed?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  playtimeMillis?: number;
  abilityCasts?: AbilityCasts;
};

export type AbilityCasts = {
  grenadeCasts?: number;
  ability1Casts?: number;
  ability2Casts?: number;
  ultimateCasts?: number;
};

export enum TeamID {
  Blue = "Blue",
  Red = "Red",
}

export type XPModification = {
  Value?: number;
  ID?: string;
  IncludeInV2?: boolean;
  Type?: number;
};

export type RoundResultElement = {
  roundNum?: number;
  roundResult?: RoundResultEnum;
  roundCeremony?: RoundCeremony;
  winningTeam?: TeamID;
  winningTeamRole?: WinningTeamRole;
  plantRoundTime?: number;
  plantPlayerLocations?: PlayerLocation[] | null;
  plantLocation?: Location;
  plantSite?: PlantSite;
  defuseRoundTime?: number;
  defusePlayerLocations?: PlayerLocation[] | null;
  defuseLocation?: Location;
  playerStats?: PlayerStat[];
  roundResultCode?: RoundResultCode;
  playerEconomies?: Economy[];
  playerScores?: PlayerScore[];
  bombPlanter?: string;
  bombDefuser?: string;
};

export enum PlantSite {
  A = "A",
  B = "B",
  C = "C",
  Empty = "",
}

export type Economy = {
  subject?: string;
  loadoutValue?: number;
  weapon?: DamageItem;
  armor?: Armor;
  remaining?: number;
  spent?: number;
};

export enum Armor {
  B1B9086D41BdA5165D29E3B34A6F1644 = "B1B9086D-41BD-A516-5D29-E3B34A6F1644",
  Empty = "",
  The4Dec83D549029Ab3Bed6A7A390761157 = "4DEC83D5-4902-9AB3-BED6-A7A390761157",
  The822Bcab240A2324EC137E09195Ad7692 = "822BCAB2-40A2-324E-C137-E09195AD7692",
}

export type PlayerScore = {
  subject?: string;
  score?: number;
};

export type PlayerStat = {
  subject?: string;
  kills?: Kill[];
  damage?: Damage[];
  score?: number;
  economy?: Economy;
  ability?: PlayerStatAbility;
  wasAfk?: boolean;
  wasPenalized?: boolean;
  stayedInSpawn?: boolean;
};

export type PlayerStatAbility = {
  grenadeEffects?: null;
  ability1Effects?: null;
  ability2Effects?: null;
  ultimateEffects?: null;
};

export type Damage = {
  receiver?: string;
  damage?: number;
  legshots?: number;
  bodyshots?: number;
  headshots?: number;
};

export enum RoundCeremony {
  CeremonyCloser = "CeremonyCloser",
  CeremonyClutch = "CeremonyClutch",
  CeremonyDefault = "CeremonyDefault",
  CeremonyThrifty = "CeremonyThrifty",
}

export enum RoundResultEnum {
  BombDefused = "Bomb defused",
  BombDetonated = "Bomb detonated",
  Eliminated = "Eliminated",
}

export enum RoundResultCode {
  Defuse = "Defuse",
  Detonate = "Detonate",
  Elimination = "Elimination",
}

export enum WinningTeamRole {
  Attacker = "Attacker",
  Defender = "Defender",
}

export type Team = {
  teamId?: TeamID;
  won?: boolean;
  roundsPlayed?: number;
  roundsWon?: number;
  numPoints?: number;
};

type RiotPreGameFailType = {
  httpStatus: number;
  errorCode: string;
  message: string;
};

type RiotPreGamePassType = {
  httpStatus: undefined;
  Subject: string;
  MatchID: string;
  Version: number;
};

export type RiotPreGameApiType = RiotPreGameFailType | RiotPreGamePassType;

type RiotCurrentGamePassType = {
  httpStatus: undefined;
  Subject: string;
  MatchID: string;
  Version: number;
};

type RiotCurrentGameFailType = {
  httpStatus: number;
  errorCode: string;
  message: string;
};

export type RiotCurrentGameApiType =
  | RiotCurrentGamePassType
  | RiotCurrentGameFailType;

export type RiotPreGameDataType = {
  ID: string;
  Version: number;
  Teams: RTeam[];
  AllyTeam: RTeam;
  EnemyTeam: null;
  ObserverSubjects: any[];
  MatchCoaches: any[];
  EnemyTeamSize: number;
  EnemyTeamLockCount: number;
  PregameState: string;
  LastUpdated: Date;
  MapID: string;
  MapSelectPool: any[];
  BannedMapIDs: any[];
  CastedVotes: CastedVotes;
  MapSelectSteps: any[];
  MapSelectStep: number;
  Team1: string;
  GamePodID: string;
  Mode: string;
  VoiceSessionID: string;
  MUCName: string;
  TeamMatchToken: string;
  QueueID: string;
  ProvisioningFlowID: string;
  IsRanked: boolean;
  PhaseTimeRemainingNS: number;
  StepTimeRemainingNS: number;
  altModesFlagADA: boolean;
  TournamentMetadata: null;
  RosterMetadata: null;
};

export type RiotCurrentGameDataType = {
  MatchID: string;
  Version: number;
  State: string;
  MapID: string;
  ModeID: string;
  ProvisioningFlow: string;
  GamePodID: string;
  AllMUCName: string;
  TeamMUCName: string;
  TeamVoiceID: string;
  TeamMatchToken: string;
  IsReconnectable: boolean;
  ConnectionDetails: ConnectionDetails;
  PostGameDetails: null;
  Players: CurrPlayer[];
  MatchmakingData: null;
};

export type CurrPlayer = {
  Subject: string;
  TeamID: string;
  CharacterID: string;
  PlayerIdentity: PlayerIdentity;
  SeasonalBadgeInfo: SeasonalBadgeInfo;
  IsCoach: boolean;
  IsAssociated: boolean;
  PlatformType: string;
};

export type ConnectionDetails = {
  GameServerHosts: string[];
  GameServerHost: string;
  GameServerPort: number;
  GameServerObfuscatedIP: number;
  GameClientHash: number;
  PlayerKey: string;
};

export type RTeam = {
  TeamID: string;
  Players: RPlayer[];
};

export type RPlayer = {
  Subject: string;
  CharacterID: string;
  CharacterSelectionState: CharacterSelectionState;
  PregamePlayerState: PregamePlayerState;
  CompetitiveTier: number;
  PlayerIdentity: PlayerIdentity;
  SeasonalBadgeInfo: SeasonalBadgeInfo;
  IsCaptain: boolean;
  PlatformType: RPlatformType;
};

export enum CharacterSelectionState {
  Empty = "",
  Locked = "locked",
  Selected = "selected",
}

export enum RPlatformType {
  PC = "pc",
}

export type PlayerIdentity = {
  Subject: string;
  PlayerCardID: string;
  PlayerTitleID: string;
  AccountLevel: number;
  PreferredLevelBorderID: string;
  Incognito: boolean;
  HideAccountLevel: boolean;
};

export enum PregamePlayerState {
  Joined = "joined",
}

export type SeasonalBadgeInfo = {
  SeasonID: string;
  NumberOfWins: number;
  WinsByTier: null;
  Rank: number;
  LeaderboardRank: number;
};

export type CastedVotes = {};

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
  "df1cb487-4902-002e-5c17-d28e83e78588": "Waylay",
  "569fdd95-4d10-43ab-ca70-79becc718b46": "Sage",
  "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": "Reyna",
  "8e253930-4c05-31dd-1b6c-968525494517": "Omen",
  "add6443a-41bd-e414-f6ad-e58d267f4e95": "Jett",
} as const;
export type AgentUuid = keyof typeof agentUuidToNameObject;
